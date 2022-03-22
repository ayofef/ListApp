import React, { useEffect, useMemo } from 'react';
import PropTypes, { arrayOf, oneOf, func, shape } from 'prop-types';
import Close from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { ConditionBox, InputBox, StyledBox, StyledFormControl, StyledOperatorControl, WrapperBox } from './styled';
import { ComparisonOperator, initialComparisonOperator } from '../constants';
import { operationOptions, rightOperandShownArray, showDefaultRightOperand } from './constants';
import { createCondition } from './utils';
import Select, { NONE } from '../../../../../../forms/_common/Select';
import InputByType, { TYPES } from '../InputByType';
import { useFlatFlowProperties } from '../useFlatFlowProperties';
import LoadingState from '../../../LoadingState';
import useValidOperatorsFor from '../../../../../hooks/useGetValidOperatorsFor';

const Condition = ({ condition, conditions, updateDataToSave }) => {
  const { id, left: leftOperand, op: operation, right: rightOperand } = condition;
  const { loading, flatProperties } = useFlatFlowProperties();
  const propertyType = useMemo(
    () => flatProperties?.find((property) => property?.value === leftOperand)?.propertyType,
    [flatProperties, leftOperand]
  );
  const { validOperatorsOptions } = useValidOperatorsFor({ type: propertyType });
  const operatorSelectOptions = useMemo(
    () => (validOperatorsOptions?.length ? validOperatorsOptions : operationOptions),
    [validOperatorsOptions]
  );

  const operatorSelectValue = useMemo(() => {
    const selectedOption = operatorSelectOptions.find((selectOption) => selectOption.value === operation);
    if (selectedOption) {
      return operation;
    }
    return operatorSelectOptions[0]?.value || initialComparisonOperator;
  }, [operation, operatorSelectOptions]);

  const inputType = useMemo(() => {
    if (rightOperandShownArray.includes(operation)) {
      return undefined;
    }
    if (!showDefaultRightOperand.includes(operation)) {
      return TYPES.TEXT_EDITOR_INPUT;
    }
    if (!Array.isArray(flatProperties)) {
      return undefined;
    }
    return propertyType?.includes('ENUM_') ? TYPES.ENUM_SELECT_INPUT : TYPES.TEXT_EDITOR_INPUT;
  }, [operation, flatProperties, propertyType]);

  const leftSelect = useMemo(() => ({ name: 'left', value: leftOperand || NONE, options: flatProperties }), [
    flatProperties,
    leftOperand,
  ]);
  const operatorSelect = useMemo(
    () => ({
      name: 'op',
      value: operatorSelectValue,
      options: operatorSelectOptions,
    }),
    [operatorSelectOptions, operatorSelectValue]
  );

  const updateCondition = ({ target: { name, value } }) => {
    const updatedConditions = conditions.map((cond) => (cond.id === id ? createCondition(cond, name, value) : cond));
    updateDataToSave({ tests: updatedConditions });
  };

  useEffect(() => {
    updateCondition({ target: { name: 'op', value: operatorSelectValue } });
    // do not change dependencies below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operatorSelectValue]);

  const removeCondition = () => {
    const updatedConditions = conditions.filter((cond) => cond.id !== id);
    updateDataToSave({ tests: updatedConditions });
  };

  return (
    <WrapperBox $inputType={inputType}>
      <ConditionBox $inputType={inputType}>
        <LoadingState loading={loading} height={42} mt={0}>
          <StyledFormControl fullWidth>
            <Select
              value={leftSelect.value}
              name={leftSelect.name}
              options={leftSelect.options}
              onChange={updateCondition}
            />
          </StyledFormControl>
          <StyledOperatorControl>
            <Select
              value={operatorSelect.value}
              name={operatorSelect.name}
              options={operatorSelect.options}
              onChange={updateCondition}
              hideNone
            />
          </StyledOperatorControl>
        </LoadingState>
      </ConditionBox>
      {inputType && (
        <InputBox>
          {/* right https://www.notion.so/whenthen/Conditions-236a2f7ac14140d3bedabd47858f986c#368d2c9485924f469fa13d7a73200caa */}
          <InputByType
            name="right"
            value={rightOperand ?? ''}
            onChange={updateCondition}
            inputType={inputType}
            propertyType={propertyType}
          />
        </InputBox>
      )}
      <StyledBox>
        <IconButton type="button" color="inherit" size="small" onClick={removeCondition}>
          <Close size="small" />
        </IconButton>
      </StyledBox>
    </WrapperBox>
  );
};

Condition.propTypes = {
  condition: shape({
    id: PropTypes.string.isRequired,
    left: PropTypes.string.isRequired,
    op: oneOf(Object.keys(ComparisonOperator)).isRequired,
    right: PropTypes.string,
  }).isRequired,
  conditions: arrayOf(
    shape({
      id: PropTypes.string.isRequired,
      left: PropTypes.string.isRequired,
      op: PropTypes.string.isRequired,
      right: PropTypes.string,
    })
  ).isRequired,
  updateDataToSave: func.isRequired,
};

export default Condition;
