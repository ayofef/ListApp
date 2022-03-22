import React, { useCallback, useMemo } from 'react';
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
import SenderForm from '../../../../../../components/forms/DNSSenderForm';
import SenderFormContent from '../../../../../../components/forms/DNSSenderForm/FormContent';
import SenderFormControl from '../../../../../../components/forms/_common/FormControl';
import DNSAuthenticationDialog from './DNSAuthenticationDialog';
import { GET_ME_AND_WE } from '../../../../../../utils/queries/public/publicQueries';
import { useNotificationManager } from '../../../../../../hooks/useNotificationManager';

const ID = 'DNSSenderDialog';

const DNSSenderDialog = ({ setModalId }) => {
  const { t } = useTranslation();
  const { error, data } = useQuery(GET_ME_AND_WE);
  useNotificationManager('error', error?.message, 'Fetch DNS Settings');
  const initialValues = useMemo(() => {
    const me = data?.me;
    const we = data?.we;

    if (!me || !we) {
      return undefined;
    }

    return {
      type: 'default',
      displayName: we.customDomainSettings?.displayName ?? me.name ?? '',
      emailAddress: we.customDomainSettings?.emailAddress ?? me.email?.address ?? '',
    };
  }, [data?.me, data?.we]);
  const handleClose = useCallback(() => setModalId(null), [setModalId]);
  const handleCompleted = useCallback(() => setModalId(DNSAuthenticationDialog.name), [setModalId]);

  if (!initialValues) {
    return null;
  }

  return (
    <SenderForm initialValues={initialValues} onCompleted={handleCompleted}>
      <Dialog open={true} scroll="paper" PaperComponent={StyledPaper} onClose={handleClose} aria-labelledby={ID}>
        <StyledDialogTitle id={`${ID}-title`} disableTypography>
          <Box position="relative">
            <Box>{t('Default sender address')}</Box>

            <Box display="flex" position="absolute" top="-15px" right="-23px">
              <IconButton size="small" onClick={handleClose}>
                <Close />
              </IconButton>
            </Box>
          </Box>
        </StyledDialogTitle>

        <StyledDialogContent>
          <SenderFormContent />
        </StyledDialogContent>

        <StyledDialogActions>
          <SenderFormControl toggleIsOpen={handleClose} primaryText="save" />
        </StyledDialogActions>
      </Dialog>
    </SenderForm>
  );
};

DNSSenderDialog.propTypes = {
  setModalId: PropTypes.func.isRequired,
};

export default DNSSenderDialog;
