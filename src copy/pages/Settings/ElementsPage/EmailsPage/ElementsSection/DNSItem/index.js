import React, { useCallback, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import capitalize from '@material-ui/core/utils/capitalize';
import { ButtonRounded } from '../../../../../../components/atoms';
import ItemLayout from '../components/ItemLayout';
import DNSSenderDialog from './DNSSenderDialog';
import DNSAuthenticationDialog from './DNSAuthenticationDialog';
import DNSDisableAuthenticationDialog from './DNSDisableAuthenticationDialog';
import { GET_ME_AND_WE } from '../../../../../../utils/queries/public/publicQueries';
import { useNotificationManager } from '../../../../../../hooks/useNotificationManager';
import SettingsStatus from '../components/SettingsStatus';
import { getSettings } from './constants';

const DIALOGS = {
  [DNSSenderDialog.name]: DNSSenderDialog,
  [DNSAuthenticationDialog.name]: DNSAuthenticationDialog,
  [DNSDisableAuthenticationDialog.name]: DNSDisableAuthenticationDialog,
};

const BUTTON_VALUE = new Map([
  [true, DNSDisableAuthenticationDialog.name],
  [false, DNSAuthenticationDialog.name],
  [undefined, DNSSenderDialog.name],
]);

const getButtonValue = (status) => BUTTON_VALUE.get(status);

const DNSItem = () => {
  const { t } = useTranslation();
  const [modalId, setModalId] = useState(null);
  const { loading, error, data } = useQuery(GET_ME_AND_WE);
  useNotificationManager('error', error?.message, 'Fetch DNS Settings');
  const domain = data?.we?.customDomainSettings?.domain;

  const { buttonValue, buttonTitle, status, variant } = useMemo(() => {
    const authStatus = data?.we?.customDomainSettings?.lastAuthenticationStatus;

    return {
      ...getSettings(authStatus),
      buttonValue: getButtonValue(authStatus),
    };
  }, [data?.we?.customDomainSettings?.lastAuthenticationStatus]);
  const handleSetModal = useCallback(({ currentTarget }) => setModalId(currentTarget.value ?? null), []);

  const Dialog = DIALOGS[modalId];

  return (
    <>
      <ItemLayout
        title={t('Email Domain Authentication')}
        subTitle={t('Verify your email domain to use as a from address when you send emails and automations.')}
      >
        <Box width="100%" display="flex" alignItems="center" p="16px 16px 16px 24px">
          <SettingsStatus
            value={domain}
            message="You haven’t configured DNS yet."
            status={status}
            variant={variant}
            loading={loading}
          />

          <Box ml="auto">
            <ButtonRounded
              type="button"
              role="button"
              variant="contained"
              color="primary"
              value={buttonValue}
              onClick={handleSetModal}
              disabled={loading}
            >
              {capitalize(t(buttonTitle) ?? '')}
            </ButtonRounded>
          </Box>
        </Box>
      </ItemLayout>

      {Dialog && <Dialog setModalId={setModalId} />}
    </>
  );
};

export default DNSItem;
