import React from 'react';
import { useParams } from 'react-router-dom';
import { PaddedPageWrapper } from '../../components/atoms';
import { useGlobalContext } from '../../containers/App/context';
import { AutomationTest } from '../../components/AutomationTest';

const AutomationTestPage = () => {
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
      <AutomationTest flowId={id} />
    </PaddedPageWrapper>
  );
};

export default AutomationTestPage;
