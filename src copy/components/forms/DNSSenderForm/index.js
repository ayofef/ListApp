import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { Form, Formik } from 'formik';
import pick from 'lodash/pick';
import DNSValidator from '../../../utils/validators/DNSValidator';
import { GQL_M_SAVE_DOMAIN_SETTINGS } from '../../../utils/queries/customer/customerMutations';
import { GET_ME_AND_WE } from '../../../utils/queries/public/publicQueries';
import { useNotificationManager } from '../../../hooks/useNotificationManager';

const DNSSenderForm = ({ initialValues, children, onCompleted }) => {
  const [savePromise, { error }] = useMutation(GQL_M_SAVE_DOMAIN_SETTINGS, {
    update: (cache, { data }) => {
      const nextDomainSettings = data?.saveOrUpdateCustomDomainSettings;
      const existing = cache.readQuery({ query: GET_ME_AND_WE });

      if (!nextDomainSettings || !existing) {
        return;
      }

      cache.writeQuery({
        query: GET_ME_AND_WE,
        data: {
          ...existing,
          we: {
            ...existing.we,
            customDomainSettings: {
              ...existing.we.customDomainSettings,
              ...nextDomainSettings,
            },
          },
        },
      });
    },
  });
  useNotificationManager('error', error?.message, 'Save DNS Settings');
  const onSubmit = useCallback(
    (values) => {
      savePromise({ variables: pick(values, ['displayName', 'emailAddress']) }).then(({ errors }) => {
        if (errors) {
          return;
        }

        onCompleted();
      });
    },
    [onCompleted, savePromise]
  );

  return (
    <Formik
      initialValues={initialValues}
      validate={DNSValidator}
      onSubmit={onSubmit}
      validateOnMount
      enableReinitialize
    >
      <Form>{children}</Form>
    </Formik>
  );
};

DNSSenderForm.propTypes = {
  initialValues: PropTypes.shape({}).isRequired,
  onCompleted: PropTypes.func,
};

DNSSenderForm.defaultProps = {
  onCompleted: () => {},
};

export default DNSSenderForm;
