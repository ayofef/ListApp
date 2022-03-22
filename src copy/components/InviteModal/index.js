import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { NotificationManager } from 'react-notifications';
import { StyledDialog, StyledDialogActions, StyledDialogContent, StyledPaper } from '../Dialog/styled';
import { initialValues, validation } from './fieldsSettings';
import { P14, P16B } from '../atoms';
import { useInviteUser } from '../../hooks/userHooks';
import MultiEmailInput from './MultiEmailInput';
import FormControls from './FormControls';
import UserIcon from '../../assets/icons/inviteModal/User';
import THEME from '../../constants/theme';
import CloseButton from '../Dialog/CloseButton';

const ID = 'invite-developer-intents-screen';
const DEVELOPER_ROLE = 'DEVELOPER';

const InviteModalWrapper = ({ isOpen, toggleIsOpen }) => {
  const [inviteUser] = useInviteUser();

  const { t } = useTranslation();

  const handleSubmit = useCallback(
    async ({ emails }, actions) => {
      const uniqueEmails = [...new Set(emails)]?.filter(Boolean);

      const promises = [];
      uniqueEmails.forEach((email) => {
        promises.push(
          inviteUser({
            variables: {
              companyRole: DEVELOPER_ROLE,
              email,
              name: email,
              teamRole: 'USER',
            },
          })
        );
      });

      const responses = await Promise.all(promises);
      const errorResponse = responses.find((response) => response.errors);

      if (errorResponse) {
        return;
      }
      NotificationManager.success('Invited developers to workspace.', 'Invite Developers', 5000);
      toggleIsOpen();

      actions.setSubmitting(false);
    },
    [toggleIsOpen, inviteUser]
  );

  return (
    <StyledDialog
      open={isOpen}
      scroll="paper"
      maxWidth="xs"
      width="496px"
      PaperComponent={StyledPaper}
      onClose={toggleIsOpen}
      aria-labelledby={ID}
    >
      <CloseButton onClick={toggleIsOpen} top="30px" />

      <Formik
        initialValues={initialValues}
        validate={validation}
        onSubmit={handleSubmit}
        validateOnBlur
        validateOnMount
      >
        <Form>
          <Box p="30px 4px 4px 4px">
            <Box display="flex" flexDirection="column" pl="24px" mb="4px">
              <Box
                bgcolor={THEME.primaryColors.primary}
                width="40px"
                height="40px"
                borderRadius="8px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <UserIcon />
              </Box>
            </Box>

            <StyledDialogContent px="24px">
              <Box maxWidth="440px" mt="20px">
                <P16B padding="0 0 6px 0">{t('Invite developers to WhenThen')}</P16B>
                <P14 color={THEME.greyColors.grey1}>
                  {t(
                    `We will send an invite to the email addresses below. They will automatically be assigned the "Developer" role and will be able to access developer settings.`
                  )}
                </P14>
              </Box>
              <Box maxWidth="440px" mt="24px" mb="4px">
                <MultiEmailInput />
              </Box>
            </StyledDialogContent>
            <StyledDialogActions px="24px">
              <FormControls toggleIsOpen={toggleIsOpen} />
            </StyledDialogActions>
          </Box>
        </Form>
      </Formik>
    </StyledDialog>
  );
};

InviteModalWrapper.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleIsOpen: PropTypes.func.isRequired,
};

export default InviteModalWrapper;
