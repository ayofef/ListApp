import React, { lazy, Suspense } from 'react';
import { string, bool } from 'prop-types';
import Fallback from './Fallback';
import { VideoPlayerBox } from '../../pages/FlowDetailsPage/styled';

const VideoPlayerComponent = lazy(() => import('./VideoPlayerComponent'));

const VideoPlayer = ({ height, ...props }) => {
  return (
    <Suspense fallback={<Fallback />}>
      <VideoPlayerBox
        component={VideoPlayerComponent}
        height={`${height} !important`}
        paddingTop={`${height} !important`}
        {...props}
      />
    </Suspense>
  );
};

VideoPlayer.propTypes = {
  src: string.isRequired,
  height: string,
  hidePlayButton: bool,
};

VideoPlayer.defaultProps = {
  height: '365px',
  hidePlayButton: false,
};

export default VideoPlayer;
