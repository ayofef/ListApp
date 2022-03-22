import React from 'react';
import { useTranslation } from 'react-i18next';
import PureLayout from '../../components/layouts/PureLayout';
import PureLayoutBox from '../../components/layouts/PureLayoutBox';
import THEME from '../../constants/theme';

import OtpBlock from '../../components/common/OtpBlock';
import { P16 } from '../../components/atoms';
import { useEmailConfirmation } from './hooks';

const EmailConfimation = () => {
  const { t } = useTranslation();

  const { loading, otp, continueHandler, resendEmailHandler } = useEmailConfirmation({ t });

  return (
    <PureLayout theme="dark">
      <PureLayoutBox theme="dark">
        <h1>Enter confirmation code</h1>
        <P16 margin="0 0 40px 0" color={THEME.greyColors.grey1}>
          Enter the 4 digits we&apos;ve just sent to the email address you provided
        </P16>

        <OtpBlock
          mt
          pass={otp.pass}
          setPass={otp.setPass}
          numInputs={4}
          loading={loading}
          submitFunc={continueHandler}
          resendFunc={resendEmailHandler}
          resetButtonPosition="bottom"
        />
      </PureLayoutBox>
    </PureLayout>
  );
};

export default EmailConfimation;
