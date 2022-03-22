import topUpValidator from '../validators/topUpValidator';

const topUpFieldsNames = {
  amount: 'amount',
  statementDescriptor: 'statementDescriptor',
  description: 'description',
  confirmation: 'confirmation',
};

export const topUpFields = [
  { field: topUpFieldsNames.amount, label: 'Amount' },
  { field: topUpFieldsNames.statementDescriptor, label: 'Statement descriptor' },
  { field: topUpFieldsNames.description, label: 'Description' },
  { field: topUpFieldsNames.confirmation, label: '' },
];

const topUpSchema = {
  mapPropsToValues: () => {
    return {
      [topUpFieldsNames.amount]: '',
      [topUpFieldsNames.statementDescriptor]: '',
      [topUpFieldsNames.description]: '',
      [topUpFieldsNames.confirmation]: false,
    };
  },
  validationSchema: topUpValidator,
  displayName: 'topUpForm',
};

export default topUpSchema;
