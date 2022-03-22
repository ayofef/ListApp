import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import THEME from '../../../../../../../constants/theme';

const PlusBox = styled(Box)`
  font-size: 22px;
  color: ${THEME.primaryColors.primary};
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  justify-content: center;
  border-radius: 8px;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' 
  xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' 
  stroke='%23E6E9ECFF' stroke-width='2' stroke-dasharray='6%2c 10' stroke-dashoffset='0' 
  stroke-linecap='square'/%3e%3c/svg%3e");
`;

const AddConditionBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export { PlusBox, AddConditionBox };
