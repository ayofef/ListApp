import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';

import THEME from '../../../../constants/theme';
import { P14, P16B, P12 } from '../../../../components/atoms';
import StepActions from './StepActions';

const TITLE = 'Complete these steps';
const DESC = 'In order to access this automation, you need to complete these steps under settings.';

const CompleteStepsContent = () => {
  const { t } = useTranslation();

  return (
    <>
      <Box>
        <P12 color={THEME.greyColors.grey1} fontWeight="600" margin="0 0 6px 0">
          {t('Unlock guide')}
        </P12>
        <P16B margin="0 0 6px 0">{t(TITLE)}</P16B>
        <P14 width="488px" color={THEME.greyColors.grey1}>
          {t(DESC)}
        </P14>
      </Box>
      <Box mt="32px" mb="4px" minHeight="180px">
        <StepActions />
      </Box>
    </>
  );
};

export default CompleteStepsContent;
