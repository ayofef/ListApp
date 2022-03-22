import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { useLazyQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next/src/index';
import { UI_ROUTES } from '../../../../constants/routes';
import { StyledDivider } from '../../components/Details/styled';
import { H2, P14 } from '../../../../components/atoms';
import LoadingState from '../../components/Details/LoadingState';
import { mapBillingAddressToSectionData } from './constant';
import CustomerBlock from './CustomerBlock';
import PaymentMethodBlock from './PaymentMethodBlock';
import BillingAddressBlock from './BillingAddressBlock';
import { useNotificationManager } from '../../../../hooks/useNotificationManager';
import { PAYMENT_METHOD_ICON_MAP } from '../../../../assets/icons/PaymentMethods';
import { CardNumberHeader, CustomerLink } from './styled';
import { MainContent, SideLeft, TopBox, TopBoxesWrapper } from '../../../../components/GridSystem/styled';
import { GET_CUSTOMER } from '../../../../utils/queries/dataTables/customers';
import CircleImage from '../../../../components/table/CircleImage';
import LinkedPaymentGateways from './LinkedPaymentGateways';
import MaskedCard from '../../../../components/MaskedCard';

const TITLE_COLOR = '#787F88';

const Details = ({ loading, card }) => {
  const { t } = useTranslation();

  const billingAddress = useMemo(() => mapBillingAddressToSectionData(card?.billingAddress), [card?.billingAddress]);
  const CardIcon = PAYMENT_METHOD_ICON_MAP[card?.brand] ?? PAYMENT_METHOD_ICON_MAP.UNKNOWN_CARD;
  const [getCustomer, { called, error, data }] = useLazyQuery(GET_CUSTOMER, {
    variables: { id: card?.vaultCustomerId },
  });
  useNotificationManager('error', error?.message, 'Card details', 5000);
  const customer = useMemo(() => data?.getCustomer ?? {}, [data]);

  useEffect(() => {
    if (!card?.vaultCustomerId) return;
    if (!called) {
      getCustomer();
    }
  }, [getCustomer, called, card?.vaultCustomerId]);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <Box p="0 0 24px 8px">
      <Box component="section" mt="42px" mb="40px">
        <CardNumberHeader mb="24px" display="flex">
          {CardIcon && <CardIcon />}
          <H2 fontSize="32px" fontWeight="700">
            <MaskedCard cardNumber={card?.number} fontSize={32} transform="translateY(-2px)" />
          </H2>
        </CardNumberHeader>
        <TopBoxesWrapper>
          {card && (
            <TopBox>
              <P14 color={TITLE_COLOR}>ID</P14>
              <P14>{card.id}</P14>
            </TopBox>
          )}
          {customer && (
            <>
              <TopBox>
                <P14 color={TITLE_COLOR}>{t('Customer ID')}</P14>
                <P14>{customer.id}</P14>
              </TopBox>
              <TopBox>
                <P14 color={TITLE_COLOR}>{t('Customer Name')}</P14>
                <CustomerLink
                  display="flex"
                  alignItems="center"
                  {...(customer.id && {
                    as: Link,
                    to: `${UI_ROUTES.customersDataTables}/details/${customer.id}`,
                    $allowHoverState: true,
                  })}
                >
                  <CircleImage
                    bgColor="#E6E9EC"
                    color="#232629"
                    text={customer?.name ?? 'Guest'}
                    textOnly
                    size={20}
                    fontSize="10px"
                    margin="0 8px 0 0"
                  />
                  <P14>{customer.name}</P14>
                </CustomerLink>
              </TopBox>
            </>
          )}
        </TopBoxesWrapper>
      </Box>

      <StyledDivider />

      <MainContent>
        <SideLeft>
          {card && <PaymentMethodBlock card={card} />}
          {customer && <CustomerBlock customer={customer} isDefault={card?.isDefault} />}
          {card && <BillingAddressBlock billingAddress={billingAddress} />}
          <LinkedPaymentGateways linkedPaymentGateways={card?.linkedPaymentGateways ?? []} />
        </SideLeft>
      </MainContent>
    </Box>
  );
};

Details.propTypes = {
  card: PropTypes.shape({
    billingAddress: PropTypes.shape({}),
    brand: PropTypes.string,
    number: PropTypes.string,
    name: PropTypes.string,
    token: PropTypes.string,
    type: PropTypes.string,
    expMonth: PropTypes.number,
    expYear: PropTypes.number,
    id: PropTypes.string,
    vaultCustomerId: PropTypes.string,
    isDefault: PropTypes.bool,
    linkedPaymentGateways: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Details;
