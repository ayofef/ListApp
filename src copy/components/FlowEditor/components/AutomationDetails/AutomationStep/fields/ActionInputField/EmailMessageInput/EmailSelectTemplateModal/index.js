import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import { v4 } from 'uuid';
import { ButtonRounded } from '../../../../../../../../atoms';
import {
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
  StyledPaper,
} from '../../../../../../../../Dialog/styled';
import { GET_AVAILABLE_TEMPLATES } from '../../../../../../../../../utils/queries/communication/communicationQueries';
import { useNotificationManager } from '../../../../../../../../../hooks/useNotificationManager';
import EmailPreview from '../EmailPreview';
import { DEFAULT_VALUE } from '../../../../../../../../forms/EmailTemplateForm/constants';
import CloseButton from '../../../../../../../../Dialog/CloseButton';

const EmailSelectTemplateModal = ({ isOpen, setModalType, setTemplateData, emailData }) => {
  const { loading, error, data } = useQuery(GET_AVAILABLE_TEMPLATES);
  const templates = useMemo(() => data?.getTemplates?.map((template) => ({ ...template, id: v4() })), [
    data?.getTemplates,
  ]);
  const we = data?.we;
  const brandInfo = we?.brand;
  const { t } = useTranslation();
  const openSelectTemplateModal = useCallback(() => {
    if (emailData) {
      setModalType('EmailMessageModal');
    } else {
      setModalType('EmailSelectTemplateModal');
    }
  }, [setModalType, emailData]);
  const handleClose = useCallback(() => setModalType(), [setModalType]);
  const openConfigureEmail = useCallback(() => {
    setTemplateData({});
    setModalType('EmailMessageModal');
  }, [setModalType, setTemplateData]);
  const handleSelect = useCallback(
    ({ currentTarget }) => {
      const id = currentTarget.dataset.template;
      const value = templates?.find((template) => template.id === id);

      if (value) {
        setTemplateData({
          subject: value.subject ?? DEFAULT_VALUE.subject,
          body: value.content ?? DEFAULT_VALUE.body,
          actionText: value.actionText ?? DEFAULT_VALUE.actionText,
          actionLink: value.actionLink ?? DEFAULT_VALUE.actionLink,
          name: value?.name?.toLowerCase() ?? 'New email template',
        });
      }

      setModalType('EmailMessageModal');
    },
    [setModalType, setTemplateData, templates]
  );

  useNotificationManager('error', error?.message, t('Fetch templates'), 5000);

  return (
    <>
      <ButtonRounded type="button" variant="contained" color="primary" onClick={openSelectTemplateModal}>
        {t('Configure email')}
      </ButtonRounded>

      {isOpen && (
        <Dialog
          open={isOpen}
          scroll="paper"
          PaperComponent={StyledPaper}
          aria-labelledby="EmailSelectTemplateModal"
          onClose={handleClose}
          fullWidth
        >
          <CloseButton onClick={handleClose} />
          <StyledDialogTitle id="EmailSelectTemplateModal-title" disableTypography>
            <Box position="relative">
              <Box>Choose template</Box>
            </Box>
          </StyledDialogTitle>

          <StyledDialogContent>
            <Box mt="10px">
              {loading ? (
                <Box>loading...</Box>
              ) : (
                <Grid container spacing={3}>
                  {templates?.map(({ id, name, content, actionText, actionLink }) => (
                    <Grid key={id} item>
                      <Box display="flex" flexDirection="column" alignItems="center">
                        <Box component="p" fontWeight="600">
                          {name}
                        </Box>

                        <EmailPreview
                          brandInfo={brandInfo}
                          we={we?.name ?? ''}
                          editorContent={content ?? ''}
                          actionText={actionText}
                          actionLink={actionLink}
                        />

                        <Box margin="16px 0" color="#787F88">
                          <ButtonRounded data-template={id} onClick={handleSelect} variant="outlined" color="inherit">
                            Select
                          </ButtonRounded>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          </StyledDialogContent>

          <StyledDialogActions>
            <ButtonRounded type="button" variant="contained" color="primary" onClick={openConfigureEmail}>
              {t('New email')}
            </ButtonRounded>

            <ButtonRounded type="button" variant="contained" color="secondary" onClick={openConfigureEmail}>
              {t('Cancel')}
            </ButtonRounded>
          </StyledDialogActions>
        </Dialog>
      )}
    </>
  );
};

EmailSelectTemplateModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setModalType: PropTypes.func.isRequired,
  setTemplateData: PropTypes.func.isRequired,
  emailData: PropTypes.string,
};
EmailSelectTemplateModal.defaultProps = {
  emailData: undefined,
};

export default EmailSelectTemplateModal;
