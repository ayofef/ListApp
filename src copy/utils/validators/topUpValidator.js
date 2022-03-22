import * as Yup from 'yup';

const topUpValidator = Yup.object().shape({
  amount: Yup.string().required('Amount is required'),
  statementDescriptor: Yup.string().required('Statement descriptor is required'),
  description: Yup.string().required('Description is required'),
  confirmation: Yup.boolean().oneOf([true], 'Confirmation is required'),
});

export default topUpValidator;
