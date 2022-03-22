import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import PureLayout from '../../components/layouts/PureLayout';
import PureLayoutBox from '../../components/layouts/PureLayoutBox';
import { P16 } from '../../components/atoms';
import THEME from '../../constants/theme';
import BetaLinkIcon from '../../assets/icons/BetaLinkIcon';
import SubmitButton from '../../components/forms/_common/SubmitButton';
import { useGlobalContext } from '../../containers/App/context';

const TITLE = 'This link has expired';
const DESC = 'The access link you provided has expired. Contact support to be granted access to the platform. ';

const ExpiredBetaLink = memo(() => {
  const { t } = useTranslation();
  const { toggleIntercom } = useGlobalContext();
  //TODO: Block route based on a search_param

  return (
    <PureLayout>
      <PureLayoutBox>
        <Box minHeight="500px" display="flex" flexDirection="column">
          <Box mb="48px">
            <BetaLinkIcon />
          </Box>
          <h1>{t(TITLE)}</h1>
          <P16 margin="16px 0 40px" color={THEME.greyColors.grey9}>
            {t(DESC)}
          </P16>

          <Box mt="auto">
            <SubmitButton showIcon={false} onClick={toggleIntercom}>
              {t('Contact Support')}
            </SubmitButton>
          </Box>
        </Box>
      </PureLayoutBox>
    </PureLayout>
  );
});

export default ExpiredBetaLink;
