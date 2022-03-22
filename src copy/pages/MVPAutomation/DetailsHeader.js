import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { UI_ROUTES } from '../../constants/routes';
import { SubPageBox, StyledBox, StyledLink } from '../FlowDetailsPage/Components/DetailsHeader/styled';
import { ArrowBack } from '../../assets/icons';
import { H1, P14 } from '../../components/atoms';
import THEME from '../../constants/theme';

const DetailsHeader = ({ skipMediaQuery }) => {
  const { t } = useTranslation();

  return (
    <StyledBox mb="46px" mt="16px" $skipMediaQuery={skipMediaQuery}>
      <SubPageBox>
        <StyledLink to={UI_ROUTES.automations}>
          <ArrowBack size={14} stroke={THEME.primaryColors.blue} />
          <P14 margin="0 0 0 10px">{t('back to overview')}</P14>
        </StyledLink>
      </SubPageBox>
      <H1 fontWeight="700" capitalize>
        {t('Payment Processors')}
      </H1>
    </StyledBox>
  );
};

DetailsHeader.propTypes = {
  skipMediaQuery: PropTypes.bool,
};
DetailsHeader.defaultProps = {
  skipMediaQuery: false,
};
export default DetailsHeader;
