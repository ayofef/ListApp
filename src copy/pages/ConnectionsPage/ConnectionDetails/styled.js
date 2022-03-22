import Box from '@material-ui/core/Box';
import styled from 'styled-components';

const StyledBox = styled(Box)`
  white-space: ${({ whiteSpace }) => whiteSpace || 'normal'};
  text-overflow: ellipsis;

  position: relative;

  transition: all 0.2s ease-out;
  &:hover {
    color: #787f88 !important;
  }
`;

const StyledWrapper = styled.div`
  margin: 0 auto;

  @media screen and (min-width: 1400px) {
    width: 90%;
    max-width: 1400px;
  }
`;

export { StyledBox, StyledWrapper };
