import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import { useMutation } from '@apollo/client';
import SMTPValidator from '../../../utils/validators/SMTPValidator';
import { updateCache } from './updateCache';
import { GQL_M_SMTP_SETTINGS_SAVE } from '../../../utils/queries/customer/customerMutations';

const SMTPForm = ({ children, initialValues, onCompleted }) => {
  const [savePromise] = useMutation(GQL_M_SMTP_SETTINGS_SAVE, {
    onCompleted,
    update: updateCache,
  });
  const onSubmit = useCallback((variables) => savePromise({ variables }), [savePromise]);

  return (
    <Formik initialValues={initialValues} validate={SMTPValidator} onSubmit={onSubmit} validateOnMount>
      <Form>{children}</Form>
    </Formik>
  );
};

SMTPForm.propTypes = {
  initialValues: PropTypes.shape({}),
  onCompleted: PropTypes.func,
};

SMTPForm.defaultProps = {
  initialValues: {
    serverAddress: '',
    username: '',
    password: '',
    encryptionType: 'SSL',
    portNumber: '',
  },
  onCompleted: () => {},
};

export default SMTPForm;
