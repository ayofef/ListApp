import React from 'react';
import { Formik } from 'formik';

import PureLayout from '../../components/layouts/PureLayout';
import PureLayoutBox from '../../components/layouts/PureLayoutBox';
import SignUpCompanyDetailsForm from '../../components/forms/SignUpCompanyDetailsForm';
import confirmDetailsValidator from '../../utils/validators/confirmDetailsValidator';
import { useSignUpBeta } from './useSignUpBeta';

const SignUpCompanyDetails = () => {
  const { signUpBeta, parsedInitialValues, loading } = useSignUpBeta();

  const handleSubmit = async (values, actions) => {
    try {
      await signUpBeta(values);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <PureLayout theme="dark">
      <PureLayoutBox theme="dark">
        <Formik
          initialValues={parsedInitialValues}
          validate={confirmDetailsValidator}
          disabled={loading}
          onSubmit={handleSubmit}
          validateOnBlur
        >
          <SignUpCompanyDetailsForm loading={loading} />
        </Formik>
      </PureLayoutBox>
    </PureLayout>
  );
};

export default SignUpCompanyDetails;
