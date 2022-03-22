import React from 'react';
import Box from '@material-ui/core/Box';
import { number, string, elementType } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { L14M } from '../../../../components/atoms';
import Circle from './Circle';
import { ArrowWrapper, StageRow, StyledL14M } from './styled';
import THEME from '../../../../constants/theme';
import { ArrowRight } from '../../../../assets/icons';

const CardStage = ({ title, value, link, color, Icon, linkText }) => {
  const { t } = useTranslation();
  return (
    <Link to={link}>
      <StageRow display="flex" justifyContent="space-between">
        <Box display="flex" flex={1} alignItems="center">
          <Box display="flex" alignItems="center">
            <Circle Icon={Icon} backgroundColor={color} zIndex={1} />
            <Circle value={value} margin="0 16px 0 -8px" />
          </Box>
          <L14M>{t(title)}</L14M>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <StyledL14M color={THEME.primaryColors.primary}>{linkText}</StyledL14M>
          <ArrowWrapper>
            <ArrowRight />
          </ArrowWrapper>
        </Box>
      </StageRow>
    </Link>
  );
};

CardStage.propTypes = {
  title: string.isRequired,
  link: string.isRequired,
  Icon: elementType.isRequired,
  color: string.isRequired,
  linkText: string.isRequired,
  value: number,
};

CardStage.defaultProps = {
  value: 0,
};

export default CardStage;
