import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { parseCategoryLabel } from '../constant';
import { StyledBox } from './styled';
import THEME from '../../../../../constants/theme';
import { L10UM } from '../../../../../components/atoms/Typography/L10UM';

const AutomationItem = ({ category, color, bgColor }) => {
  const { t } = useTranslation();

  return (
    <StyledBox $bgColor={bgColor}>
      <L10UM color={color} letterSpacing="0.08em" noWrap>
        {t(parseCategoryLabel(category)?.toUpperCase())}
      </L10UM>
    </StyledBox>
  );
};

AutomationItem.propTypes = {
  category: PropTypes.string.isRequired,
  color: PropTypes.string,
  bgColor: PropTypes.string,
};

AutomationItem.defaultProps = {
  color: THEME.secondaryColors.black2,
  bgColor: THEME.secondaryColors.black2,
};

export default AutomationItem;
