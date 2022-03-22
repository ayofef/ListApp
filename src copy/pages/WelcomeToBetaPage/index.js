import React from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import PureLayoutBox from '../../components/layouts/PureLayoutBox';
import PureLayout from '../../components/layouts/PureLayout';

import { P16 } from '../../components/atoms';
import THEME from '../../constants/theme';
import SubmitButton from '../../components/forms/_common/SubmitButton';
import { UI_ROUTES } from '../../constants/routes';
import { useHandleRegistrationFlowRedirect, useRegistrationStorage } from '../../hooks/registration';

const DESC =
  'Keep an eye on your email for an access link and an Automator to provide you with a demo of the platform.';

const WelcomeToBetaPage = () => {
  const { t } = useTranslation();
  const { push } = useHistory();
  const [, , clearRegistrationStorage] = useRegistrationStorage();

  useHandleRegistrationFlowRedirect();

  const handleComplete = () => {
    clearRegistrationStorage();
    push(UI_ROUTES.signIn);
  };

  return (
    <PureLayout theme="dark">
      <PureLayoutBox theme="dark">
        <Box height="350px" display="flex" flexDirection="column">
          <div>
            <h1>{t('Welcome to WhenThen')}</h1>
            <P16 margin="20px 0 28px 0" color={THEME.greyColors.grey1}>
              {t(DESC)}
            </P16>
          </div>

          <Box mt="auto">
            <SubmitButton className="gradient" onClick={handleComplete} margin="32px 0 0 0" showIcon={false}>
              {t('Done')}
            </SubmitButton>
          </Box>
        </Box>
      </PureLayoutBox>
    </PureLayout>
  );
};

export default WelcomeToBetaPage;
