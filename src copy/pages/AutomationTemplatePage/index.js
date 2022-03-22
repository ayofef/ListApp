import React, { useEffect, useMemo } from 'react';
import Box from '@material-ui/core/Box';
import { useHistory, useParams } from 'react-router-dom';
import { useCreateFlowFromTemplate } from '../../hooks/flowActions/useCreateFlow';
import { useGlobalContext } from '../../containers/App/context';
import { FlowEditor } from '../../components/FlowEditor';
import { isDefined } from '../../utils/helpers';
import PremiumPreviewDialog from './PremiumPreviewDialog';
import { findExeption, EXCEPTION_DICTIONARY } from './constant';

const EXCEPTION_COMPONENT_MAP = {
  [EXCEPTION_DICTIONARY.upgradePlan]: PremiumPreviewDialog,
};

const AutomationTemplatePage = () => {
  const history = useHistory();
  const { getMeData, getMeRefetch } = useGlobalContext();
  const [createFlowFromTemplatePromise, result] = useCreateFlowFromTemplate();
  const { templateId, slug } = useParams();
  const onboardingComplete = getMeData?.getOnboardingStatus === 'COMPLETE';
  const exception = useMemo(() => findExeption(result?.error?.graphQLErrors), [result?.error?.graphQLErrors]);

  const ExceptionComponent = useMemo(() => EXCEPTION_COMPONENT_MAP[exception], [exception]);

  const showExceptionComponent = useMemo(() => isDefined(exception) && isDefined(ExceptionComponent), [
    ExceptionComponent,
    exception,
  ]);

  useEffect(() => {
    if (!templateId) {
      history.goBack();
    }
    createFlowFromTemplatePromise(null, templateId, null, slug);
  }, [createFlowFromTemplatePromise, history, templateId, slug]);

  if (!onboardingComplete) {
    getMeRefetch();
    return null;
  }

  return (
    <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
      <FlowEditor />
      {showExceptionComponent && <ExceptionComponent contentType={exception} />}
    </Box>
  );
};

export default AutomationTemplatePage;
