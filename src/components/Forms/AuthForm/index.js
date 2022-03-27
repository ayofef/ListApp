import React from 'react';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

import FormInput from '../FormInput';
import { StyledAuthForm } from './styled';
import SubmitButton from '../SubmitButton';
import { INITIAL_VALUES, FIELD_PROPS, SignUpSchema } from './constant';
import IconButton from '../../atoms/IconButton';
import { P16 } from '../../atoms/P16';

const generateLabel = (isSignInAuthType) => `Email a Sign ${isSignInAuthType ? 'in' : 'up'} Link`;

function AuthForm({ loading, handleSubmit, toggleAuthType, isSignInAuthType }) {
  const submitLabel = generateLabel(isSignInAuthType);

  return (
    <>
      <Formik initialValues={INITIAL_VALUES} validationSchema={SignUpSchema} onSubmit={handleSubmit}>
        <Form>
          <StyledAuthForm>
            <Box mb="24px" width="100%">
              <FormInput {...FIELD_PROPS} />
            </Box>
            <SubmitButton loading={loading} label={submitLabel} />
          </StyledAuthForm>
        </Form>
      </Formik>

      <Box mt="24px" display="flex" alignItems="center">
        <P16 $margin="0 6px 0 0">{isSignInAuthType ? 'Dont' : 'Already'} have an account?</P16>
        <IconButton
          width="auto"
          showIcon={false}
          fontWeight="600"
          onClick={toggleAuthType}
          label={isSignInAuthType ? 'Sign Up' : 'Sign In'}
        />
      </Box>
    </>
  );
}

AuthForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  toggleAuthType: PropTypes.func.isRequired,
  isSignInAuthType: PropTypes.bool.isRequired,
};

export default AuthForm;
