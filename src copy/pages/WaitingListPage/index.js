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
  'Unfortunately, we’re not ready to support your payment needs yet, but we’re working super hard on being able to. ';

const DESC_2 = 'We’ll be in touch soon.';

const WaitingListPage = () => {
  const { t } = useTranslation();
  const [, , clearRegistrationStorage] = useRegistrationStorage();
  useHandleRegistrationFlowRedirect();

  const { push } = useHistory();

  const handleComplete = () => {
    clearRegistrationStorage();
    push(UI_ROUTES.signIn);
  };

  return (
    <PureLayout theme="dark">
      <PureLayoutBox theme="dark">
        <Box height="350px" display="flex" flexDirection="column">
          <div>
            <h1>{t('Thanks for your interest')}</h1>
            <P16 margin="20px 0 28px 0" color={THEME.greyColors.grey1}>
              {t(DESC)}
            </P16>

            <P16 margin="20px 0 0 0" color={THEME.greyColors.grey1}>
              {t(DESC_2)}
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

export default WaitingListPage;
