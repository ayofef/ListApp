import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import { StyledAttachmentWrapper, StyledDownloadLink, DeleteAttachmentButton } from './styled';
import { CloseIcon } from '../../../../../assets/icons';
import ConfirmationModal from '../../../../../components/modals/ConfirmationModal';
import { useDeletePaymentAttachment } from '../../../../../hooks/useAddPaymentAttachment';
import THEME from '../../../../../constants/theme';

const AttachmentItem = ({ fileName, accessUrl, id }) => {
  const [open, setOpen] = useState(false);
  const { detailsId } = useParams();

  const toggleConfirmationModal = () => setOpen((prevState) => !prevState);

  const { deletePaymentAttachment, loading: deleteLoading } = useDeletePaymentAttachment(detailsId);

  const handleDelete = () => {
    deletePaymentAttachment(id, toggleConfirmationModal);
  };

  return (
    <>
      <StyledAttachmentWrapper
        margin="0 20px 20px 0"
        justifyContent="flex-start"
        alignItems="center"
        width="150px"
        zIndex="50"
      >
        <StyledDownloadLink href={accessUrl}>{fileName}</StyledDownloadLink>

        <DeleteAttachmentButton type="button" color="primary" variant="contained" onClick={toggleConfirmationModal}>
          <CloseIcon stroke={THEME.greyColors.grey1} height="32px" width="32px" />
        </DeleteAttachmentButton>
      </StyledAttachmentWrapper>

      {open && (
        <ConfirmationModal
          open={open}
          onConfirm={handleDelete}
          onClose={toggleConfirmationModal}
          onCancel={toggleConfirmationModal}
          loading={deleteLoading}
          text={{
            title: 'Delete Attachment',
            description: `Are you sure you want to delete ${fileName} ?`,
            submit: 'Delete',
          }}
        />
      )}
    </>
  );
};

AttachmentItem.propTypes = {
  accessUrl: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default AttachmentItem;
