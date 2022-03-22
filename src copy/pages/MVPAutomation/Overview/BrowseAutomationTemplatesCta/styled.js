import styled, { css } from 'styled-components';
import { ButtonRounded } from '../../../../components/atoms';

const GRADIENT_BG_CSS = css`
  background: linear-gradient(106.01deg, #9370b3 0%, #e37250 100%);
  @supports not (background: linear-gradient(106.01deg, #9370b3 0%, #e37250 100%)) {
    background: url('/img/gradient-banner.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-size: 110%;
    background-position: center;
  }
`;

const StyledWrapper = styled.a`
  box-sizing: border-box;
  width: 100%;
  height: 340px;
  margin-top: ${({ $marginTop }) => $marginTop || 0};
  border-radius: 8px;
  padding: 32px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${GRADIENT_BG_CSS};
`;

const StyledButton = styled(ButtonRounded)`
  &.MuiButtonBase-root {
    color: #fff;
    border-color: #fff;
    flex-grow: 0;
    width: max-content;
    border-radius: 6px;
    padding: 5px 12px 5px 16px;

    span {
      font-weight: 600;
      svg {
        margin: 1px 0 0 8px;
      }
    }

    &:hover {
      color: #fff;
      border-color: #fff;
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

const StyledLeftItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: ${({ $maxWidth }) => $maxWidth || '400px'};
  margin: 26px 32px 0 0;
  align-self: flex-start;
  justify-self: flex-start;
`;

const StyledRightItem = styled.div`
  max-width: ${({ $maxWidth }) => $maxWidth || '480px'};
  transform: translateY(6px);
`;

export { StyledButton, StyledWrapper, StyledLeftItem, StyledRightItem, GRADIENT_BG_CSS };
