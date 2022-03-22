import React, { useState } from 'react';
import DetailsHeader from '../Components/DetailsHeader';
import MyAutomations from './MyAutomations';
import RecommendedAutomations from './RecommendedAutomations';
import BrowseAllAutomationTemplateDialog from './RecommendedAutomations/BrowseAllAutomationTemplateDialog';
import VideoPlayer from '../../../components/VideoPlayer';
import Image from '../../../assets/img/flow-settings.png';
import { VideoPlayerWrapper } from '../styled';

const Automation = () => {
  const [browseTemplates, setBrowseTemplates] = useState(false);
  const toggleBrowseTemplates = () => setBrowseTemplates((prevState) => !prevState);

  return (
    <>
      <DetailsHeader skipMediaQuery />
      <VideoPlayerWrapper>
        <VideoPlayer src="https://static.whenthen.com/videos/Automations.mp4" poster={Image} height="340px" />
      </VideoPlayerWrapper>
      <MyAutomations toggleBrowseTemplates={toggleBrowseTemplates} />
      <RecommendedAutomations toggleBrowseTemplates={toggleBrowseTemplates} />
      {browseTemplates && (
        <BrowseAllAutomationTemplateDialog toggleIsOpen={toggleBrowseTemplates} isOpen={browseTemplates} />
      )}
    </>
  );
};

export default Automation;
