import styled from 'styled-components';
import THEME from '../../../../../constants/theme';

const StyledContainer = styled.div`
  padding: 26px 24px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${THEME.greyColors.grey5};

  &:last-child {
    border-bottom: none;
  }
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${THEME.greyColors.grey12};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;

  .Google-Button {
    transform: scale(1.5);
  }
`;

export { StyledContainer, IconContainer };
