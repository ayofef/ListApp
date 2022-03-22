import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import qs from 'qs';
import { NotificationManager } from 'react-notifications';
import { useLocation } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import { useGlobalContext } from '../../containers/App/context';
import { CONFIRM_EMAIL, RESEND_EMAIL_CONFIRM } from '../../utils/queries/public/publicMutations';
import { localStorageService } from '../../utils/localStorageService';
import { STORAGE_KEYS } from '../../constants/storage';

export const useEmailConfirmation = ({ t }) => {
  const [loading, setLoading] = useState(false);
  const [pass, setPass] = useState('');
  const email = localStorageService.getItem(STORAGE_KEYS.email);
  const token = localStorageService.getItem(STORAGE_KEYS.token);

  const { getMeStartPolling, getMeStopPolling, getMeRefetch } = useGlobalContext();
  const { search } = useLocation();

  const [resendEmail] = useMutation(RESEND_EMAIL_CONFIRM);
  const [confirmEmail, { data }] = useMutation(CONFIRM_EMAIL);

  const isConfirmed = data?.confirmEmail;

  useEffect(() => {
    if (isConfirmed) {
      getMeStopPolling();
    } else if (!isConfirmed && token) {
      getMeStartPolling(5000);
    }
  }, [isConfirmed, getMeStopPolling, getMeStartPolling, token]);

  useEffect(() => {
    const params = qs.parse(search, { ignoreQueryPrefix: true });
    if (params.token && params.email) {
      setLoading(true);
      confirmEmail({ variables: { ...params } })
        .then((res) => {
          if (res && isEmpty(res.errors)) {
            getMeStopPolling();
            getMeRefetch();
          }
        })
        .finally(() => setLoading(false));
    }
  }, [search, confirmEmail, token, getMeStopPolling, t, getMeRefetch]);

  const continueHandler = () => {
    setLoading(true);

    confirmEmail({ variables: { email, code: pass } })
      .then((res) => {
        if (!res?.data?.confirmEmail) {
          NotificationManager.error(t('Incorrect confirmation code'), 'Oops..', 5000);
          return;
        }
        getMeStopPolling();
        getMeRefetch();
      })
      .finally(() => setLoading(false));
  };

  const resendEmailHandler = () => {
    resendEmail({ variables: { email } }).then((res, rej) => {
      if (res) {
        NotificationManager.success(t('Confirmation code resent'));
      }
      if (rej) {
        NotificationManager.error(t('uiMessages.error'));
      }
    });
  };

  return {
    loading,
    continueHandler,
    resendEmailHandler,
    otp: {
      setPass,
      pass,
    },
  };
};
