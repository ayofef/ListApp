import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import THEME from '../../../../constants/theme';
import { L14M } from '../../../../components/atoms';
// import THEME from '../../../../constants/theme';

export const CircleWrapper = styled(Box)`
  display: flex;
  position: relative;
  z-index: ${(props) => props.zIndex};
  border: 2px solid white;
  align-items: center;
  justify-content: center;
  margin: ${(props) => props.margin};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) => props.background};
`;

export const ConfigurationWrapper = styled(Box)`
  border: 1px solid ${THEME.greyColors.grey5};
  border-radius: 6px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.04);
  margin-bottom: 32px;
`;

export const StageRow = styled(Box)`
  display: flex;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid ${THEME.greyColors.grey5};
  &:hover {
    background: ${THEME.greyColors.grey12Transparent};
  }
`;

export const HeadingBlock = styled(Box)`
  padding: 24px;
  border-bottom: 1px solid ${THEME.greyColors.grey5};
`;

export const ArrowWrapper = styled(Box)`
  display: flex;
  align-items: center;
  font-size: 9px;
  margin-left: 15px;
`;

export const DocumentationWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  background: ${THEME.primaryColors.primaryLight};
  border-radius: 6px;
  &:hover {
    background: rgb(245, 242, 255);
  }
`;

export const StyledL14M = styled(L14M)`
  text-align: right;
`;
