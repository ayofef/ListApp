import React from 'react';
import { useParams } from 'react-router-dom';
import { PaddedPageWrapper } from '../../components/atoms';
import { useGlobalContext } from '../../containers/App/context';
import { FlowMonitor } from '../../components/FlowMonitor';

const FlowMonitorPage = () => {
  const { id } = useParams();
  const { getMeData, getMeRefetch } = useGlobalContext();
  const onboardingComplete = getMeData?.getOnboardingStatus === 'COMPLETE';

  if (!onboardingComplete) {
    getMeRefetch();
    return null;
  }

  if (!id) {
    return 'Missing ID';
  }

  return (
    <PaddedPageWrapper padding="0">
      <FlowMonitor flowId={id} />
    </PaddedPageWrapper>
  );
};

export default FlowMonitorPage;
