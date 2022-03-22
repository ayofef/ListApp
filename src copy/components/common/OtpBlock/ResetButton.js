import React, { useState } from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import { func, string } from 'prop-types';
import { P16, LinkWrapper } from '../../atoms';
import THEME from '../../../constants/theme';

const ResetButton = ({ resendFunc, resetButtonText }) => {
  const [startDelay, setStartDelay] = useState(null);

  const handleCompleteDelay = () => {
    setStartDelay(null);
  };

  const handleStartDelay = () => {
    setStartDelay(Date.now());
    resendFunc();
  };

  return (
    <P16 margin="12px 0 0 0">
      <LinkWrapper
        cursor={startDelay ? 'not-allowed' : 'pointer'}
        className="blue"
        color="blue"
        onClick={startDelay ? null : handleStartDelay}
        noUnderline
      >
        <P16 color={THEME.primaryColors.primary}>{resetButtonText}</P16>
      </LinkWrapper>

      {startDelay && (
        <Countdown
          date={startDelay + 2 * 60 * 1000}
          intervalDelay={1000}
          zeroPadTime={2}
          onComplete={handleCompleteDelay}
          renderer={({ minutes, seconds }) => (
            <span>
              {zeroPad(minutes)}: {zeroPad(seconds)}
            </span>
          )}
        />
      )}
    </P16>
  );
};

ResetButton.propTypes = {
  resetButtonText: string.isRequired,
  resendFunc: func.isRequired,
};

export default ResetButton;
