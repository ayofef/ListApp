import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { P16, BlockWrap } from '../../components/atoms';
import THEME from '../../constants/theme';
import SubmitButton from '../../components/forms/_common/SubmitButton';

const DESC =
  'We’re currently in private BETA, and we are evaluating all registrations before we provide them access to the platform.';
const DESC_2 = 'If you’ve been given an access code, please press continue.';

const BetaCode = ({ toggleShowBeta }) => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>Thank you for registering.</h1>
      <P16 margin="20px 0 28px 0" color={THEME.greyColors.grey1}>
        {t(DESC)}
      </P16>
      <P16 color={THEME.greyColors.grey1}>{t(DESC_2)}</P16>

      <BlockWrap margin="40px 0 0 0">
        <SubmitButton className="gradient" onClick={toggleShowBeta} margin="32px 0 0 0">
          {t('common.continueText')}
        </SubmitButton>
      </BlockWrap>
    </div>
  );
};

BetaCode.propTypes = {
  toggleShowBeta: PropTypes.func.isRequired,
};

export default BetaCode;
