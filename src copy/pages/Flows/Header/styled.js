import styled from 'styled-components';
import IconButtonBase from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

export const StyledWrapper = styled.div`
  padding-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
`;

export const StyledActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & > :not(:last-child) {
    margin-right: 16px;
  }
`;

export const StyledIconButton = withStyles({
  root: {
    borderRadius: '8px !important',
    padding: 8,
    color: '#787F88',
    backgroundColor: ({ opened }) => (opened ? 'transparent' : '#F0F3F5'),
    '&:hover': {
      backgroundColor: '#DEE2E8',
    },
  },
})(IconButtonBase);
