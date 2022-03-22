import React from 'react';
import { bool, shape } from 'prop-types';

import PlayIcon from '../../assets/icons/FlowList/Play';
import { StyledPlayButton } from './styled';

const PlayButton = ({ playerRef, disableButton }) => {
  const player = playerRef?.current?.getState()?.player;

  const handlePlay = () => {
    playerRef?.current?.actions?.play();
  };

  if (disableButton || !player?.paused) {
    return null;
  }

  return (
    <StyledPlayButton onClick={handlePlay} type="button">
      <PlayIcon />
    </StyledPlayButton>
  );
};

PlayButton.propTypes = {
  playerRef: shape({ current: shape({}) }).isRequired,
  disableButton: bool,
};

PlayButton.defaultProps = {
  disableButton: false,
};

export default PlayButton;
