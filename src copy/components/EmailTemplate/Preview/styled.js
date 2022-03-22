import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import { ButtonRounded } from '../../atoms';

export const SCALE = 0.4;

export const StyledPreview = styled.div`
  width: 550px;
  transform: scale(${SCALE});
  transform-origin: top left;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;

  & > :last-child {
    transform: scale(2) !important;
    margin-top: 20px;
    width: 90px;
  }
`;

export const StyledButton = withStyles({
  root: {
    marginTop: '16px',
    backgroundColor: '#fff',
    borderColor: '#c1c5cb',
    '&:hover': {
      backgroundColor: 'rgba(193, 195, 198, 0.2)',
    },
  },
})(ButtonRounded);
