import styled from 'styled-components';
import { StyledBar } from '../../FlowSettings/components/styled';
import { BORDER_COLOR } from '../../constant';
import THEME from '../../../../constants/theme';

const StyledBarSections = styled(StyledBar)`
  height: unset;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  overflow: hidden;

  & > :not(:last-child) {
    border-bottom: 0.5px solid ${BORDER_COLOR} !important;
  }

  & .connection-button {
    width: 100%;
    height: 88px;
    padding: 0 24px;
    box-sizing: border-box;
    background-color: #fff;
    outline: none;
    border: none;
    &:hover {
      background-color: ${THEME.greyColors.grey12Transparent};
    }
    &-cta {
      &:hover {
        background-color: ${THEME.primaryColors.primaryLightTransparent};
      }
    }
  }

  & .connection-button {
    cursor: pointer;
  }
`;

export { StyledBarSections };
