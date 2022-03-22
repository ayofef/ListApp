import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { BigPlayButton, Player, ControlBar, Shortcut } from 'video-react';
import 'video-react/dist/video-react.css';
import PlayButton from './PlayButton';

const VideoPlayerComponent = ({ src, handleVideoStateChange, disableButton, hideControl, ...props }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    if (handleVideoStateChange) {
      playerRef?.current?.subscribeToStateChange(handleVideoStateChange);
    }
  }, [handleVideoStateChange]);

  return (
    <Player src={src} ref={playerRef} playsInline {...props}>
      <BigPlayButton position="center" disabled={true} />
      <ControlBar disableCompletely={hideControl} />
      <Shortcut clickable={!hideControl} dblclickable={!hideControl} />
      <PlayButton playerRef={playerRef} disableButton={disableButton} />
    </Player>
  );
};

VideoPlayerComponent.propTypes = {
  src: PropTypes.string.isRequired,
  disableButton: PropTypes.bool,
  hideControl: PropTypes.bool,
  handleVideoStateChange: PropTypes.func,
};

VideoPlayerComponent.defaultProps = {
  disableButton: false,
  hideControl: false,
  handleVideoStateChange: null,
};

export default VideoPlayerComponent;
