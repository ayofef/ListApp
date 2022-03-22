import React, { useCallback } from 'react';
import { bool, oneOf } from 'prop-types';
import { useTranslation } from 'react-i18next';

import { GoogleAuthButton } from '../atoms';
import { useNotificationManager } from '../../hooks/useNotificationManager';
import { useGoogleOAuth, GOOGLE_AUTH_TYPE, ROUTE_BY_GOOGLE_AUTH_TYPE_MAP } from '../../hooks/useGoogleOAuth';
import { TOAST_TIMEOUT, TOAST_UNEXPECTED_ERROR_TITLE } from '../../constants/toasts';

const GoogleAuth = ({ type, loading, children }) => {
  const { t } = useTranslation();
  const { authenticate, error } = useGoogleOAuth();

  useNotificationManager('error', error, t(TOAST_UNEXPECTED_ERROR_TITLE), TOAST_TIMEOUT);

  const handleCustomSignIn = useCallback(() => {
    const redirectUri = `${window.origin}${ROUTE_BY_GOOGLE_AUTH_TYPE_MAP[type]}`;
    authenticate(type, redirectUri);
  }, [authenticate, type]);

  return (
    <GoogleAuthButton handleClick={handleCustomSignIn} loading={loading}>
      {children}
    </GoogleAuthButton>
  );
};

GoogleAuth.propTypes = {
  type: oneOf(Object.values(GOOGLE_AUTH_TYPE)).isRequired,
  loading: bool,
};

GoogleAuth.defaultProps = {
  loading: false,
};

export default GoogleAuth;
