import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import Box from '@material-ui/core/Box';
import Close from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import { useTranslation } from 'react-i18next';
import {
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
  StyledPaper,
} from '../../../../../../components/Dialog/styled';
import DisableAuthenticationFrom from '../../../../../../components/forms/DNSDisableAuthenticationFrom';
import FormControl from '../../../../../../components/forms/_common/FormControl';
import { GET_ME_AND_WE } from '../../../../../../utils/queries/public/publicQueries';
import { useNotificationManager } from '../../../../../../hooks/useNotificationManager';
import { P14 } from '../../../../../../components/atoms';

const ID = 'DNSDisableAuthenticationDialog';

const DNSDisableAuthenticationDialog = ({ setModalId }) => {
  const { t } = useTranslation();
  const { error, data } = useQuery(GET_ME_AND_WE);
  useNotificationManager('error', error?.message, 'Fetch DNS Settings');
  const handleClose = useCallback(() => setModalId(null), [setModalId]);
  const domainId = data?.we?.customDomainSettings?.id ?? '';
  const domainName = data?.we?.customDomainSettings?.domain;

  return (
    <DisableAuthenticationFrom domainId={domainId} onCompleted={handleClose}>
      <Dialog open={true} scroll="paper" PaperComponent={StyledPaper} onClose={handleClose} aria-labelledby={ID}>
        <StyledDialogTitle id={`${ID}-title`} disableTypography>
          <Box position="relative">
            <Box>{t('Authenticate domain')}</Box>
            <P14>
              {t(
                `Authenticate your domain with WhenThen by modifying your domain's DNS records. These changes allow your campaigns to appear to come from your domain, instead of whenthen.com. Once you have made the changes click "Verify authentication"`
              )}
            </P14>

            <Box display="flex" position="absolute" top="-15px" right="-23px">
              <IconButton size="small" onClick={handleClose}>
                <Close />
              </IconButton>
            </Box>
          </Box>
        </StyledDialogTitle>

        <StyledDialogContent>
          <Box component="p">
            Your are going disable Authentication for <Box component="b">{domainName}</Box>
          </Box>
        </StyledDialogContent>

        <StyledDialogActions>
          <FormControl toggleIsOpen={handleClose} />
        </StyledDialogActions>
      </Dialog>
    </DisableAuthenticationFrom>
  );
};

DNSDisableAuthenticationDialog.propTypes = {
  setModalId: PropTypes.func.isRequired,
};

export default DNSDisableAuthenticationDialog;
