import React, { useMemo, useState } from 'react';
import Box from '@material-ui/core/Box';
import PureLayout from '../../components/layouts/PureLayout';
import PureLayoutBox from '../../components/layouts/PureLayoutBox';
import SmsAuth from '../../components/mfaSetup/SmsAuth';
import AppAuth from '../../components/mfaSetup/AppAuth/AppAuth';
import RecoverySave from '../../components/mfaSetup/RecoverySave';
import Tabs from '../../components/common/Tabs';

const TITLE_MAP = {
  default: '2-Factor Authentication',
  success: '2-factor authentication completed',
};

const MFASetup = () => {
  const [setupSuccess, setSetupSuccess] = useState(false);

  const tabs = useMemo(
    () => [
      { label: 'SMS', node: <SmsAuth setSetupSuccess={setSetupSuccess} /> },
      { label: 'Mobile App', node: <AppAuth setSetupSuccess={setSetupSuccess} /> },
    ],
    []
  );

  return (
    <PureLayout theme="dark">
      <PureLayoutBox theme="dark">
        <Box mb="32px">
          <h1>{setupSuccess ? TITLE_MAP.success : TITLE_MAP.default}</h1>
        </Box>
        {setupSuccess ? <RecoverySave /> : <Tabs tabs={tabs} />}
      </PureLayoutBox>
    </PureLayout>
  );
};

export default MFASetup;
