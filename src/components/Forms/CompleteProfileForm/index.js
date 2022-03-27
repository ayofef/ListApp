import React from 'react';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

import FormInput from '../FormInput';
import { StyledAuthForm } from '../AuthForm/styled';
import SubmitButton from '../SubmitButton';
import { INITIAL_VALUES, FIELD_PROPS, completeProfileSchema } from './constant';

function CompleteProfile({ loading, handleSubmit }) {
  return (
    <Formik initialValues={INITIAL_VALUES} validationSchema={completeProfileSchema} onSubmit={handleSubmit}>
      <Form>
        <StyledAuthForm>
          <Box mb="24px" width="100%">
            <FormInput {...FIELD_PROPS} />
          </Box>
          <SubmitButton loading={loading} label="Complete Registration" />
        </StyledAuthForm>
      </Form>
    </Formik>
  );
}

CompleteProfile.propTypes = {
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default CompleteProfile;
