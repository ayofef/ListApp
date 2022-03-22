import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import THEME from '../../../../../../constants/theme';
import { ButtonRounded } from '../../../../../atoms';

const StyledFormControl = styled(FormControl)`
  &.MuiFormControl-root {
    height: ${({ height }) => height || '40px'};
    background-color: ${({ $bgColor }) => $bgColor || '#f5f6f7'};
    display: flex;
    justify-content: center;
    padding: ${({ padding }) => padding || '3px 18px'};
    box-sizing: border-box;
    border-radius: 6px;
    font-size: 12px;
    position: relative;

    & .MuiInputBase-root {
      margin-top: 2px;
      color: #787f88;

      &:before,
      &:after {
        display: none;
      }
    }

    & .MuiFormHelperText-root.Mui-error {
      position: absolute;
      left: 0;
      bottom: -23px;
    }
  }
`;

const StyledSelect = styled(Select)`
  & .MuiSelect-root {
    padding: ${({ padding }) => padding};

    &.MuiSelect-select {
      &:focus {
        background-color: transparent;
      }
    }
  }

  &.MuiInputBase-root {
    &.Mui-disabled {
      color: #000;

      .MuiSvgIcon-root {
        &.Mui-disabled {
          display: none;
        }
      }
    }

    & .check-icon {
      display: none;
      visibility: hidden;
      opacity: 0;
    }
  }
`;

const ConditionStyledFormControl = styled(FormControl)`
  &.MuiFormControl-root {
    width: 100%;
    padding: 5px;
    background-color: #fff;
    border-radius: 6px;
  }

  & .MuiInputBase-root {
    &:before,
    &:after {
      display: none;
    }
  }
`;

const StyledCopyToClipboardBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: ${({ $color }) => $color || `${THEME.greyColors.grey1}`};
  font-size: 14px;
  white-space: nowrap;
  overflow-x: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  margin: 0;
  padding: 7.5px 0;
`;

const StyledCopyValue = styled.p`
  color: ${({ $color }) => $color || `${THEME.greyColors.grey1}`};
  font-size: 14px;
  white-space: nowrap;
  width: 90%;
  overflow-x: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  margin: 0;
  padding: 7.5px 0;
`;

const StyledBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoLinkBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${THEME.primaryColors.primaryLight};
  width: 48px;
  height: 48px;
  border-radius: 6px;
`;

const StyledAddNewButton = styled(ButtonRounded)`
  width: 100%;
  height: 48px !important;
  justify-content: flex-start;
  background-color: ${THEME.greyColors.grey12} !important;
  padding: 0 16px !important;

  svg {
    font-size: 16px !important;
    stroke: ${THEME.greyColors.grey1};
    stroke-width: 1px;
  }

  span {
    font-size: 12px;
    font-weight: 600;
    color: ${THEME.greyColors.grey1};
    justify-content: flex-start;
  }

  &:hover {
    background-color: ${THEME.greyColors.grey5} !important;
  }

  &:disabled {
    span {
      color: ${THEME.greyColors.grey8};
    }

    svg {
      stroke: ${THEME.greyColors.grey8};
    }

    &:hover {
      background-color: ${THEME.greyColors.grey12} !important;
    }
  }
`;

const ActionOptionBox = styled(Box)`
  &.MuiBox-root {
    margin-bottom: 8px;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 16px;
`;

const RemoveActionBox = styled(Box)`
  position: absolute;
  right: 10px;
`;

const AddActionButton = styled(ButtonRounded)`
  width: 100%;
  display: flex;
  justify-content: flex-start !important;
  align-items: center;
  height: 48px !important;
  background-color: #f5f6f7 !important;
  font-size: 12px !important;
  color: ${THEME.greyColors.grey1} !important;
  padding: 6px 22px !important;
  &.Mui-disabled {
    color: ${THEME.greyColors.grey8} !important;
  }
`;

const ActionTextField = styled(TextField)`
  & .MuiInputBase-root {
    & .MuiInputBase-input {
      font-size: 12px !important;
      font-weight: 600;
      color: ${THEME.secondaryColors.black2};
    }
  }
`;

const PromptTextField = styled(TextField)`
  & .MuiInputBase-root {
    & .MuiInputBase-input {
      height: 136px !important;
      box-sizing: border-box;
      padding: 8px 0;
    }
  }
`;

export {
  StyledFormControl,
  StyledSelect,
  ConditionStyledFormControl,
  StyledCopyToClipboardBox,
  StyledCopyValue,
  StyledAddNewButton,
  StyledBox,
  InfoLinkBox,
  ActionOptionBox,
  RemoveActionBox,
  AddActionButton,
  ActionTextField,
  PromptTextField,
};
