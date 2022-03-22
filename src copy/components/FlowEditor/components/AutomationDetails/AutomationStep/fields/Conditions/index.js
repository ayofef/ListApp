import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';
import { v4 } from 'uuid';
import Box from '@material-ui/core/Box';
import Condition from '../Condition';
import { initialComparisonOperator } from '../constants';
import { createNewConditions, createLogicOperator } from './utils';
import { useElementDataToSave } from '../hooks/useElementDataToSave';
import { AddConditionBox, PlusBox } from './styled';
import { L14M } from '../../../../../../atoms';
import SubTitle from '../../../SubTitle';

const Conditions = () => {
  const { t } = useTranslation();
  const [{ tests, logicalOperator }, updateDataToSave] = useElementDataToSave();
  const conditions = useMemo(() => tests?.map((condition) => ({ ...condition, id: condition?.id ?? v4() })), [tests]);

  const setConditions = (newCondition) => {
    const prevConditions = conditions ?? [];
    const newConditions = [...prevConditions, newCondition];
    updateDataToSave({
      tests: createNewConditions(newConditions),
      logicalOperator: createLogicOperator(logicalOperator),
    });
  };

  return (
    <>
      <SubTitle>
        {t('Create one or more conditions to match and then build logic based on true or false conditions')}
      </SubTitle>
      {conditions?.map((condition, index) => (
        <Box key={condition?.id}>
          <Condition
            key={condition?.id}
            condition={condition}
            conditions={conditions}
            updateDataToSave={updateDataToSave}
          />
          {isEmpty(index) && index !== conditions.length - 1 && (
            <L14M textAlign="center" color="#787f88">
              {t(logicalOperator?.toLowerCase())}
            </L14M>
          )}
        </Box>
      ))}
      <AddConditionBox onClick={() => setConditions({ left: '', op: initialComparisonOperator, right: null })}>
        <PlusBox>+</PlusBox>
      </AddConditionBox>
    </>
  );
};

export default Conditions;
