import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import THEME from '../../constants/theme';

export const VideoPlayerWrapper = styled(Box)`
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  margin-bottom: 76px;
  border-radius: 8px;
`;

export const VideoPlayerBox = styled(Box)`
  padding: 0;
  & .video-react-poster {
    background-color: ${THEME.primaryColors.primaryLight} !important;
  }
  &.video-react {
    padding: 0;
  }
  & .video-react-bezel {
    display: none !important;
  }
`;
