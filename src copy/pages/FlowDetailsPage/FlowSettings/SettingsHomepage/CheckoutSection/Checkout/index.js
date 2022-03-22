import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import capitalize from '@material-ui/core/utils/capitalize';

import { StyledBarSections } from '../../../components/StyledInPageSection/styled';

import { ButtonRounded, P16B, P14, P14B } from '../../../../../../components/atoms';
import { StyledWrapper } from './styled';
import CHECKOUT_IMG from '../../../../../../assets/img/checkout.png';
import THEME from '../../../../../../constants/theme';
import { usePaymentFlowContext } from '../../../../paymentFlowContext';
import { parseSmartId } from '../../../../../../utils/parseSmartId';
import { getPaymentMethodsOption } from '../../../../../../utils/generatePaymentMethodOptions';

const TITLE = 'WhenThen Hosted Checkout';
const DESC =
  "You made it easy - you're using our hosted checkout that already has all the necessary integrations built in";

const generateSubText = (total) => `${total} payment method${total > 1 ? 's' : ''} active`;
const IconFallback = () => <div />;

const Checkout = ({ handleConfigure }) => {
  const { t } = useTranslation();
  const { enabledPaymentMethods, connectedProcessors } = usePaymentFlowContext();

  /**
   * Map connection to paymentMethods
   */
  const transformConnections = useMemo(
    () =>
      enabledPaymentMethods.map((paymentMethod) => {
        const connectionObj = connectedProcessors?.find(
          (processor) => parseSmartId(processor?.id)[1] === paymentMethod?.connectionId
        );
        return Array.isArray(paymentMethod?.methods)
          ? paymentMethod?.methods?.map((method) => ({
              connectionId: connectionObj?.id,
              paymentMethod: method,
              connectionName: connectionObj?.name ?? connectionObj?.company?.name,
            }))
          : [];
      }),
    [enabledPaymentMethods, connectedProcessors]
  );

  /**
   * use getPaymentMethodsOption to attach paymentMethod icons
   */
  const parsedEnabledPaymentMethods = useMemo(
    () => getPaymentMethodsOption(transformConnections?.flat()?.filter(Boolean)),
    [transformConnections]
  );

  return (
    <Box>
      <StyledBarSections>
        <StyledWrapper>
          <Box display="flex" flexDirection="column" flex={1.5}>
            <Box mb="auto">
              <P16B>{t(TITLE)}</P16B>
              <P14 color={THEME.greyColors.grey1}>{t(DESC)}</P14>
            </Box>
            <P14 fontWeight="500">{t(generateSubText(parsedEnabledPaymentMethods?.length ?? 0))}</P14>
          </Box>
          <Box flex={1}>
            <Box component="img" src={CHECKOUT_IMG} alt="WhenThen Checkout" />
          </Box>
        </StyledWrapper>

        {parsedEnabledPaymentMethods?.map((paymentMethod) => {
          const Icon = paymentMethod?.icon ?? IconFallback;

          return (
            <Box
              key={`${paymentMethod?.connectionId}-${paymentMethod?.paymentMethod}`}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mr="auto"
            >
              <Box display="flex" alignItems="center">
                <Box mr="12px">
                  <Icon />
                </Box>
                <Box display="flex" alignItems="center">
                  <P14B margin="0 12px 0 0">{capitalize(t(paymentMethod?.label) ?? '')}</P14B>
                  <P14 color={THEME.greyColors.grey1}>{capitalize(t(paymentMethod?.connectionName) ?? '')}</P14>
                </Box>
              </Box>
            </Box>
          );
        })}

        <Box display="flex" alignItems="center" justifyContent="flex-end">
          <ButtonRounded onClick={handleConfigure} color="primary" type="button" variant="contained">
            {t('Configure')}
          </ButtonRounded>
        </Box>
      </StyledBarSections>
    </Box>
  );
};

Checkout.propTypes = {
  handleConfigure: PropTypes.func.isRequired,
};

export default Checkout;
