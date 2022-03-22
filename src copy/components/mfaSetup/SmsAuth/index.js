import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import 'react-phone-input-2/lib/material.css';
import isEmpty from 'lodash/isEmpty';
import { func } from 'prop-types';
import { NotificationManager } from 'react-notifications';
import { useTranslation } from 'react-i18next';
import SetPhone from './SetPhone';
import { VERIFY_AUTHENTIFICATOR, ADD_AUTHENTIFICATOR } from '../../../utils/queries/public/publicMutations';
import { useGlobalContext } from '../../../containers/App/context';
import { STORAGE_KEYS } from '../../../constants/storage';
import { localStorageService } from '../../../utils/localStorageService';
import { ERROR_CODES } from '../../../constants/api';
import { FlexContainer } from '../../atoms/flex/FlexContainer';

const SmsAuth = ({ setSetupSuccess }) => {
  const [phone, setPhone] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState('');
  const [addAuth, { loading: addingLoading }] = useMutation(ADD_AUTHENTIFICATOR);
  const [verifyAuth, { loading: submitLoading }] = useMutation(VERIFY_AUTHENTIFICATOR);
  const { setToken, setRefreshToken, getMeRefetch } = useGlobalContext();
  const { t } = useTranslation();

  const loading = addingLoading || submitLoading;

  const handleError = useCallback(
    (res) => {
      const error = res?.errors[0]?.message;
      const errorCode = res?.errors[0]?.extensions?.code;
      const knownErrors = Object.values(ERROR_CODES);
      if (!knownErrors.includes(errorCode)) {
        NotificationManager.error(t(error), t('2 Factor Authentication'), 5000);
      }
    },
    [t]
  );

  const handleCodeRequest = useCallback(() => {
    const phoneNumber = phone.startsWith('+') ? phone : `+${phone}`;
    addAuth({
      variables: {
        phoneNumber: phoneNumber,
        oobChannel: 'sms',
        mfaType: 'oob',
      },
    }).then((res) => {
      if (res && res.data?.addAuthenticator && isEmpty(res.errors)) {
        setCodeSent(true);
        setToken(res.data.addAuthenticator.token);
        setRefreshToken(res.data.addAuthenticator.refreshToken);
        if (res.data.addAuthenticator?.recoveryCodes) {
          localStorageService.setItem(STORAGE_KEYS.recoveryPass, res.data.addAuthenticator.recoveryCodes);
        }
        getMeRefetch();
        return;
      }

      if (res && !isEmpty(res.errors)) {
        handleError(res);
      }
    });
  }, [getMeRefetch, addAuth, handleError, phone, setRefreshToken, setToken]);

  const submitCode = useCallback(() => {
    verifyAuth({
      variables: {
        bindingCode: code,
      },
    }).then((res) => {
      if (res && res.data?.verifyAuthenticator && isEmpty(res.errors)) {
        setToken(res.data.verifyAuthenticator.token);
        setRefreshToken(res.data.verifyAuthenticator.refreshToken);
        setSetupSuccess(true);
        return;
      }

      if (res && !isEmpty(res.errors)) {
        handleError(res);
      }
    });
  }, [handleError, setRefreshToken, setSetupSuccess, code, setToken, verifyAuth]);

  return (
    <FlexContainer flexDirection="column" alignItems="flex-start">
      <SetPhone
        handleCodeSent={handleCodeRequest}
        phone={phone}
        setPhone={setPhone}
        loading={loading}
        codeSent={codeSent}
        code={code}
        setCode={setCode}
        submitCode={submitCode}
      />
    </FlexContainer>
  );
};

SmsAuth.propTypes = {
  setSetupSuccess: func.isRequired,
};

export default SmsAuth;
