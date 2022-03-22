import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { NotificationManager } from 'react-notifications';
import { GQL_M_VERIFY_DOMAIN_SETTINGS } from '../../../utils/queries/customer/customerMutations';
import { GET_ME_AND_WE } from '../../../utils/queries/public/publicQueries';
import { useNotificationManager } from '../../../hooks/useNotificationManager';

const DNSAuthenticationFrom = ({ domainId, children, onCompleted }) => {
  const [verifyPromise, { error }] = useMutation(GQL_M_VERIFY_DOMAIN_SETTINGS, {
    update: (cache, { data }) => {
      const isVerified = data?.verifyCustomDomainAuthentication;
      const existing = cache.readQuery({ query: GET_ME_AND_WE });

      if (isVerified === undefined || !existing) {
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
              lastAuthenticationStatus: isVerified,
            },
          },
        },
      });
    },
  });
  useNotificationManager('error', error?.message, 'Verify DNS Settings');

  const onSubmit = useCallback(
    (variables) =>
      verifyPromise({ variables }).then(({ errors, data }) => {
        const isVerified = data?.verifyCustomDomainAuthentication;
        if (errors) {
          return;
        }

        if (isVerified === false) {
          NotificationManager.error('DNS is not verified.', 'Verify DNS Settings.');
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

DNSAuthenticationFrom.propTypes = {
  domainId: PropTypes.string.isRequired,
  onCompleted: PropTypes.func,
};

DNSAuthenticationFrom.defaultProps = {
  onCompleted: () => {},
};

export default DNSAuthenticationFrom;
