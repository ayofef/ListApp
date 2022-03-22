import styled from 'styled-components';
import THEME from '../../../../constants/theme';

const TableCellInner = styled.div`
  width: 100%;

  &:hover p {
    color: #4e40ef;
    color: ${THEME.primaryColors.purpleMain};
  }
`;

export { TableCellInner };
