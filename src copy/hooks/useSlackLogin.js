import { useQuery } from '@apollo/client';
import React from 'react';

import { LOGIN_TYPES } from '../constants/api';
import { GET_LOGINS } from '../utils/queries/public/publicQueries';
import signInWithSlack from '../assets/img/signInWithSlack.svg';

const useSlackLogin = () => {
  const { loading, data } = useQuery(GET_LOGINS);
  const availableLogins = data?.getAvailableLogins?.find(({ type }) => type === LOGIN_TYPES.externalAuth);
  const slackLoginButton = !loading ? (
    // eslint-disable-next-line react/no-danger
    <span dangerouslySetInnerHTML={{ __html: availableLogins?.loginButton }} />
  ) : (
    <img src={signInWithSlack} alt="sign in with slack" />
  );

  const loginUrl = availableLogins?.loginUrl;

  return { slackLoginButton, loginUrl, loading };
};

export default useSlackLogin;
