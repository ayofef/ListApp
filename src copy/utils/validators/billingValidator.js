import * as Yup from 'yup';

const invitationValidator = Yup.object().shape({
  companyName: Yup.string().required('Company name is required'),
  billingEmail: Yup.string()
    .email('Email is not valid')
    .required('Billing email is required'),
  line1: Yup.string().required('Address is required'),
  locality: Yup.string().required('City (locality) is required'),
  country: Yup.string().required('Country is required'),
  postcode: Yup.string().required('ZIP / Postal code is required'),
});

export default invitationValidator;
