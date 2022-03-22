import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import { useGlobalContext } from '../containers/App/context';
import { UI_ROUTES } from '../constants/routes';
import { EXTERNAL_OAUTH_TYPES } from '../constants/api';

import { O_AUTH_LOGIN } from '../utils/queries/public/publicMutations';
import { getAuthSlackCode } from '../utils/helpers';

const useCodeToSlackAuth = () => {
  const { setRefreshToken, setToken } = useGlobalContext();
  const history = useHistory();
  const [loginViaOAuth] = useMutation(O_AUTH_LOGIN);

  useEffect(() => {
    const {
      location: { pathname, search },
      push,
    } = history;

    if (pathname !== UI_ROUTES.slackAuth) return;

    loginViaOAuth({
      variables: {
        serviceName: EXTERNAL_OAUTH_TYPES.slack,
        code: getAuthSlackCode(search),
      },
    }).then((res) => {
      if (isEmpty(res.errors) && res.data) {
        const {
          loginViaOAuth: { token, refreshToken },
        } = res.data;
        if (token && refreshToken) {
          setRefreshToken(refreshToken);
          setToken(token);
        } else {
          push(UI_ROUTES.signUp);
        }
      } else {
        push(UI_ROUTES.signIn);
      }
    });
  }, [history, loginViaOAuth, setRefreshToken, setToken]);
};

export default useCodeToSlackAuth;
