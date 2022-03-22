import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import { Radio, FormControlLabel } from '@material-ui/core';
import { P14 } from '../../atoms';

export const StyledLabel = styled(P14)`
  background-color: ${({ brandcolor, type }) => (type === 'SOLID' || type === 'SOLID_ROUND' ? brandcolor : '#fff')};
  color: ${({ brandcolor, type }) => (type === 'THIN' || type === 'THIN_ROUND' ? brandcolor : '#fff')};
  width: ${({ control }) => (control ? '180px' : '53px')};
  height: ${({ control }) => (control ? 'min-content' : '53px')};
  text-align: center;
  border: 1.1px solid ${({ brandcolor, control }) => (control && brandcolor ? brandcolor : '')};
  border-radius: ${({ type }) => (type === 'SOLID_ROUND' || type === 'THIN_ROUND' ? '315px' : '5px')};
  transition: all 0.3s ease-out;
  position: relative;
  backface-visibility: hidden;
  ${({ control }) => !control && 'box-shadow: 0 0 1.5px 1.5px rgba(155, 159, 171, 0.2)'};

  &:hover,
  &:focus {
    transform: ${({ control }) => (control ? 'scale(1)' : 'scale(1.1)')};
    outline: none;
  }
`;

export const StyledRadio = withStyles({
  root: {
    color: 'default',
    opacity: ({ display }) => (display ? 1 : 0),
    visibility: ({ display }) => (display ? 'visible' : 'hidden'),
    position: ({ display }) => (display ? 'relative' : 'absolute'),
  },
  checked: {
    color: (props) => props.brandcolor,
  },
})(Radio);

export const StyledFormControlLabel = withStyles({
  root: {
    margin: ({ display }) => (display ? '0 32px 0 0' : '0 0 10px 0'),
  },
})(FormControlLabel);
