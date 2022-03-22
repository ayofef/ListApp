import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import { useTranslation } from 'react-i18next';
import {
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
  StyledPaper,
} from '../../../../../../components/Dialog/styled';
import AuthenticationFrom from '../../../../../../components/forms/DNSAuthenticationFrom';
import Resources from './Resources';
import FormControl from '../../../../../../components/forms/DNSAuthenticationFrom/FormControl';
import { GET_ME_AND_WE } from '../../../../../../utils/queries/public/publicQueries';
import { useNotificationManager } from '../../../../../../hooks/useNotificationManager';
import { getSettings } from './constants';
import { P14 } from '../../../../../../components/atoms';
import CloseButton from '../../../../../../components/Dialog/CloseButton';

const ID = 'DNSAuthenticationDialog';

const DNSAuthenticationDialog = ({ setModalId }) => {
  const { t } = useTranslation();
  const { error, data } = useQuery(GET_ME_AND_WE);
  useNotificationManager('error', error?.message, 'Fetch DNS Settings');
  const handleClose = useCallback(() => setModalId(null), [setModalId]);
  const domainId = data?.we?.customDomainSettings?.id ?? '';
  const authenticationStatus = data?.we?.customDomainSettings?.lastAuthenticationStatus;
  const resourceRecords = data?.we?.customDomainSettings?.resourceRecords;
  const { status, variant } = getSettings(authenticationStatus);

  return (
    <AuthenticationFrom domainId={domainId} onCompleted={handleClose}>
      <Dialog
        open={true}
        scroll="paper"
        maxWidth="md"
        PaperComponent={StyledPaper}
        onClose={handleClose}
        aria-labelledby={ID}
      >
        <CloseButton onClick={handleClose} />
        <StyledDialogTitle id={`${ID}-title`} disableTypography>
          <Box position="relative">
            <Box>{t('Authenticate domain')}</Box>
            <P14 color="#787f88" maxWidth="95%" margin="6px 0" fontWeight="normal">
              {t(
                `Authenticate your domain with WhenThen by modifying your domain's DNS records. These changes allow your campaigns to appear to come from your domain, instead of whenthen.com. Once you have made the changes click "Verify authentication"`
              )}
            </P14>
          </Box>
        </StyledDialogTitle>

        <StyledDialogContent>
          <Resources rows={resourceRecords} status={status} variant={variant} />
        </StyledDialogContent>

        <StyledDialogActions>
          <FormControl toggleIsOpen={handleClose} />
        </StyledDialogActions>
      </Dialog>
    </AuthenticationFrom>
  );
};

DNSAuthenticationDialog.propTypes = {
  setModalId: PropTypes.func.isRequired,
};

export default DNSAuthenticationDialog;
