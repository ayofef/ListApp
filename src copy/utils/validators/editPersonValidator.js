import * as Yup from 'yup';

const editPersonValidator = Yup.object().shape({
  companyRole: Yup.string().required('Role is required'),
});

export default editPersonValidator;
