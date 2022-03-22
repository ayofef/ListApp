const COMMON_CONNECTION_STYLE_PROPS = {
  px: '32px',
  flex: '1 0 486px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  minHeight: '430px',
  overflow: 'auto',
  py: '40px',
  boxSizing: 'border-box',
};

const CONTAINER_HEIGHT = '514px';

const CONNECTION_CATEGORIES = {
  communication: 'Communication',
  fraud: 'Fraud',
  CRM: 'CRM',
  customerSupport: 'Customer Support',
  paymentGateway: 'Payment Gateway',
};

const CONNECTION_MODAL_CONTENT_MAP = {
  genericContent: (connectionName, connectionCategory) =>
    `By connecting your ${connectionName} account, you’ll allow WhenThen to direct authorisations to this ${connectionCategory} Service Provider.`,
  paymentGatewayContent: (connectionName, connectionCategory) =>
    `By connecting your ${connectionName} account, you'll allow WhenThen to direct authorizations to this ${connectionCategory} Service Provider. You'll also be able to monitor new and previous ${connectionName} transactions into your Insights page.`,
};

const getConnectionModalDescription = (connectionName, connectionCategory) => {
  const isPaymentGateway = connectionCategory === CONNECTION_CATEGORIES.paymentGateway;

  const description = isPaymentGateway
    ? CONNECTION_MODAL_CONTENT_MAP.paymentGatewayContent(connectionName, connectionCategory)
    : CONNECTION_MODAL_CONTENT_MAP.genericContent(connectionName, connectionCategory);

  return description;
};

const getConnectionFormBlock = (form) => {
  const SECTION_TYPE = 'section';

  const textBlock = form?.filter((item) => item?.type === SECTION_TYPE);
  const inputBlock = form?.filter((item) => item?.type !== SECTION_TYPE);

  return { textBlock, inputBlock };
};

export { COMMON_CONNECTION_STYLE_PROPS, CONTAINER_HEIGHT, getConnectionModalDescription, getConnectionFormBlock };
