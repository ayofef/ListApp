import React, { useState, useCallback } from 'react';
import PureLayoutBox from '../../components/layouts/PureLayoutBox';
import PureLayout from '../../components/layouts/PureLayout';
import { AnimatedWrapper } from './styled';

import CommunityModal from '../../components/CommunityModal';

import BetaCode from './BetaCode';
import BetaReminder from './BetaReminder';

const BetaAccessCodePage = () => {
  const [communityOpened, setCommunityOpened] = useState(false);
  const [showBeta, setShowBeta] = useState(false);

  const toggleCommunityModal = useCallback(() => {
    setCommunityOpened((prevState) => !prevState);
  }, []);

  const toggleShowBeta = useCallback(() => {
    setShowBeta((prevState) => !prevState);
  }, []);

  return (
    <>
      <PureLayout theme="dark">
        <PureLayoutBox theme="dark">
          <AnimatedWrapper showBeta={showBeta}>
            <BetaReminder toggleShowBeta={toggleShowBeta} />
            <BetaCode toggleCommunityModal={toggleCommunityModal} toggleShowBeta={toggleShowBeta} />
          </AnimatedWrapper>
        </PureLayoutBox>
      </PureLayout>
      {communityOpened && <CommunityModal toggleCommunityModal={toggleCommunityModal} />}
    </>
  );
};

export default BetaAccessCodePage;
