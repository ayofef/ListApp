import React, { useCallback, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { func, bool, string, arrayOf, shape } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useCopyToClipboard } from 'react-use';
import { NotificationManager } from 'react-notifications';
import { CUSTOM_BUTTON_PROPS, WT_CONNECTION_FORM_ID } from '../constant';
import {
  StyledDialog,
  StyledDialogActions,
  StyledDialogContent,
  StyledPaper,
} from '../../../../components/Dialog/styled';
import ConnectionFormModalHeader from '../ConnectionFormModalHeader';
import { ButtonRounded } from '../../../../components/atoms';
import ConnectionForm from '../../../../components/forms/GenerateForm/components/ConnectionForm';
import { getConnectionModalDescription } from '../../../../components/forms/GenerateForm/constant';
import { TOAST_TIMEOUT } from '../../../../constants/toasts';

const WebhookConfigurationModal = ({
  setShouldModalOpen,
  shouldModalOpen,
  connectionName,
  connectionLogo,
  connectionCategory,
  goBack,
  form,
}) => {
  const { t } = useTranslation();
  const [state, copyToClipboard] = useCopyToClipboard();
  const description = getConnectionModalDescription(connectionName, connectionCategory);

  useEffect(() => {
    if (state?.value) {
      NotificationManager.success(t('Link copied to the clipboard'), t('Great!'), TOAST_TIMEOUT);
    }
  }, [state, t]);

  const handleDisallowBubbling = (e) => {
    e.stopPropagation();
  };

  const handleGoBack = () => {
    goBack();
  };

  const handleClose = useCallback(() => {
    setShouldModalOpen();
  }, [setShouldModalOpen]);

  const handleModalClose = () => {
    setShouldModalOpen(false);
  };

  return (
    <StyledDialog
      scroll="paper"
      maxWidth="xl"
      $height="700px"
      PaperComponent={StyledPaper}
      aria-labelledby={WT_CONNECTION_FORM_ID}
      open={shouldModalOpen}
      onClick={handleDisallowBubbling}
      onClose={handleClose}
    >
      <>
        <ConnectionFormModalHeader id={WT_CONNECTION_FORM_ID} handleClose={handleClose} handleGoBack={handleGoBack} />

        <StyledDialogContent px="0 0 32px">
          <ConnectionForm
            copyToClipboard={copyToClipboard}
            connectionName={connectionName}
            connectionLogo={connectionLogo}
            description={description}
            form={form}
          />

          <Box {...CUSTOM_BUTTON_PROPS}>
            <ButtonRounded type="button" variant="contained" color="primary" onClick={handleModalClose}>
              {t('Close')}
            </ButtonRounded>
          </Box>
        </StyledDialogContent>

        <StyledDialogActions px="24px" py="42px" $borderTop>
          &nbsp;
        </StyledDialogActions>
      </>
    </StyledDialog>
  );
};

WebhookConfigurationModal.propTypes = {
  setShouldModalOpen: func.isRequired,
  shouldModalOpen: bool.isRequired,
  connectionName: string.isRequired,
  connectionLogo: string.isRequired,
  connectionCategory: string.isRequired,
  goBack: func.isRequired,
  form: arrayOf(
    shape({
      type: string.isRequired,
      text: shape({ type: string, text: string.isRequired }),
    })
  ).isRequired,
};

export default WebhookConfigurationModal;
