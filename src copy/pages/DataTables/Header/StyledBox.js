import Box from '@material-ui/core/Box';
import styled from 'styled-components';

const StyledBox = styled(Box)`
  white-space: ${({ whiteSpace }) => whiteSpace || 'normal'};
  text-overflow: ellipsis;

  & > a {
    color: #232629;
    transition: all 0.2s ease-out;
    &:hover {
      color: #787f88;
    }
  }
`;

export { StyledBox };
