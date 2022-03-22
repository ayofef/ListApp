import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { BORDER_COLOR } from '../../../constant';
import THEME from '../../../../../constants/theme';
import { H4, P14 } from '../../../../../components/atoms';

export const StyledButtonCard = styled.div`
  border: 1px solid ${BORDER_COLOR};
  box-sizing: border-box;
  border-radius: 8px;
  height: 270px;
  display: flex;
  flex-direction: column;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  background-color: #fff;
  text-align: left;
  outline: none;
  width: 100%;
  transition: all 0.3s ease-out;
`;

export const StyledCardHeaderBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  overflow: hidden;
  min-height: 44px;
`;

export const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  background-color: ${({ bgColor }) => bgColor || THEME.secondaryColors.inputBg};
  border-radius: 4px;
  padding: 5px 8px;
  width: max-content;
  margin: 0 4px 16px 0;
`;

export const StyledStarBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${THEME.primaryColors.primaryLight};
  border-radius: 6px;
  width: 32px;
  height: 32px;
  margin-left: 4px;
`;

export const StyledDescription = styled(P14)`
  color: ${THEME.greyColors.grey1};

  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const TemplateTitle = styled(H4)`
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 12px;
`;
