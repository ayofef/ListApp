import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';
import capitalize from '@material-ui/core/utils/capitalize';
import omit from 'lodash/omit';
import { useHistory } from 'react-router-dom';
// import { NotificationManager } from 'react-notifications';
import { StyledDivider } from '../../components/Details/styled';
// import { H2, P14, CopyToClipboard } from '../../../../components/atoms';
import { H2, P14 } from '../../../../components/atoms';
import LoadingState from '../../components/Details/LoadingState';
import { ROW_DETAILS } from './constant';
import { BILLING_DETAILS, flattenNestedObject, SHIPPING_DETAILS } from '../../components/Details/constant';
import { MainContent, SideLeft, TopBox, TopBoxesWrapper } from '../../../../components/GridSystem/styled';
import TableSection from '../../components/Details/TableSection';
import LinkedPaymentMethods from '../../Cards/CardDetails/LinkedPaymentMethods';
import CustomerBlock from '../../Cards/CardDetails/CustomerBlock';

const TITLE_COLOR = '#787F88';

const Details = ({ loading, customer, linkedCards }) => {
  const { t } = useTranslation();
  const shippingAddress = omit(flattenNestedObject(customer?.shippingAddress), ['__typename']);
  const billingAddress = omit(flattenNestedObject(customer?.billingAddress), ['__typename']);

  const { push } = useHistory();
  const handleTableRowClick = useCallback(
    ({ id }) => {
      if (id) {
        push(`/data-tables/cards/details/${id}`);
      }
      return true;
    },
    [push]
  );

  // const handleCopy = useCallback(() => {
  //   NotificationManager.success(t('Copied customer id to clipboard'), 'Customers', 5000);
  // }, [t]);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <Box p="0 0 24px 8px">
      <Box component="section" mt="42px" mb="40px">
        <Box mb="22px">
          <H2 fontSize="32px" fontWeight="700">
            {capitalize(customer?.name ?? '')}
          </H2>
        </Box>

        <TopBoxesWrapper>
          {!isEmpty(customer) &&
            ROW_DETAILS.map((el) => {
              if (el === 'id') {
                return (
                  <TopBox key={el}>
                    <P14 color={TITLE_COLOR}>{t('Customer ID')}</P14>
                    <Box>{customer[el] || 'N/A'}</Box>
                    {/* <CopyToClipboard className="small" text={customer[el]} onCopy={handleCopy}>
                      <Box>{customer[el] || 'N/A'}</Box>
                    </CopyToClipboard> */}
                  </TopBox>
                );
              }
              return (
                <TopBox key={el}>
                  <P14 color={TITLE_COLOR}>{t(capitalize(el))}</P14>
                  <Box>{customer[el] || 'N/A'}</Box>
                </TopBox>
              );
            })}
        </TopBoxesWrapper>
      </Box>

      <StyledDivider />

      <MainContent>
        <SideLeft>
          {customer && <CustomerBlock customer={customer} isDefault={false} />}
          <TableSection header="Shipping Address" data={shippingAddress} dataKey={SHIPPING_DETAILS} />
          <TableSection header="Billing Address" data={billingAddress} dataKey={BILLING_DETAILS} />
          <LinkedPaymentMethods linkedPaymentMethods={linkedCards ?? []} handleRowClick={handleTableRowClick} />
        </SideLeft>
      </MainContent>
    </Box>
  );
};

Details.propTypes = {
  customer: PropTypes.shape({
    billingAddress: PropTypes.shape({}),
    email: PropTypes.string,
    name: PropTypes.string,
    shippingAddress: PropTypes.shape({}),
  }).isRequired,
  linkedCards: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Details;
