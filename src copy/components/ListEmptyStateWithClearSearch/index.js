import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import withStyles from '@material-ui/core/styles/withStyles';
import { useTranslation } from 'react-i18next';
import ListIconNew from '../../assets/icons/EmptyStates/ListIconNew';
import { P16B, P14 } from '../atoms';
import THEME from '../../constants/theme';

const StyledBox = withStyles({
  root: {
    transform: 'translate(-50%, -50%)',
  },
})(Box);

const StyledIconBox = styled.div`
  ${({ $transform }) => $transform && `transform: ${$transform}`};
  ${({ $margin }) => $margin && `margin: ${$margin}`};
`;

const ListEmptyStateWithClearSearch = ({
  title,
  clearText,
  position,
  top,
  left,
  setSearchParams,
  searchSelectRef,
  showClearButton,
  children,
  iconComponent,
  iconWrapperProps,
}) => {
  const { t } = useTranslation();

  const Icon = (typeof iconComponent === 'function' && iconComponent) || ListIconNew;

  const resetSearch = () => {
    setSearchParams('');
    searchSelectRef?.current?.select?.clearValue();
  };

  return (
    <StyledBox position={position} top={top} left={left} textAlign="center">
      <StyledIconBox {...iconWrapperProps}>
        <Icon />
      </StyledIconBox>
      <Box mt="10px">
        <P16B margin="0 0 5px 0" width="160px">
          {t(title)}
        </P16B>
        {showClearButton && (
          <P14 color={THEME.primaryColors.primary} cursor="pointer" onClick={resetSearch}>
            {t(clearText)}
          </P14>
        )}
      </Box>
      {!showClearButton && children}
    </StyledBox>
  );
};

ListEmptyStateWithClearSearch.propTypes = {
  clearText: PropTypes.string.isRequired,
  left: PropTypes.string,
  position: PropTypes.string,
  searchSelectRef: PropTypes.shape({
    current: PropTypes.shape({
      select: PropTypes.shape({
        clearValue: PropTypes.func,
      }),
    }),
  }),
  setSearchParams: PropTypes.func.isRequired,
  showClearButton: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  top: PropTypes.string,
  iconComponent: PropTypes.elementType,
  iconWrapperProps: PropTypes.shape({}),
};
ListEmptyStateWithClearSearch.defaultProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  searchSelectRef: {},
  iconComponent: undefined,
  iconWrapperProps: {},
};
export default ListEmptyStateWithClearSearch;
