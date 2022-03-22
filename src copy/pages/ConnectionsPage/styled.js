import styled, { css } from 'styled-components';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import THEME from '../../constants/theme';
import { ButtonRounded } from '../../components/atoms';

export const ConnectionTile = styled.div`
  margin-top: 16px;
  margin-right: 16px;
  box-sizing: border-box;
  width: 330px;
  height: 72px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 16px;
  cursor: pointer;
  background-color: #fff;
  border: ${({ isBrokenConnection }) =>
    isBrokenConnection ? `1px solid ${THEME.statusColors.darkRed}` : '1px solid #e6e9ec'};
  transition: all 0.3s ease-out;

  &:hover {
    box-shadow: 0 8px 14px rgba(0, 0, 0, 0.04);
  }
`;

export const ConnectionTileLogo = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
  background-image: ${({ img }) => (img ? `url(${img})` : 'none')};
  flex-shrink: 0;
`;

export const InputCover = styled.div`
  margin: ${(props) => props.margin};
  position: relative;
  background: rgba(255, 255, 255, 0);
  z-index: 1000;
  width: 100%;
  cursor: pointer;
  color: #232629 !important;
  ${({ transform }) => transform && `transform: ${transform}`};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: 30px;

  &::before {
    content: '';
    position: absolute;
    display: block;
    width: 105%;
    height: 100%;
    background-color: #e6e9ec;
    border-radius: 4px;
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    visibility: hidden;
  }

  &:hover {
    ${({ isEditing }) =>
      !isEditing &&
      css`
        &::before {
          opacity: 1;
          visibility: visible;
        }
      `}
  }
`;

export const StyledFormControlLabel = styled(FormControlLabel)`
  &.MuiFormControlLabel-root {
    display: flex;
    align-items: flex-start;
    margin-left: -7px;
    margin-right: 0;

    & > :not(:first-child) {
      margin-top: 6px;
    }

    & .MuiFormControlLabel-label {
      text-transform: capitalize;
    }

    & .MuiTypography-body1 {
      font-size: 14px;
      font-family: Inter sans-serif;
      font-style: normal;
      font-weight: normal;
      line-height: 20px;
    }

    & .MuiButtonBase-root {
      padding: 4px;
    }
  }
`;

export const StyledButton = styled(ButtonRounded)`
  &.MuiButtonBase-root {
    font-weight: 600;
    box-shadow: none;
  }

  &.MuiButton-containedPrimary {
    color: ${THEME.primaryColors.blue};
    background-color: ${THEME.secondaryColors.inputBg};

    &:hover {
      background-color: ${THEME.greyColors.grey5};
    }
  }

  &.MuiButton-containedSecondary {
    color: ${THEME.greyColors.grey1};
  }
`;
