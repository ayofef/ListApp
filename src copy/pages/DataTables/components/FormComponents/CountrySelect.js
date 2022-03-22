import React from 'react';

import { countryList } from '../../../../constants/countryList';
// TODO: Fix this. DataTables should not be using SignUp components.
import CustomSelect from '../../../../components/forms/SignUpCompanyDetailsForm/CustomSelect';

const options = countryList.map(({ name, 'alpha-3': alpha3 }) => ({ value: alpha3, text: { text: name } }));

const CountrySelect = (props) => {
  return (
    <div>
      <CustomSelect {...props} options={options} />
    </div>
  );
};

export default CountrySelect;
