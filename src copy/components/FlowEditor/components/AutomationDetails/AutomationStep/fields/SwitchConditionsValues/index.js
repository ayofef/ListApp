import React from 'react';
import Box from '@material-ui/core/Box';
import Add from '@material-ui/icons/Add';
import { useTranslation } from 'react-i18next';
import { ELSE_STEP_ID } from '../StepId/constants';
import StepId from '../StepId';
import SwitchConditionsValue from './SwitchConditionsValue';
import { ButtonRounded } from '../../../../../../atoms';
import { useElementDataToSave } from '../hooks/useElementDataToSave';

const SwitchConditionsValues = () => {
  const { t } = useTranslation();
  const [{ valueToRoute: values }, updateDataToSave] = useElementDataToSave();

  const addConditionHandler = () => {
    updateDataToSave(({ valueToRoute }) => ({ valueToRoute: [...(valueToRoute ?? []), { key: '', label: '' }] }), true);
  };

  const disableAdd = values?.some((v) => v?.key === '');

  return (
    <>
      <Box alignItems="center" p="16px" borderRadius="8px" bgcolor="#F5F6F7">
        {values?.map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <SwitchConditionsValue key={index} index={index} />
        ))}
        <Box mt="16px" color="#787F88">
          <ButtonRounded
            color="inherit"
            type="button"
            disabled={disableAdd}
            startIcon={<Add />}
            onClick={addConditionHandler}
          >
            {t('Add condition')}
          </ButtonRounded>
        </Box>
      </Box>
      <StepId fieldName={ELSE_STEP_ID} disabled />
    </>
  );
};

export default SwitchConditionsValues;
