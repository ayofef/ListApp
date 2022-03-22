import styled from 'styled-components';
import THEME from '../../constants/theme';
import { BORDER_COLOR } from '../FlowDetailsPage/constant';

const StyledPageWrapper = styled.div`
  position: relative;
  top: 2px;
  padding: 56px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledStepsWrapper = styled.div`
  position: relative;
  width: 100%;
  background: ${THEME.primaryColors.white};
  border: 1px solid ${BORDER_COLOR};
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 40px;
`;

const MarkAllCompleted = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${THEME.greyColors.grey1};

  &:hover {
    color: ${THEME.primaryColors.blue};
  }

  svg path {
    stroke: currentColor;
  }
  .text {
    margin-left: 8px;
    color: inherit;
    text-decoration: none;

    &:hover {
      color: inherit;
    }
  }
`;

const AvatarIcon = styled.div`
  position: relative;
  margin-right: 16px;

  img {
    display: block;
    width: 48px;
    height: 48px;
  }
`;

const StyledLine = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  box-sizing: border-box;
  border-bottom: 1px solid ${BORDER_COLOR};

  &:last-child {
    border-bottom: none;
  }
`;

export { StyledPageWrapper, StyledStepsWrapper, MarkAllCompleted, StyledLine, AvatarIcon };
