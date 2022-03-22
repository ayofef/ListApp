const exampleDataTypes = {
  CORE_PAYMENT: 'CORE_PAYMENT',
  CORE_PAYMENT_ISSUE: 'CORE_PAYMENT_ISSUE',
  CORE_CRM_TICKET: 'CORE_CRM_TICKET',
  CORE_CRM_CONTACT: 'CORE_CRM_CONTACT',
  CORE_CRM_USER: 'CORE_CRM_USER',
  LinkFlowStep: 'LinkFlowStep',
};

const exampleDataTypeTitles = {
  CORE_PAYMENT: 'Choose payment',
  CORE_PAYMENT_ISSUE: 'Payment issue',
  CORE_CRM_TICKET: 'CRM ticket',
  CORE_CRM_CONTACT: 'CRM contact',
  CORE_CRM_USER: 'CRM user',
  CORE_CARD: 'Choose card',
};

const exampleDataValues = {
  [exampleDataTypes.CORE_PAYMENT]: ['paymentCore.txnId', 'date', 'status', 'paymentMethodDetails.paymentMethod'],
  [exampleDataTypes.CORE_PAYMENT_ISSUE]: ['status', 'type', 'priority', 'userAssigneeName'],
  [exampleDataTypes.CORE_CRM_TICKET]: ['status', 'type', 'subject'],
  [exampleDataTypes.LinkFlowStep]: ['name', 'email'],
  // CORE_CRM_CONTACT: 'CORE_CRM_CONTACT',
  // CORE_CRM_USER: 'CORE_CRM_USER',
};

const LABEL_DICTIONARY = {
  paymentMethod: 'Payment method',
  txnId: 'Transaction id',
};

const getDataObject = (data, key) => {
  if (data[key]) {
    const label = LABEL_DICTIONARY[key] ?? key;
    const value = data[key]?.value;

    return {
      label,
      value,
    };
  }

  if (key?.includes('.')) {
    const [dataKey, valueKey] = key?.split('.');

    if (Array.isArray(data[dataKey]?.value)) {
      const valuesObj = data[dataKey]?.value?.find((el) => el?.key === valueKey);
      return {
        label: LABEL_DICTIONARY[valueKey] ?? valueKey,
        value: valuesObj?.value,
      };
    }
  }

  return null;
};

export { LABEL_DICTIONARY, exampleDataTypes, exampleDataTypeTitles, exampleDataValues, getDataObject };
