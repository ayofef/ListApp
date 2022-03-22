import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { useDropzone } from 'react-dropzone';
import { useLazyQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { useNotificationManager, useFileUploadNotification } from '../../../../../hooks/useNotificationManager';
import { useAddPaymentAttachment } from '../../../../../hooks/useAddPaymentAttachment';
import DragAndDropZone from './DragAndDropZone';
import { Button, P, P16B } from '../../../../../components/atoms';
import { GET_UPLOAD_URL } from '../../../../../utils/queries/uploadFile/getUploadUrl';
import { saveAttachment } from './constants';
import UploadIndicator from './UploadIndicator';
import AttachmentItem from './AttachmentItem';
import { useUserSelector } from '../../../../../providers/User/UserContext';
import { selectIsDemo } from '../../../../../providers/User/state/selectors';
import { MAX_FILE_SIZE, ACCEPTED_FILE_TYPES } from '../../../../../utils/fileSelectReader';

const dropZoneConfig = {
  accept: ACCEPTED_FILE_TYPES,
  multiple: true,
  maxSize: MAX_FILE_SIZE,
};
const TITLE = 'Attachments';
const DEMO_ERROR_TITLE = 'This is a demo account';
const DEMO_ERROR_TEXT = 'Use your real account to try out this feature';

const Attachments = ({ list }) => {
  const { t } = useTranslation();
  const { detailsId } = useParams();
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState({});
  const [uploadLoading, setUploadLoading] = useState(false);
  const [circularLoader, setCircularLoader] = useState(false);
  const { mutatePaymentAttachment } = useAddPaymentAttachment(detailsId);
  const isDemo = useUserSelector(selectIsDemo);
  const [getUploadUrl, { error }] = useLazyQuery(GET_UPLOAD_URL, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      if (files) {
        saveAttachment(
          data.getUploadUrl,
          files,
          mutatePaymentAttachment,
          detailsId,
          setUploadLoading,
          progress,
          setProgress,
          setFiles,
          setCircularLoader
        );
      }
    },
  });

  const onDrop = (acceptedFiles) => {
    if (isDemo) {
      NotificationManager.error(DEMO_ERROR_TEXT, DEMO_ERROR_TITLE, 5000);
      return;
    }
    setFiles(acceptedFiles);
    setUploadLoading(true);
    setCircularLoader(true);
    getUploadUrl({
      variables: { urlType: 'PAYMENTS' },
    });
  };

  const dropZone = useDropzone({ onDrop, noClick: list?.length > 0, ...dropZoneConfig });

  useNotificationManager('error', error?.message, 'Payment Attachment', 5000);
  useFileUploadNotification('16mb', 'Payment Attachment', dropZone.fileRejections);

  const handleButtonClick = () => {
    if (isDemo) {
      return NotificationManager.error(DEMO_ERROR_TEXT, DEMO_ERROR_TITLE, 5000);
    }
    return dropZone.open();
  };

  const handleDemo = () => {
    if (isDemo) {
      NotificationManager.error(DEMO_ERROR_TEXT, DEMO_ERROR_TITLE, 5000);
    }
    return true;
  };

  return (
    <Box component="section" mt="54px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <P16B>{t(TITLE)}</P16B>

        {detailsId && (
          <Button small transparent minHeight="auto" onClick={handleButtonClick} fontSize="14px" margin="0 -12px 0 0">
            <P color="#4E40EF">{t('Upload')}</P>
          </Button>
        )}
      </Box>

      <Box minHeight="200px" position="relative">
        <Box>
          {list?.map(({ fileName, accessUrl, id }) => (
            <AttachmentItem key={id} id={id} fileName={fileName} accessUrl={isDemo || accessUrl} />
          ))}
        </Box>
        <Box width="100%">
          <DragAndDropZone
            dragging={dropZone.isDragActive}
            getRootProps={dropZone.getRootProps}
            defaultOnClick={handleDemo}
          />
          <input {...dropZone.getInputProps()} />
        </Box>
      </Box>
      <UploadIndicator
        uploadLoading={uploadLoading}
        files={files}
        progress={progress}
        circularLoader={circularLoader}
      />
    </Box>
  );
};

Attachments.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      fileName: PropTypes.string.isRequired,
      accessUrl: PropTypes.string.isRequired,
    })
  ),
};

Attachments.defaultProps = {
  list: [],
};

export default Attachments;
