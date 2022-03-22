import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import QRCode from 'qrcode.react';
import isEmpty from 'lodash/isEmpty';
import { func } from 'prop-types';
import { useTranslation } from 'react-i18next';

import { ADD_AUTHENTIFICATOR, VERIFY_AUTHENTIFICATOR } from '../../../utils/queries/public/publicMutations';
import THEME from '../../../constants/theme';
import OtpBlock from '../../common/OtpBlock';
import { QRCover } from './styled';
import { useGlobalContext } from '../../../containers/App/context';
import { STORAGE_KEYS } from '../../../constants/storage';
import { localStorageService } from '../../../utils/localStorageService';
import { P16 } from '../../atoms';
import LoadingState from './LoadingState';
import { FlexContainer } from '../../atoms/flex/FlexContainer';

const DESC = 'Scan this QR Code with your Google Authentication App and enter the verification code below.';

const AppAuth = ({ setSetupSuccess }) => {
  const [pass, setPass] = useState('');
  const [authData, setAuthData] = useState({});
  const { t } = useTranslation();
  const [addAuth, { loading: addingLoading }] = useMutation(ADD_AUTHENTIFICATOR);
  const [verifyAuth, { loading: submitLoading }] = useMutation(VERIFY_AUTHENTIFICATOR);
  const { setToken, setRefreshToken } = useGlobalContext();

  useEffect(() => {
    addAuth({
      variables: {
        mfaType: 'otp',
      },
    }).then((res) => {
      if (res && res.data?.addAuthenticator && isEmpty(res.errors)) {
        setToken(res.data.addAuthenticator.token);
        setRefreshToken(res.data.addAuthenticator.refreshToken);
        setAuthData(res.data.addAuthenticator);
        if (res.data.addAuthenticator?.recoveryCodes) {
          localStorageService.setItem(STORAGE_KEYS.recoveryPass, res.data.addAuthenticator.recoveryCodes[0]);
        }
        if (res.data.addAuthenticator?.barcodeUri) {
          localStorageService.setItem(STORAGE_KEYS.barcodeUri, res.data.addAuthenticator.barcodeUri);
        }
      }
    });
  }, [addAuth, setAuthData, setRefreshToken, setToken]);

  const submitCode = () => {
    verifyAuth({
      variables: {
        bindingCode: pass,
      },
    }).then((res) => {
      if (res && res.data?.verifyAuthenticator && isEmpty(res.errors)) {
        setToken(res.data.verifyAuthenticator?.token);
        setRefreshToken(res.data.verifyAuthenticator.refreshToken);
        setSetupSuccess(true);
      }
    });
  };
  return (
    <FlexContainer>
      <div>
        <P16 color={THEME.greyColors.grey1} margin="13px 0 26px 0">
          {t(DESC)}
        </P16>

        <QRCover>
          {addingLoading && <LoadingState />}
          {!addingLoading && authData?.barcodeUri && <QRCode width={100} height={100} value={authData?.barcodeUri} />}
        </QRCover>
        <P16 margin="30px 0 16px" color={THEME.greyColors.grey1}>
          {t('Verification Code')}
        </P16>
        <OtpBlock
          pass={pass}
          setPass={setPass}
          numInputs={6}
          loading={submitLoading}
          submitFunc={submitCode}
          resetButtonPosition={null}
          submitWrapperProps={{ mt: '24px' }}
        />
      </div>
    </FlexContainer>
  );
};

AppAuth.propTypes = {
  setSetupSuccess: func.isRequired,
};

export default AppAuth;
