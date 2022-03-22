import * as Yup from 'yup';

const NAME_VALIDATOR = Yup.string()
  .trim()
  .matches(/^[a-zA-Z\s]*$/, 'No special characters or numbers allowed')
  .required('Full name is required');

const addressObj = {
  line1: '',
  line2: '',
  city: '',
  postalCode: '',
  state: '',
  country: '',
};

const createAutoCompleteOption = (data) => data?.map(({ node }) => node) ?? [];

export { NAME_VALIDATOR, addressObj, createAutoCompleteOption };
