export const inputFieldsDataTypes = ['AMOUNT', 'FLOAT', 'LONG', 'LONG_STRING', 'STRING'];

export const getIsInputFieldDataType = (dataType) => !!inputFieldsDataTypes.find((type) => type === dataType);
