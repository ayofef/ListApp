import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import uniqBy from 'lodash/uniqBy';
import { ContentBox, FooterBox, StyledBox, StyledTitleWrapper } from './styled';
import { L12B } from '../../../atoms/Typography/L12B';
import { useFlowEditorContext } from '../../context';
import { usePossibleConditionValues } from './hooks/usePossibleConditionValues';
import { L16B } from '../../../atoms/Typography/L16B';
import { StyledFormControl } from '../../../AutomationTest/TestExamplesModal/styled';
import Select, { NONE } from '../../../forms/_common/Select';
import { ButtonRounded } from '../../../atoms';
import useValidOperatorsFor from '../../hooks/useGetValidOperatorsFor';
import { getIsInputFieldDataType } from './constant';
import useIsDemo from '../../../../hooks/useIsDemo';

const ChooseValueConditionModal = ({ isOpen, stepId, targetId, property, setIsShowChooseValueConditionModal }) => {
  const { t } = useTranslation();
  const isDemo = useIsDemo();
  const { elements, setElements, saveConfigurationAsync, setSelectedElementId } = useFlowEditorContext();
  const { possibleValues, condition, setCondition, conditionElement } = usePossibleConditionValues({
    stepId,
    targetId,
  });
  const { validOperatorsOptions } = useValidOperatorsFor({
    type: conditionElement?.selectedDataType,
    property: conditionElement?.conditionProperty,
  });
  const isInputFieldDataType = useMemo(() => getIsInputFieldDataType(conditionElement?.propertyDataType), [
    conditionElement?.propertyDataType,
  ]);

  const conditionValueOptions = useMemo(() => {
    if (!possibleValues?.length) {
      return [];
    }
    return uniqBy(
      possibleValues?.map((value) => ({
        ...value,
        value: value?.key,
        title: value?.label,
      })),
      'value'
    );
  }, [possibleValues]);

  const handleConditionOptionChange = (e) => {
    setCondition((prevValue) => ({
      ...prevValue,
      op: e.target.value,
    }));
  };

  const handleSelectedPossibleValueChange = (e) => {
    e.stopPropagation();
    const { value } = e.target;
    const label = conditionValueOptions.find((option) => option?.value === value)?.label;
    setCondition((prevValue) => ({
      ...prevValue,
      right: value,
      label: label || value,
    }));
  };

  const handleAddCondition = async () => {
    const updatedElements = elements.map((el) => {
      if (el.id !== stepId) {
        return el;
      }
      if (targetId === el?.data?.elseStepId) {
        const conditions = conditionElement?.conditions?.length
          ? [...conditionElement?.conditions, { ...condition, nextStepId: targetId }]
          : [{ ...condition, nextStepId: targetId }];
        return { ...el, data: { ...el.data, conditions, elseStepId: null } };
      }
      const conditions = conditionElement?.conditions?.length
        ? conditionElement?.conditions?.map((c) =>
            c?.nextStepId === condition?.nextStepId ? { ...c, ...condition } : c
          )
        : [condition];
      return { ...el, data: { ...el.data, conditions } };
    });
    setElements(updatedElements);
    setIsShowChooseValueConditionModal(false);
    await saveConfigurationAsync(updatedElements);
  };

  const onCancel = (e) => {
    e.stopPropagation();
    setSelectedElementId(null);
    setIsShowChooseValueConditionModal(false);
  };

  return (
    isOpen && (
      <StyledBox width="328px">
        <StyledTitleWrapper>
          <L16B color="#232629">{t('Choose value')}</L16B>
        </StyledTitleWrapper>
        <ContentBox>
          <L12B margin="20px 0 8px 0">{t('If value')}</L12B>
          <StyledFormControl fullWidth>
            <Select
              value={condition?.op || NONE}
              name="ifValue"
              options={validOperatorsOptions}
              onChange={handleConditionOptionChange}
              overrideMenuProps={{ anchorEl: undefined }}
            />
          </StyledFormControl>
          <L12B margin="20px 0 8px 0" capitalize>
            {property}
          </L12B>
          <StyledFormControl fullWidth>
            {isInputFieldDataType || conditionValueOptions.length === 0 ? (
              <TextField type="text" value={condition?.right} onChange={handleSelectedPossibleValueChange} />
            ) : (
              <Select
                value={condition?.right || NONE}
                name="selectValue"
                options={conditionValueOptions}
                onChange={handleSelectedPossibleValueChange}
                overrideMenuProps={{ anchorEl: undefined }}
              />
            )}
          </StyledFormControl>
        </ContentBox>
        <FooterBox>
          <ButtonRounded
            type="button"
            variant="contained"
            color="primary"
            onClick={handleAddCondition}
            disabled={
              !condition?.op || !condition?.right || condition?.op === NONE || condition?.right === NONE || isDemo
            }
          >
            {t('Add')}
          </ButtonRounded>
          <ButtonRounded type="button" color="secondary" variant="contained" onClick={onCancel}>
            {t('Cancel')}
          </ButtonRounded>
        </FooterBox>
      </StyledBox>
    )
  );
};

ChooseValueConditionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  stepId: PropTypes.string.isRequired,
  targetId: PropTypes.string.isRequired,
  property: PropTypes.string.isRequired,
  setIsShowChooseValueConditionModal: PropTypes.func.isRequired,
};

export { ChooseValueConditionModal };
