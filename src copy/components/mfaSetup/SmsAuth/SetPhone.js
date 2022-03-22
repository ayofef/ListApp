import React, { useCallback, useEffect, useState } from 'react';
import startsWith from 'lodash/startsWith';
import PhoneInput from 'react-phone-input-2';
import { func, bool, string } from 'prop-types';
import 'react-phone-input-2/lib/material.css';
import { useTranslation } from 'react-i18next';
import { P16, P12, L12 } from '../../atoms';
import THEME from '../../../constants/theme';
import OtpBlock from '../../common/OtpBlock';
import { OtpBlockCover, StyledPhoneInputWrapper } from './styled';
import SubmitButton from '../../forms/_common/SubmitButton';

const ERROR_MESSAGE_MAP = {
  short: 'Phone number is too short',
  long: 'Phone number is too long',
};

//for wrong countries
const COUNTRY_MAP = {
  Algeria: 8,
};

/* TODO: rework this component */
const SetPhone = ({ setPhone, phone, handleCodeSent, loading, codeSent, code, setCode, submitCode }) => {
  const [phoneIsChecking, setPhoneIsChecking] = useState(false);
  const [phoneIsValid, setPhoneIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { t } = useTranslation();

  const handleValidate = useCallback(
    (inputNumber, country, countries) => {
      if (phoneIsChecking) {
        const numberLength = (country?.format?.split('.') || []).length - 1;
        const minLength = COUNTRY_MAP[country?.name] ?? Math.floor((numberLength / 3) * 2);

        const short = phone?.length < minLength && 'short';
        const long = phone?.length > numberLength && 'long';

        const isValid =
          countries.some(() => {
            return startsWith(inputNumber, country?.dialCode) || startsWith(country?.dialCode, inputNumber);
          }) &&
          country &&
          (phone?.length >= minLength || numberLength === phone?.length);

        setErrorMessage(ERROR_MESSAGE_MAP[short] ?? ERROR_MESSAGE_MAP[long]);
        setPhoneIsValid(isValid);
        return isValid;
      }
      return true;
    },
    [phoneIsChecking, phone]
  );

  const handleSubmit = () => {
    setPhoneIsChecking(true);
  };

  const handlePhoneChange = (val) => {
    setPhoneIsChecking(false);
    setPhone(val);
  };

  useEffect(() => {
    if (phoneIsChecking && phoneIsValid) {
      handleCodeSent();
      setPhoneIsChecking(false);
    }
  }, [phoneIsValid, phoneIsChecking, handleCodeSent]);

  return (
    <>
      {!codeSent && (
        <>
          <P16 color={THEME.greyColors.grey1} margin="8px 0 24px 0">
            {t("Enter your phone number below. We'll send you an SMS with a code to enter on the next screen.")}
          </P16>
          <P12 fontWeight="600" margin="0 0 8px">
            {t('Phone')}
          </P12>
          <StyledPhoneInputWrapper>
            <PhoneInput
              country="us"
              isValid={handleValidate}
              placeholder={t('Enter phone number')}
              value={phone}
              onChange={handlePhoneChange}
              disabled={codeSent}
            />
            {errorMessage && (
              <L12 margin="10px 0 0 0" fontWeight="500" color="#DF5B5B">
                {t(errorMessage)}
              </L12>
            )}
          </StyledPhoneInputWrapper>
        </>
      )}
      {codeSent && (
        <>
          <P16 color={THEME.greyColors.grey1} margin="8px 0 0 0">
            {t('Enter the code received via SMS')}
          </P16>
          <OtpBlockCover>
            <OtpBlock
              pass={code}
              setPass={setCode}
              numInputs={6}
              loading={loading}
              submitFunc={submitCode}
              resendFunc={handleCodeSent}
              submitWrapperProps={{ mt: '24px' }}
            />
          </OtpBlockCover>
        </>
      )}

      {!codeSent && (
        <SubmitButton isLoading={loading} className="gradient" onClick={handleSubmit} margin="46px 0 0 0">
          {t('Continue')}
        </SubmitButton>
      )}
    </>
  );
};

SetPhone.propTypes = {
  setPhone: func.isRequired,
  setCode: func.isRequired,
  submitCode: func.isRequired,
  phone: string.isRequired,
  code: string.isRequired,
  handleCodeSent: func.isRequired,
  loading: bool.isRequired,
  codeSent: bool.isRequired,
};

export default SetPhone;
