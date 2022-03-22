import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import { useTranslation } from 'react-i18next';
import { StyledFormControl } from '../Condition/styled';
import { useFlowEditorContext } from '../../../../../context';
import { SIZE } from '../StepId/constants';
import { createOptions } from './createOptions';
import { Close } from '../../../../../../../assets/icons';
import { VALUE_COLORS } from '../../../../../styled';
import Select, { NONE } from '../../../../../../forms/_common/Select';
import InputByType, { TYPES } from '../InputByType';
import { useElementDataToSave } from '../hooks/useElementDataToSave';

const SwitchConditionsValues = ({ index }) => {
  const { t } = useTranslation();
  const { elements } = useFlowEditorContext();
  const [elementDataToSave, updateDataToSave] = useElementDataToSave();
  const { valueToRoute, testProperty } = elementDataToSave;

  const { key: switchValue, label: stepId } = valueToRoute[index] ?? {};

  const options = useMemo(() => createOptions({ elements, elementDataToSave }), [elements, elementDataToSave]);
  const inputType = useMemo(
    () => (testProperty?.includes('decline') ? TYPES.SELECT_DECLINE_CODE_INPUT : TYPES.TEXT_INPUT),
    [testProperty]
  );

  const onChangeValue = useCallback(
    ({ target: { name, value } }) => {
      updateDataToSave((prevElementData) => {
        const nextValueToRoute = [...(prevElementData?.valueToRoute ?? [])];
        nextValueToRoute[index] = { key: value, label: name };

        return { ...prevElementData, valueToRoute: nextValueToRoute };
      }, true);
    },
    [index, updateDataToSave]
  );

  const removeConditionHandler = useCallback(() => {
    updateDataToSave((prevElementData) => {
      const nextValueToRoute = [...(prevElementData?.valueToRoute ?? [])];
      nextValueToRoute.splice(index, 1);

      return { ...prevElementData, valueToRoute: nextValueToRoute };
    }, true);
  }, [index, updateDataToSave]);

  return (
    <Box mb={2} display="flex" flexWrap="wrap">
      <Box display="flex" alignItems="center" mb={1} width="228px" minWidth="228px" flexGrow="1">
        <Box
          width={SIZE}
          height={SIZE}
          flexShrink="0"
          mr="12px"
          ml="12px"
          border="1px solid rgba(0, 0, 0, 0.07)"
          borderRadius="50%"
          bgcolor={VALUE_COLORS[index]}
          boxShadow="0px 2px 4px rgba(155, 159, 171, 0.11)"
        />

        <Box flexGrow="1" ml={1} mr={1}>
          <InputByType name={stepId} value={switchValue} inputType={inputType} onChange={onChangeValue} />
        </Box>

        <Box fontWeight={500} width="46px" textAlign="center" flexShrink={0}>
          {t('then')}
        </Box>
      </Box>

      <Box display="flex" alignItems="center" minWidth="228px" flexGrow="1">
        <Box ml={1} flexGrow="1">
          <StyledFormControl fullWidth>
            <Select value={stepId || NONE} options={options} disabled />
          </StyledFormControl>
        </Box>

        <Box ml="12px">
          <IconButton type="button" size="small" onClick={removeConditionHandler}>
            <Close />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

SwitchConditionsValues.propTypes = {
  index: PropTypes.number.isRequired,
};

export default SwitchConditionsValues;
