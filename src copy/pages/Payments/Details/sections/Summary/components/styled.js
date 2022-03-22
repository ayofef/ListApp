import styled from 'styled-components';
import THEME from '../../../../../../constants/theme';

const StyledTrackingIdCopyButton = styled.button`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  padding: 8px 4px;
  margin: 0;
  border: none;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s ease-out;

  &:hover {
    p {
      color: ${THEME.primaryColors.primary};
    }

    svg path {
      fill: ${THEME.primaryColors.primary};
    }
  }
`;

export { StyledTrackingIdCopyButton };
