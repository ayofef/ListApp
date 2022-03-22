import styled from 'styled-components';
import { withStyles, Badge } from '@material-ui/core';

import { ButtonRounded } from '../../../components/atoms';
import THEME from '../../../constants/theme';
import { FlexContainer } from '../../../components/atoms/flex/FlexContainer';

export const StyledBadge = withStyles({
  root: {
    margin: '1px 8px 0 10px',
  },
  badge: {
    padding: '3px',
    backgroundColor: '#4E40EF',
    color: '#fff',
  },
})(Badge);

export const CustomStyledButton = withStyles({
  containedPrimary: {
    color: '#4E40EF !important',
    boxShadow: 'none',
    '& svg': {
      '& rect': {
        fill: '#3023C8',
      },
      '& path': {
        stroke: '#3023C8',
      },
    },
    backgroundColor: '#F5F2FF !important',
    '&:hover': {
      backgroundColor: 'rgba(156, 160, 255, .3) !important',
    },
  },
})(ButtonRounded);

export const SearchPeopleWrap = styled(FlexContainer)`
  align-items: flex-start;
  position: absolute;
  width: 100%;
  top: 0;
  z-index: 100000;
  box-sizing: border-box;
  .search {
    &__body {
      width: 100%;
    }
    &__info {
      width: 100%;
      max-width: 50%;
    }
  }
  fieldset {
    border-color: transparent !important;
  }
  input {
    background-color: rgba(230, 233, 236, 0.57);
    outline-color: transparent !important;
    border: none !important;
    border-radius: 8px;
  }
`;
export const ListPopoverItem = styled.div`
  cursor: pointer;
  border-bottom: 1px solid #e6e9ec;
  padding: 8px 4px;

  &:hover {
    background-color: ${THEME.greyColors.grey12};
  }
`;
