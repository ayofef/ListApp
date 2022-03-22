import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { Form, Formik } from 'formik';
import { GQL_M_CREATE_PAYMENT_FLOW } from '../../../utils/queries/flows/mutations';
import { GET_FLOW_LIST } from '../../../utils/queries/flows/flowsQueries';

import { useNotificationManager } from '../../../hooks/useNotificationManager';

import { transformValuesToBool } from './constant';

const mutateOptions = {
  refetchQueries: [{ query: GET_FLOW_LIST }],
  awaitRefetchQueries: true,
};

const SurveyForm = ({ initialValues, onSuccess, children }) => {
  const [createPaymentFlowPromise, { error }] = useMutation(GQL_M_CREATE_PAYMENT_FLOW, mutateOptions);
  useNotificationManager('error', error?.message, 'Create Payment Flow');

  const onSubmit = useCallback(
    (values) => {
      return createPaymentFlowPromise({ variables: { customerInputs: transformValuesToBool(values) } }).then(
        ({ data }) => {
          const paymentFlow = data?.createPaymentFlow;

          if (paymentFlow) {
            onSuccess(paymentFlow);
          }
        }
      );
    },
    [createPaymentFlowPromise, onSuccess]
  );

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>{children}</Form>
    </Formik>
  );
};

SurveyForm.propTypes = {
  initialValues: PropTypes.shape({}).isRequired,
  onSuccess: PropTypes.func,
};

SurveyForm.defaultProps = {
  onSuccess: () => {},
};

export default SurveyForm;
