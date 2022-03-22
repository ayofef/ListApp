import PropTypes from 'prop-types';
import React from 'react';
import { useRouteMatch, useLocation } from 'react-router-dom';
import capitalize from '@material-ui/core/utils/capitalize';
import { useTranslation } from 'react-i18next';
import { H1, P14 } from '../../../../components/atoms';
import THEME from '../../../../constants/theme';
import { StyledLink, StyledBox, SubPageBox } from './styled';
import { ArrowBack } from '../../../../assets/icons';

const DetailsHeader = ({ skipMediaQuery }) => {
  const { t } = useTranslation();
  const match = useRouteMatch('/flows/:id/details/:page');
  const subMatch = useRouteMatch('/flows/:id/details/:page/:subPage');
  const location = useLocation();
  const page = match?.params?.page;
  const subPage = subMatch?.params?.subPage;
  const pageTitle = subPage?.split('-')?.join(' ') || page;

  return (
    <StyledBox mb="46px" mt="16px" $skipMediaQuery={skipMediaQuery}>
      {subPage && (
        <SubPageBox>
          <StyledLink to={`${match?.url}${location?.search || ''}` || `/flows/details`}>
            <ArrowBack size={14} stroke={THEME.primaryColors.blue} />
            <P14 margin="0 0 0 10px">
              {t('back to')} {page}
            </P14>
          </StyledLink>
        </SubPageBox>
      )}
      <H1 fontWeight="700" capitalize>
        {capitalize(pageTitle ?? 'Overview')}
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
