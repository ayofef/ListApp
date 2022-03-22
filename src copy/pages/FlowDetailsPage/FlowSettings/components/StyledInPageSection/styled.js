import styled from 'styled-components';
import { StyledBar } from '../styled';
import { BORDER_COLOR } from '../../../constant';
import THEME from '../../../../../constants/theme';

const StyledBarSections = styled(StyledBar)`
  height: unset;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  overflow: hidden;

  & > :not(:last-child) {
    border-bottom: 0.5px solid ${BORDER_COLOR} !important;
  }

  & > div,
  .connection-button {
    width: 100%;
    height: 92px;
    padding: 0 24px;
    box-sizing: border-box;
    background-color: #fff;
    outline: none;
    border: none;
  }

  & .connection-button {
    cursor: pointer;
    height: 88px !important;
    &:hover {
      background: ${THEME.primaryColors.primaryLightTransparent};
    }
  }
`;

export { StyledBarSections };
