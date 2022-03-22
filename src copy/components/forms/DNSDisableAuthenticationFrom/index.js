import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { NotificationManager } from 'react-notifications';
import { GQL_M_DISABLE_DOMAIN_SETTINGS } from '../../../utils/queries/customer/customerMutations';
import { GET_ME_AND_WE } from '../../../utils/queries/public/publicQueries';
import { useNotificationManager } from '../../../hooks/useNotificationManager';

const DNSDisableAuthenticationFrom = ({ domainId, children, onCompleted }) => {
  const [verifyPromise, { error }] = useMutation(GQL_M_DISABLE_DOMAIN_SETTINGS, {
    update: (cache, { data }) => {
      const result = data?.disableCustomDomainAuthentication;
      const existing = cache.readQuery({ query: GET_ME_AND_WE });

      if (result === undefined || !existing) {
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
              lastAuthenticationStatus: result,
            },
          },
        },
      });
    },
  });
  useNotificationManager('error', error?.message, 'Disable DNS Settings');

  const onSubmit = useCallback(
    (variables) =>
      verifyPromise({ variables }).then(({ errors, data }) => {
        const result = data?.disableCustomDomainAuthentication;
        if (errors) {
          return;
        }

        if (result === false) {
          NotificationManager.error('DNS is not verified.', 'Disable DNS Settings.');
          return;
        }

        onCompleted();
      }),
    [onCompleted, verifyPromise]
  );

  return (
    <Formik initialValues={{ id: domainId }} onSubmit={onSubmit} enableReinitialize>
      <Form>{children}</Form>
    </Formik>
  );
};

DNSDisableAuthenticationFrom.propTypes = {
  domainId: PropTypes.string.isRequired,
  onCompleted: PropTypes.func,
};

DNSDisableAuthenticationFrom.defaultProps = {
  onCompleted: () => {},
};

export default DNSDisableAuthenticationFrom;
