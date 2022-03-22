const EXCEPTION_DICTIONARY = {
  upgradePlan: 'error.payment.flow.plan.insufficient',
};

const EXCEPTIONS_TO_HANDLE = [EXCEPTION_DICTIONARY.upgradePlan];

const findExeption = (graphQLErrors) =>
  graphQLErrors?.find((el) => EXCEPTIONS_TO_HANDLE?.includes(el?.extensions?.code))?.extensions?.code;

export { findExeption, EXCEPTION_DICTIONARY };
