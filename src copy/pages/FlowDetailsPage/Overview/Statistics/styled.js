import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import THEME from '../../../../constants/theme';
import { L10BU } from '../../../../components/atoms/Typography/L10BU';
import { L16B } from '../../../../components/atoms/Typography/L16B';
import Button from '../../../../components/atoms/Buttons/Button';

const StyledInsightsChartRow = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  &:hover {
    background: ${THEME.greyColors.grey12Transparent};
  }
`;

const StyledInsightsButton = styled.button`
  background-color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  color: ${THEME.primaryColors.primary};
  &:hover {
    color: ${THEME.secondaryColors.secondary};
  }
`;

const StyledStatWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid ${THEME.greyColors.grey5};
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);

  & > * {
    padding: 24px;
    border-bottom: 1px solid ${THEME.greyColors.grey5};
    box-sizing: border-box;
    &:last-child {
      border-bottom: none;
    }
  }
`;

const InsightLabel = styled(L10BU)`
  margin-top: 0;
  margin-bottom: 8px;
`;

const InsightValue = styled(L16B)`
  line-height: 16px;
`;

const NewButton = styled(Button)`
  color: ${THEME.primaryColors.primary};
  font-weight: 600;
  border-radius: 6px;
  height: ${({ $height }) => $height};
  min-height: ${({ $height }) => $height};
  background: ${({ $background }) => $background};
`;

export { StyledStatWrapper, InsightLabel, InsightValue, NewButton, StyledInsightsChartRow, StyledInsightsButton };
