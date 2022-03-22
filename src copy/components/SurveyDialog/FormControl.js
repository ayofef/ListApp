import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import isEqual from 'lodash/isEqual';
import { ButtonRounded } from '../atoms';
import { SUCCESS } from './formSettings';
import { useStepsContext } from './StepsContext';

const FormControl = ({ getNextStep }) => {
  const { setSteps, currentStep, prevStep } = useStepsContext();
  const { values, initialValues, setFieldValue, handleSubmit, isSubmitting } = useFormikContext();
  const { t } = useTranslation();
  const currentStepValue = values[currentStep];
  const currentStepInitialValue = initialValues[currentStep];
  const nextStep = useMemo(() => getNextStep(currentStepValue), [currentStepValue, getNextStep]);
  const handlePrev = useCallback(() => {
    setSteps((prevState) => prevState.slice(0, -1));

    if (!isEqual(currentStepValue, currentStepInitialValue)) {
      setFieldValue(currentStep, currentStepInitialValue);
    }
  }, [currentStep, currentStepInitialValue, currentStepValue, setFieldValue, setSteps]);
  const handleNext = useCallback(
    (event) => {
      const nextAction = event?.currentTarget.dataset.nextAction;

      if (nextAction !== SUCCESS) {
        setSteps((prevState) => [...prevState, nextAction]);
        return;
      }

      handleSubmit(event);
    },
    [handleSubmit, setSteps]
  );

  return (
    <Box display="flex" flexGrow="1" m="-8px -8px 32px">
      <Box display="flex" justifyContent="flex-end" width="50%" m="8px">
        <ButtonRounded type="button" variant="contained" disabled={!prevStep || isSubmitting} onClick={handlePrev}>
          {t('Back')}
        </ButtonRounded>
      </Box>

      <Box display="flex" width="50%" m="8px">
        <ButtonRounded
          type="button"
          variant="contained"
          color="primary"
          disabled={!nextStep || isSubmitting}
          data-next-action={nextStep}
          onClick={handleNext}
          endIcon={isSubmitting && <CircularProgress color="inherit" size={16} />}
        >
          {t('Continue')}
        </ButtonRounded>
      </Box>
    </Box>
  );
};

FormControl.propTypes = {
  getNextStep: PropTypes.func,
};

FormControl.defaultProps = {
  getNextStep: () => {},
};

export default FormControl;
