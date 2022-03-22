import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';

import THEME from '../../../../constants/theme';
import { P14, P16B, P12 } from '../../../../components/atoms';
import UpgradeAction from './UpgradeAction';

const TITLE = 'Upgrade your account';
const DESC =
  'To access this Premium automation template you need to be on a Rise Plan or higher. Upgrade to access this Automation.';

const UpgradeAccountContent = ({ toggleUpgradeModal, toggleIsOpen }) => {
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
      <Box mt="24px" mb="4px">
        <UpgradeAction toggleUpgradeModal={toggleUpgradeModal} toggleIsOpen={toggleIsOpen} />
      </Box>
    </>
  );
};

UpgradeAccountContent.propTypes = {
  toggleUpgradeModal: PropTypes.func.isRequired,
  toggleIsOpen: PropTypes.func.isRequired,
};

export default UpgradeAccountContent;
