import styled from 'styled-components';
import { P12B } from '../../atoms/Typography/P12B';
import THEME from '../../../constants/theme';

const StyledP12 = styled(P12B)`
  margin-top: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e6e9ec;
`;

const StyledLogItemIndicator = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #c1c3c6;
  transform: translateY(8px);
  flex-grow: 0;
  flex-shrink: 0;
`;

const StyledLogItemText = styled.div`
  margin-left: 16px;
`;

const StyledLogItemWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  &:last-child {
    ${StyledLogItemIndicator} {
      background-color: ${THEME.primaryColors.primary};
    }
  }

  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

export { StyledLogItemWrapper, StyledLogItemText, StyledLogItemIndicator, StyledP12 };
