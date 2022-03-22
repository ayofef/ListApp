import styled from 'styled-components';
import Box from '@material-ui/core/Box';

export const StyledBox = styled(Box)`
  position: relative;
  box-sizing: border-box;
  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;
