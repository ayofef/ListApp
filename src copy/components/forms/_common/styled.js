import styled, { css } from 'styled-components';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { CSSFontSize } from '../../atoms/Typography/StyledTypography';

const formStyle = { alignItems: 'flex-start' };

const CSSInput = css`
  background-color: #fff;

  & .MuiInputBase-input {
    padding: 8px;
    ${CSSFontSize}
  }
`;

const StyledTextField = styled(TextField)`
  &.MuiFormControl-root {
    display: flex;
    width: ${({ width }) => width};
    border-radius: 6px !important;
    .MuiInputBase-formControl {
      background-color: transparent;
      outline: none;
    }

    .MuiOutlinedInput-root fieldset {
      border-radius: 6px !important;
      border-width: 1px;
    }
  }

  & .MuiInputBase-root {
    ${CSSInput}
    height: 38px;
    background-color: #fff !important;
    box-sizing: border-box;
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    fieldset {
      border-color: rgba(255, 255, 255, 0);
    }
    /* Firefox */

    input[type='number'] {
      -moz-appearance: textfield;
    }

    &:hover {
      fieldset {
        border-color: #9ca0ff;
        box-shadow: 0 0 2px 1px rgba(150, 160, 255, 0.2);
      }
    }
    &.Mui-focused fieldset {
      border-color: #4e40ef;
      box-shadow: 0 0 2px 1px rgba(150, 160, 255, 0.2);
    }
  }

  & .MuiFormHelperText-root {
    width: 100%;
  }
`;

const StyledSelect = styled(Select)`
  ${CSSInput}
  & .MuiSelect-select :focus {
    background-color: transparent;
  }
  & .check-icon {
    display: none;
    opacity: 0;
    visibility: hidden;
  }
`;

const StyledFormControlLabelBase = styled(FormControlLabel)`
  &.MuiFormControlLabel-root {
    & .MuiTypography-body1 {
      background-color: transparent !important;
    }
  }
`;

const StyledFormControlLabel = styled(StyledFormControlLabelBase)`
  ${({ margin }) => margin && `margin: ${margin}!important;`}
  &.MuiFormControlLabel-root {
    display: flex;
    align-items: center;
    margin-left: -7px;
    margin-right: 0;
    padding: 5px 0;

    & > :first-child {
      margin-right: 4px;
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

const StyledRadio = styled(Radio)`
  &.MuiRadio-root {
    &.MuiRadio-colorPrimary {
      &.Mui-checked {
        color: #3023c8;
      }
    }
  }
`;

const StyledPasswordVisibilityButton = styled.button`
  position: relative;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  outline: none;
  background-color: rgba(255, 255, 255, 0);
`;

const StyledSelectIconWrapper = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 4px;
  margin-top: ${({ $isOpen }) => ($isOpen ? '' : '1px')};
  transition: all 300ms cubic-bezier(0, 0.84, 0.61, 1.01);
  ${({ $isOpen }) => ($isOpen ? `transform: rotate(180deg)` : `transform: rotate(0deg)`)}
`;

export {
  formStyle,
  StyledRadio,
  StyledFormControlLabel,
  StyledFormControlLabelBase,
  StyledSelect,
  StyledTextField,
  StyledPasswordVisibilityButton,
  StyledSelectIconWrapper,
};
