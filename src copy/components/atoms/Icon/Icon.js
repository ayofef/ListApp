import React from 'react';
import { oneOf, string } from 'prop-types';
import THEME from '../../../constants/theme';
import {
  Close,
  FlowStep,
  NodeBackTime,
  NodeCalendar,
  NodeChain,
  NodeChat,
  NodeCondition,
  NodeCreditCard,
  NodeFilter,
  NodeHeads,
  NodeList,
  NodeSearch,
  NodeWindow,
  PanelClose,
  PanelOpen,
  SupportTicket,
  WhenThen,
} from '../../../assets/icons';
import Rules from '../../../assets/icons/Rules';
import Processing from '../../../assets/icons/Processing';
import ShoppingCart from '../../../assets/icons/ShoppingCart';
import PaymentMethod from '../../../assets/icons/PaymentMethod';
import Shield from '../../../assets/icons/Shield';
import Count from '../../../assets/icons/Count';

const ICON_MAP = {
  FlowStep: NodeFilter,
  FlowCondition: FlowStep,
  WhenThen: WhenThen,
  PanelClose: PanelClose,
  PanelOpen: PanelOpen,
  SupportAction: NodeList,
  PaymentAction: NodeCreditCard,
  FlowAction: NodeFilter,
  CommsAction: NodeChat,
  CORE_CRM_TICKET_TRIGGER: SupportTicket,
  SCHEDULED_TRIGGER: NodeCalendar,
  CORE_PAYMENT_TRIGGER: NodeCreditCard,
  WEBHOOK_TRIGGER: NodeChain,
  WEBHOOK_ACTION: NodeChain,
  FIND_LINKED_DATA_ACTION: NodeList,
  STEP_ACTION_DATALOOKUP: NodeSearch,
  STEP_ACTION_DATAEXPORT: NodeList,
  CORE_CARD_CONDITION: NodeCreditCard,
  CORE_PAYMENT_CONDITION: NodeCondition,
  COLLECT: NodeWindow,
  CHARGE: NodeCreditCard,
  CAPTURE: NodeCreditCard,
  DELAY_ACTION: NodeBackTime,
  FLOW_STEP_COLLECT: NodeCreditCard,
  FLOW_STEP_CHARGE: NodeCreditCard,
  RULES_STEP: Rules,
  USER_ACTION_CONDITION: NodeHeads,
  FLOW_STEP_PROCESSING_TRIGGER: Processing,
  FLOW_STEP_CHECKOUT: ShoppingCart,
  CUSTOM_CONDITION: NodeCondition,
  PAYMENT_METHOD_CONDITION: PaymentMethod,
  '3D_SECURE_STEP': Shield,
  COUNT_CONDITION_STEP: Count,
  None: null,
};

const ICON_SIZES = {
  s: 16,
  m: 24,
  l: 40,
};

const Icon = ({ icon, color, size }) => {
  if (icon === 'None') return null;
  const IconComponent = ICON_MAP[icon] ?? Close;
  const sizePx = ICON_SIZES[size];
  return <IconComponent color={color} size={sizePx} />;
};

Icon.propTypes = {
  icon: oneOf(Object.keys(ICON_MAP)).isRequired,
  color: string,
  size: oneOf(Object.keys(ICON_SIZES)),
};

Icon.defaultProps = {
  color: THEME.primaryColors.black,
  size: 'm',
};
export default Icon;
