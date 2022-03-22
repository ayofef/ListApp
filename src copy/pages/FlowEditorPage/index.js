import React from 'react';
import { useParams } from 'react-router-dom';
import { FlowEditor } from '../../components/FlowEditor';
import { PaddedPageWrapper } from '../../components/atoms';
import { useGlobalContext } from '../../containers/App/context';

const FlowEditorPage = () => {
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
      <FlowEditor flowId={id} />
    </PaddedPageWrapper>
  );
};

export default FlowEditorPage;
