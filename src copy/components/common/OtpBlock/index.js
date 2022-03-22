import React from 'react';
import styled from 'styled-components';
import OtpInput from 'react-otp-input';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { func, string, bool, number, shape } from 'prop-types';
import ResetButton from './ResetButton';
import SubmitButton from '../../forms/_common/SubmitButton';
import { L12 } from '../../atoms';
import THEME from '../../../constants/theme';
import { OtpFields, OtpFields6, OtpFields4 } from './styled';

const Error = styled(L12)`
  margin-top: 10px;
  margin-bottom: 3px;

  & + & {
    margin-top: 0;
  }
`;

const ErrorMessageEmptyInput = 'Invalid verification code, please check your input.';
const OtpBlock = ({
  submitFunc,
  resendFunc,
  pass,
  setPass,
  loading,
  numInputs,
  resetButtonText,
  resetButtonPosition,
  isPassEmpty,
  preventDisabledButton,
  submitWrapperProps,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {numInputs === 6 && (
        <OtpFields6>
          <OtpInput value={pass} onChange={setPass} numInputs={numInputs} isInputNum />
        </OtpFields6>
      )}
      {numInputs !== 6 && numInputs === 4 && (
        <OtpFields4>
          <OtpInput value={pass} onChange={setPass} numInputs={numInputs} isInputNum />
        </OtpFields4>
      )}
      {numInputs !== 6 && numInputs !== 4 && (
        <OtpFields>
          <OtpInput value={pass} onChange={setPass} numInputs={numInputs} isInputNum />
        </OtpFields>
      )}
      {resetButtonPosition === 'top' && <ResetButton resendFunc={resendFunc} resetButtonText={resetButtonText} />}

      {!loading && isPassEmpty ? (
        <Error data-cy="error" color={THEME.secondaryColors.danger}>
          {t(ErrorMessageEmptyInput)}
        </Error>
      ) : (
        ''
      )}

      <Box mt="40px" {...submitWrapperProps}>
        <SubmitButton
          className="gradient"
          {...(!preventDisabledButton && { disabled: pass.length < numInputs })}
          onClick={submitFunc}
          margin="32px 0 0 0"
          likeDisabled={loading}
          isLoading={loading}
        >
          {t('common.continueText')}
        </SubmitButton>
      </Box>
      {resetButtonPosition === 'bottom' && (
        <ResetButton
          resendFunc={resendFunc}
          resetButtonPosition={resetButtonPosition}
          resetButtonText={resetButtonText}
        />
      )}
    </>
  );
};

OtpBlock.propTypes = {
  submitFunc: func.isRequired,
  resendFunc: func,
  pass: string.isRequired,
  setPass: func.isRequired,
  loading: bool.isRequired,
  numInputs: number.isRequired,
  resetButtonPosition: string,
  resetButtonText: string,
  preventDisabledButton: bool,
  isPassEmpty: bool,
  submitWrapperProps: shape({}),
};

OtpBlock.defaultProps = {
  resetButtonPosition: 'top',
  resendFunc: () => null,
  resetButtonText: 'Resend code',
  preventDisabledButton: false,
  isPassEmpty: false,
  submitWrapperProps: {},
};

export default OtpBlock;
