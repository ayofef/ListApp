import React, { useCallback, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import { useTranslation } from 'react-i18next';
import { useToggle } from 'react-use';
import { ButtonRounded, P14 } from '../../../../../../components/atoms';
import ItemLayout from '../components/ItemLayout';
import {
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
  StyledPaper,
} from '../../../../../../components/Dialog/styled';
import SMTPForm from '../../../../../../components/forms/SMTPForm';
import FormControl from '../../../../../../components/forms/SMTPForm/FormControl';
import FormContent from '../../../../../../components/forms/SMTPForm/FormContent';
import SettingsStatus from '../components/SettingsStatus';
import { useNotificationManager } from '../../../../../../hooks/useNotificationManager';
import { GQL_Q_SMTP_SETTINGS } from '../../../../../../utils/queries/customer/customerQueries';
import CloseButton from '../../../../../../components/Dialog/CloseButton';

const ID = 'smtp-settings';

const SMTPItem = () => {
  const { t } = useTranslation();
  const [isOpen, toggle] = useToggle(false);
  const { loading, error, data } = useQuery(GQL_Q_SMTP_SETTINGS);
  useNotificationManager('error', error?.message, 'Fetch SMTP Settings');
  const serverAddress = data?.we?.smtpSettings?.serverAddress;
  const buttonColor = loading || !serverAddress ? 'primary' : 'secondary';
  const initialValues = useMemo(() => {
    const smtpSettings = data?.we?.smtpSettings;

    return {
      serverAddress: smtpSettings?.serverAddress ?? '',
      username: smtpSettings?.username ?? '',
      password: '',
      encryptionType: smtpSettings?.encryptionType ?? 'SSL',
      portNumber: smtpSettings?.portNumber ?? '',
    };
  }, [data?.we?.smtpSettings]);
  const onCompleted = useCallback(() => toggle(), [toggle]);

  return (
    <>
      <ItemLayout
        title={t('SMTP Configuration')}
        subTitle={t(`Configure your own SMTP server or use WhenThen's default SMTP`)}
      >
        <Box width="100%" display="flex" alignItems="center" p="16px 16px 16px 24px">
          <SettingsStatus
            value={serverAddress}
            message="You haven’t configured SMTP Server yet."
            status={serverAddress && 'Configured'}
            variant={serverAddress && 'fulfilled'}
            loading={loading}
          />

          <Box ml="auto">
            <ButtonRounded
              type="button"
              role="button"
              variant="contained"
              color={buttonColor}
              onClick={toggle}
              disabled={loading}
            >
              {t('Configure SMTP')}
            </ButtonRounded>
          </Box>
        </Box>
      </ItemLayout>

      {isOpen && (
        <SMTPForm initialValues={initialValues} onCompleted={onCompleted}>
          <Dialog open={true} scroll="paper" PaperComponent={StyledPaper} onClose={toggle} aria-labelledby={ID}>
            <CloseButton onClick={toggle} />
            <StyledDialogTitle id={`${ID}-title`} disableTypography>
              <Box position="relative">
                <Box>{t('Configure SMTP server settings')}</Box>
              </Box>
              <P14 color="#787f88" maxWidth="95%" margin="6px 0" fontWeight="normal">
                {t(
                  `Authenticate your domain with WhenThen by modifying your domain's DNS records. These changes allow your campaigns to appear to come from your domain, instead of whenthen.com. Once you have made the changes click "Verify authentication"`
                )}
              </P14>
            </StyledDialogTitle>

            <StyledDialogContent>
              <Box pt="0" pb="24px">
                <FormContent />
              </Box>
            </StyledDialogContent>

            <StyledDialogActions disableSpacing>
              <FormControl toggleIsOpen={toggle} />
            </StyledDialogActions>
          </Dialog>
        </SMTPForm>
      )}
    </>
  );
};

export default SMTPItem;
