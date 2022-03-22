import styled from 'styled-components';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { selectTypes } from './types';

export const StyledFormControlLabel = styled(FormControlLabel)`
  &.MuiFormControlLabel-root {
    margin: 0;
    padding: ${({ selectType }) =>
      selectType === selectTypes.people ? '5px 0 !important' : '5px 16px 5px 5px !important'};
    border-radius: ${({ selectType }) => (selectType === selectTypes.people ? 'none' : '6px')};
    height: 38px;
    background-color: ${({ selectType, selected, checked }) =>
      // eslint-disable-next-line no-nested-ternary
      selectType === selectTypes.people ? '#fff' : selected || checked ? '#f5f2ff' : '#f5f6f7'};
    justify-content: ${({ selectType }) => (selectType ? 'space-between' : 'start')};
    &:first-child {
      margin-top: ${({ selectAll }) => (selectAll ? '8px' : '0')};
    }
    &:not(:last-child) {
      border-bottom: ${({ selectType }) => (selectType === selectTypes.people ? '1px solid #E6E9EC' : 'none')};
    }
    & + & {
      margin-top: ${({ selectType }) => (selectType === selectTypes.people ? '3px' : '8px')};
    }
    .MuiFormControlLabel-label,
    .MuiFormControlLabel-label p {
      margin-left: ${({ selectType }) => (selectType === selectTypes.people ? '0' : '7px')};
      font-size: 12px !important;
      font-weight: 600;
      color: ${({ selectType, selected, checked }) =>
        // eslint-disable-next-line no-nested-ternary
        selectType === selectTypes.people ? '#232629' : selected || checked ? '#4e40ef' : '#232629'};
    }
    .MuiButtonBase-root,
    input[type='checkbox'] {
      order: ${({ selectType }) => (selectType ? '3' : '0')};
    }
  }
`;
