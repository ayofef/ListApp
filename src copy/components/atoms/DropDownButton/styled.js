import withStyles from '@material-ui/core/styles/withStyles';
import styled from 'styled-components';
import { Box } from '@material-ui/core';
import { ButtonRounded } from '../Buttons/ButtonRounded';

const StyledIcon = styled.span`
  margin-left: 8px;
  transition: all 0.3s ease-out;
  transform: ${({ open }) => (open ? 'rotate(180deg)' : 'rotate(0)')};
`;

const StyledButton = withStyles({
  root: {
    fontWeight: '600',
  },
  containedPrimary: {
    boxShadow: 'none',
  },
  containedSecondary: {
    color: '#000',
  },
})(ButtonRounded);

const StyledSpinnerBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
`;

export { StyledButton, StyledIcon, StyledSpinnerBox };
