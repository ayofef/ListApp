import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DialogContent from '@material-ui/core/DialogContent';
import { initialValues, ENTRY, FAILED } from './formSettings';
import FailedContent from './FailedContent';
import FormSteps from './FormSteps';
import SurveyForm from '../forms/SurveyForm';
import { StepsContextProvider } from './StepsContext';
import { StyledDialog } from './styled';

const ID = 'survey-dialog';

const SurveyDialog = () => {
  const history = useHistory();
  const [steps, setSteps] = useState([ENTRY]);
  const currentStep = steps[steps.length - 1];
  const prevStep = steps[steps.length - 2];

  const handleSuccess = useCallback(
    ({ id }) => {
      history.push({
        pathname: `/flows/${id}/details`,
      });
    },
    [history]
  );

  return (
    <SurveyForm initialValues={initialValues} onSuccess={handleSuccess}>
      <StyledDialog transition="none" open={true} scroll="paper" aria-labelledby={ID} fullScreen>
        {currentStep !== FAILED ? (
          <StepsContextProvider value={{ steps, setSteps, currentStep, prevStep }}>
            <FormSteps id={ID} />
          </StepsContextProvider>
        ) : (
          <DialogContent>
            <FailedContent onSuccess={handleSuccess} />
          </DialogContent>
        )}
      </StyledDialog>
    </SurveyForm>
  );
};

export default SurveyDialog;
