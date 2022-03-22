import styled from 'styled-components';
import THEME from '../../../constants/theme';

const StyledNameCell = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;

  .arrowDownIcon {
    border-radius: 6px;
    transition: all 0.1s ease-out;

    &:hover {
      background-color: ${THEME.greyColors.grey4};
    }
  }

  span {
    height: 24px;
  }
`;

export { StyledNameCell };
