import styled from 'styled-components';
import IconButtonBase from '@material-ui/core/IconButton';
import Tab from '@material-ui/core/Tab';
import THEME from '../../../constants/theme';

const StyledHeader = styled.div`
  padding: 12.5px 24px 0;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0px;
    height: 1px;
    width: 100%;
    background-color: #e6e9ec;
  }
`;

const StyledTab = styled(Tab)`
  &.MuiTab-root {
    margin-bottom: 22px;
  }
`;

const StyledIconButton = styled(IconButtonBase)`
  &.MuiButtonBase-root {
    border-radius: 8px;
    padding: 8px;
    color: ${THEME.primaryColors.blackPlain};
    transition: all 0.3s ease-out;
    position: absolute;
    top: 19px;
    right: 38px;

    &:hover: {
      background-color: ${THEME.greyColors.grey5};
    }

    & .MuiSvgIcon-root {
      fill: ${THEME.greyColors.grey17};
    }
  }
`;

export { StyledHeader, StyledTab, StyledIconButton };
