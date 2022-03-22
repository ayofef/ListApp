import React from 'react';
import { useLocation } from 'react-router-dom';
import { L16B } from '../../../../components/atoms/Typography/L16B';
import CardStage from './CardStage';
import { ConfigurationWrapper, HeadingBlock } from './styled';
import { NodeCart, NodeCreditCard, Connection } from '../../../../assets/icons';
import THEME from '../../../../constants/theme';
import { usePaymentFlowContext } from '../../paymentFlowContext';

const CardStages = () => {
  const { flow, flowId, automationsList } = usePaymentFlowContext();
  const { search } = useLocation();
  const paymentGateways = flow?.enabledGateways ?? [];

  const paymentMethods = flow?.paymentMethods ?? flow?.enabledGateways ?? [];

  return (
    <ConfigurationWrapper display="flex" flexDirection="column">
      <HeadingBlock>
        <L16B>Configuration</L16B>
      </HeadingBlock>
      <CardStage
        title="Payment Gateways"
        value={paymentGateways?.length}
        Icon={NodeCart}
        color={THEME.secondaryColors.purple}
        link={`/flows/${flowId}/details/settings/payment-processors${search}`}
        linkText="Add connection"
      />
      <CardStage
        title="Payment Methods"
        Icon={NodeCreditCard}
        value={paymentMethods?.length}
        color={THEME.secondaryColors.teal}
        link={`/flows/${flowId}/details/settings/checkout${search}`}
        linkText="Add payment method"
      />
      <CardStage
        title="Automations"
        value={automationsList?.length}
        Icon={Connection}
        color={THEME.secondaryColors.salmon}
        link={`/flows/${flowId}/details/automations${search}`}
        linkText="Add automation"
      />
    </ConfigurationWrapper>
  );
};

export default CardStages;
