import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLazyQuery } from '@apollo/client';
import { Box } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import { v4 } from 'uuid';
import { useNotificationManager, useFileUploadNotification } from '../../../../hooks/useNotificationManager';

import { GET_UPLOAD_URL } from '../../../../utils/queries/uploadFile/getUploadUrl';
import Modal from '../../Modal';
import UploadButton from './Button';
import Uploader from './Uploader';
import UploadHeader from './Header';
import { StyledUpload } from './styled';
import { MAX_FILE_SIZE, ACCEPTED_IMAGE_FILE_TYPES } from '../../../../utils/fileSelectReader';

const dropZoneConfig = {
  accept: ACCEPTED_IMAGE_FILE_TYPES,
  maxFiles: 1,
  maxSize: MAX_FILE_SIZE,
};

const UploadBox = ({ title, handleGraphics, graphics }) => {
  const [file, setFile] = useState(null);
  const [modalGraphics, setModalGraphics] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [getUploadUrl, { error }] = useLazyQuery(GET_UPLOAD_URL, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      if (file?.type.match('image.*') && getUploadUrl) {
        handleGraphics(data.getUploadUrl, file, title);
      }
    },
  });

  useNotificationManager('error', error?.message, 'Upload Graphics', 5000);

  const onDrop = (acceptedFiles) => {
    const image = acceptedFiles[0];
    setFile(image);
    if (!showModal) {
      getUploadUrl({
        variables: { urlType: 'BRAND', fileName: v4() },
      });
    }
    if (showModal) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setModalGraphics(reader.result);
      };
      reader.readAsDataURL(image);
    }
  };

  const dropZone = useDropzone({ onDrop, ...dropZoneConfig });

  useFileUploadNotification('5mb', 'Graphics', dropZone.fileRejections);

  const openModal = () => setShowModal(!showModal);

  const handleButtonClick = () => {
    if (graphics) {
      openModal();
    } else {
      dropZone.open();
    }
  };
  const handleCancel = () => {
    setModalGraphics(null);
    setShowModal(false);
  };
  const handleSave = () => {
    getUploadUrl({
      variables: { urlType: 'BRAND', fileName: v4() },
    });
    setShowModal(false);
  };

  return (
    <StyledUpload flexDirection="column" titles={title}>
      <UploadHeader title={title} />
      <Uploader
        title={title}
        graphics={graphics}
        dragging={dropZone.isDragActive}
        handleClick={handleButtonClick}
        getRootProps={dropZone.getRootProps}
      />
      <UploadButton graphics={graphics} handleClick={handleButtonClick} title={title} />
      <Modal
        showModal={showModal}
        handleModal={openModal}
        title={`Update your ${title}`}
        description={`The ${title} will appear on your emails.`}
        handleCancel={handleCancel}
        handleSave={handleSave}
        justifyButtons="center"
      >
        <Box width="300px" maxWidth="300px" margin="0 auto" bgcolor="#fff" borderRadius="16px" top="50%">
          <Uploader
            modalIsOpen={showModal}
            modal
            title={title}
            graphics={modalGraphics}
            dragging={dropZone.isDragActive}
            handleClick={handleButtonClick}
            getRootProps={dropZone.getRootProps}
          />
        </Box>
      </Modal>
      <input {...dropZone.getInputProps()} />
    </StyledUpload>
  );
};

UploadBox.propTypes = {
  title: PropTypes.string.isRequired,
  handleGraphics: PropTypes.func.isRequired,
  graphics: PropTypes.string,
};
UploadBox.defaultProps = {
  graphics: '',
};
export default UploadBox;
