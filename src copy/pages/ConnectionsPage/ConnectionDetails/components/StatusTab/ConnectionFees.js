import React, { useMemo } from 'react';
import Box from '@material-ui/core/Box';
import CallMadeIcon from '@material-ui/icons/CallMadeRounded';
import { Formik } from 'formik';
import { string } from 'prop-types';
import { NotificationManager } from 'react-notifications';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';
import { P14, ButtonRounded, P16B } from '../../../../../components/atoms';
import THEME from '../../../../../constants/theme';
import FeesForm from '../FeesForm';
import { useGetConnectionFee, useUpdateConnectionData } from '../../../../../hooks/connectionsHooks';
import { useGetCurrencies } from '../../../../../hooks/useGetOptions';
import LoadingState from '../LoadingState';
import { useNotificationManager } from '../../../../../hooks/useNotificationManager';
import { StyledIcon } from '../styled';
import { StyledWrapper, StyledTitleWrapper } from './styled';
import { generateUserPilotAttribute } from '../../../../../constants/generateUserPilotLabel';
import { USER_PILOT_SECTION_ID } from '../../../constant';

const TITLE = 'General settings';
const FEES_DESC =
  'We can help you track your payment fees. Please enter the current fees you are charged with this gateway.';

const ConnectionFees = ({ connectionId, pricingUrl, connectionName }) => {
  const { t } = useTranslation();
  const { fee, loading: feeLoading, error } = useGetConnectionFee(connectionId);
  const { setFees } = useUpdateConnectionData(connectionId);

  const { options, loading: optionsLoading } = useGetCurrencies();
  const loading = feeLoading || optionsLoading;

  useNotificationManager('error', error?.message, 'General setting', 5000);

  const onSubmit = ({ percentage, fixed, currency }) => {
    setFees({
      variables: {
        id: connectionId,
        fee: {
          percentage: percentage || '0',
          fixed: fixed || '0',
          currency,
        },
      },
    }).then((res) => {
      if (res && !isEmpty(res?.errors)) {
        NotificationManager.error(res.errors[0].message, TITLE, 5000);
        return;
      }
      NotificationManager.success('Fees successfully updated', TITLE, 5000);
    });
  };

  const initialValues = useMemo(
    () => ({
      percentage: fee?.percentage || '0',
      fixed: fee?.fixed || '0',
      currency: fee?.currency || '',
    }),
    [fee]
  );

  return (
    <StyledWrapper {...generateUserPilotAttribute(USER_PILOT_SECTION_ID, 'status', 'fees')}>
      <StyledTitleWrapper p="24px 24px 16px 24px">
        <P16B margin="0 0 8px 0">{t('Fees')}</P16B>
        <P14 color={THEME.greyColors.grey1}>{FEES_DESC}</P14>
        <Box display="flex" fontSize="14px">
          <ButtonRounded
            component="a"
            variant="text"
            color="primary"
            href={pricingUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            <Box component="span" fontWeight="normal">
              {connectionName} Pricing
            </Box>
            <StyledIcon>
              <CallMadeIcon color="inherit" fontSize="inherit" />
            </StyledIcon>
          </ButtonRounded>
        </Box>
      </StyledTitleWrapper>
      <Box width="100%" p="26px 24px 24px 24px">
        {loading ? (
          <LoadingState />
        ) : (
          <Formik initialValues={initialValues} onSubmit={onSubmit} validateOnBlur enableReinitialize>
            <FeesForm currencyOptions={options} />
          </Formik>
        )}
      </Box>
    </StyledWrapper>
  );
};

ConnectionFees.propTypes = {
  connectionId: string.isRequired,
  pricingUrl: string.isRequired,
  connectionName: string.isRequired,
};

export default ConnectionFees;
