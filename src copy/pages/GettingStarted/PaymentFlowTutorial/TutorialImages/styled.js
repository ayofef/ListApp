import styled from 'styled-components';
import Box from '@material-ui/core/Box';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const StyledImage = styled(Box)`
  position: absolute;
  width: 100%;
  transition: ${({ opacity }) => (opacity ? 'opacity 1s ease-out' : 'opacity 0s')};
  opacity: ${({ opacity }) => opacity};

  &.Welcome {
    top: 0;
    right: 0;
  }

  &.Settings {
    top: 80px;
    right: 0;
  }
  &.Automation {
    top: 0;
    right: 10%;
  }
  &.Connections {
    top: 32px;
    right: 0;
  }
`;

export { StyledWrapper, StyledImage };
