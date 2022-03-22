import billingValidator from '../validators/billingValidator';

const billingFieldsNames = {
  companyName: 'companyName',
  billingEmail: 'billingEmail',
  taxId: 'taxId',
  line1: 'line1',
  line2: 'line2',
  locality: 'locality',
  region: 'region',
  country: 'country',
  postcode: 'postcode',
};

export const billingFields = [
  { field: billingFieldsNames.companyName, label: 'Company name' },
  { field: billingFieldsNames.billingEmail, label: 'Billing email' },
  { field: billingFieldsNames.taxId, label: 'VAT Number / Tax ID' },
  { field: billingFieldsNames.line1, label: 'Address line 1' },
  { field: billingFieldsNames.line2, label: 'Address line 2' },
  { field: billingFieldsNames.locality, label: 'City*' },
  { field: billingFieldsNames.region, label: 'State / Province' },
  { field: billingFieldsNames.country, label: 'Country*' },
  { field: billingFieldsNames.postcode, label: 'ZIP / Postal code*' },
];

const billingSchema = {
  mapPropsToValues: ({ initalValues }) => {
    return {
      [billingFieldsNames.companyName]: initalValues.companyName || '',
      [billingFieldsNames.billingEmail]: initalValues.billingEmail || '',
      [billingFieldsNames.taxId]: initalValues.taxId || '',
      [billingFieldsNames.line1]: initalValues.billingAddress?.line1 || '',
      [billingFieldsNames.line2]: initalValues.billingAddress?.line2 || '',
      [billingFieldsNames.locality]: initalValues.billingAddress?.locality || '',
      [billingFieldsNames.region]: initalValues.billingAddress?.region || '',
      [billingFieldsNames.country]: initalValues.billingAddress?.country || '',
      [billingFieldsNames.postcode]: initalValues.billingAddress?.postcode || '',
    };
  },
  validationSchema: billingValidator,
  displayName: 'billingForm',
};

export default billingSchema;
