import React from 'react';
import Box from '@material-ui/core/Box';
import isEmpty from 'lodash/isEmpty';

import Attachments from './sections/Attachments';
import CustomerBlock from './sections/Customer/CustomerBlock';
import Metadata from './sections/Metadata';
import FlowsBlock from './sections/FlowsBlock';
import Summary from './sections/Summary';
import Timeline from './sections/Timeline';
import PaymentAttemptSection from './sections/PaymentAttemptSection';
import PaymentDetailsIssueBlock from '../Issues/PaymentDetailsIssueBlock';

import LoadingState from './LoadingState';
import { MainContent, SideLeft, SideRight } from '../../../components/GridSystem/styled';
import { StyledDivider } from './_common/styled';
import TableSection from '../../DataTables/components/Details/TableSection';
import RiskSection from './sections/RiskSection';
import { isDefined } from '../../../utils/helpers';
import { parseJSON } from '../../../utils/parseJSON';
import { INTENT_STATUSES } from './constant';
import {
  PAYMENT_DESCRIBED_KEYS,
  PAYMENT_DETAILS_DATA_KEYS,
  PAYMENT_METHOD_DATA_KEYS,
  FRAUD_DATA_KEYS,
  INTENT_SECTION_DATA_KEYS,
} from './paymentDescribedDataKeys';
import { PAYMENT_DETAILS_SECTION_COMPONENT_MAP } from './paymentDetailsComponentMap';
import usePermission from '../../../permissions/hooks/usePermission';
import { PAYMENTS_PERMISSIONS_IDS } from '../permissions';
import { useGetPaymentDetailsData } from './hooks/useGetPaymentDetailsData';

import { getIntentSectionData, getPaymentDetailsSectionData, getPaymentMethodSectionData } from './_utils';

const Details = () => {
  const [hasPaymentManagementPermission] = usePermission(PAYMENTS_PERMISSIONS_IDS.paymentsManagement);

  const { payment, intent, loading, error, id } = useGetPaymentDetailsData();

  const isIntent = INTENT_STATUSES.includes(payment?.status?.value);

  /*Intent Section */
  const intentSectionData = getIntentSectionData(intent);

  /*Payment Details Section */
  const paymentAttempts =
    intent.linkedPayments
      ?.filter((linkedPayment) => linkedPayment.paymentId !== id)
      ?.filter((linkedPayment) => !INTENT_STATUSES.includes(linkedPayment.status)) || [];

  /* Payment Flow Section */
  const flowId = payment.flowId?.value;

  /* Fraud Section */
  const paymentFraudData = isDefined(payment.fraud?.value) ? payment.fraud : null;

  /*Payment Details Section - Merging paymentGateway with paymentDetails */
  const paymentDetailsData = getPaymentDetailsSectionData({ isIntent, payment });

  /*Payment Method Section */
  const paymentMethodData = getPaymentMethodSectionData({ isIntent, payment });

  /*Customer Section */
  const customerData = isDefined(payment.paymentCustomer?.value)
    ? {
        ...(payment.paymentCustomer || {}),
      }
    : {
        ...(intent.customer || {}),
      };

  /*Metadata */
  const metadata = parseJSON(payment.metadata?.value);

  /*Timeline */
  const timelineData = {
    paymentData: payment?.paymentTimeline,
    intentData: intent?.timeline,
  };

  if (error && !loading) {
    return (
      <Box p={2} textAlign="center" bgcolor="error.main" color="error.contrastText">
        {error.message}
      </Box>
    );
  }

  if (loading) {
    return <LoadingState />;
  }

  return (
    <Box p="0 0 24px 8px">
      <Summary payment={payment} intentTrackingId={intent.trackingId} customer={customerData} />

      <StyledDivider />

      <MainContent>
        <SideLeft>
          <FlowsBlock flowId={flowId} />

          {!isEmpty(intent) && (
            <TableSection
              header="Intent"
              data={intentSectionData}
              dataKey={INTENT_SECTION_DATA_KEYS}
              customComponentsMap={PAYMENT_DETAILS_SECTION_COMPONENT_MAP}
            />
          )}

          {!isEmpty(paymentAttempts) && <PaymentAttemptSection paymentAttempts={paymentAttempts} />}

          <RiskSection payment={payment} />

          {paymentFraudData && (
            <TableSection
              header="Fraud"
              data={paymentFraudData}
              dataKey={FRAUD_DATA_KEYS}
              customComponentsMap={PAYMENT_DETAILS_SECTION_COMPONENT_MAP}
              hideLabelKeys={[PAYMENT_DESCRIBED_KEYS.fraudAdditionalData]}
            />
          )}

          <CustomerBlock data={customerData} />

          <TableSection
            header="Payment Details"
            data={paymentDetailsData}
            dataKey={PAYMENT_DETAILS_DATA_KEYS}
            customComponentsMap={PAYMENT_DETAILS_SECTION_COMPONENT_MAP}
          />

          <TableSection
            header="Payment Method"
            data={paymentMethodData}
            dataKey={PAYMENT_METHOD_DATA_KEYS}
            customComponentsMap={PAYMENT_DETAILS_SECTION_COMPONENT_MAP}
          />

          {hasPaymentManagementPermission && <PaymentDetailsIssueBlock />}

          <Metadata json={metadata} />

          <Attachments list={payment?.attachments?.value || []} />
        </SideLeft>
        <SideRight>
          <Timeline timelineData={timelineData} />
        </SideRight>
      </MainContent>
    </Box>
  );
};

export default Details;
