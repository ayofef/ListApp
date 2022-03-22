import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useClickAway } from 'react-use';
import { StyledBox, StyledItemBox } from './styled';
import { L12B } from '../../../atoms/Typography/L12B';
import { useFlowEditorContext } from '../../context';
import { repopulateEdges } from '../../utils/facades';
import THEME from '../../../../constants/theme';

const conditionItems = ['true', 'false', 'delete'];

const IfElseConditionModal = ({ stepId, targetId, isOpen, setIsShowIfElseConditionModal }) => {
  const ref = useRef(null);
  const { elements, saveConfigurationAsync, setElements, setSelectedElementId } = useFlowEditorContext();

  useClickAway(ref, () => {
    setSelectedElementId(null);
  });

  const handleClick = async (condition) => {
    let newElements;
    switch (condition) {
      case 'true':
      case 'false':
        newElements = elements.map((el) => {
          if (el.id !== stepId) {
            return el;
          }
          let trueStepId = el.data?.trueStepId;
          let falseStepId = el.data?.falseStepId;
          if (condition === 'true') {
            if (falseStepId === targetId) {
              falseStepId = trueStepId;
            }
            trueStepId = targetId;
          } else {
            if (trueStepId === targetId) {
              trueStepId = falseStepId;
            }
            falseStepId = targetId;
          }
          return {
            ...el,
            data: { ...el.data, nextStepId: null, trueStepId, falseStepId },
          };
        });
        break;
      case 'delete':
        newElements = elements.map((element) => {
          if (element.id !== stepId) {
            return element;
          }
          const trueStepId = targetId === element?.data?.trueStepId ? null : element?.data?.trueStepId;
          const falseStepId = targetId === element?.data?.falseStepId ? null : element?.data?.falseStepId;
          return { ...element, data: { ...element.data, trueStepId, falseStepId } };
        });
        break;
      default:
        newElements = elements;
    }
    setElements(repopulateEdges(newElements));
    setIsShowIfElseConditionModal(false);
    await saveConfigurationAsync(newElements);
  };

  return (
    isOpen && (
      <StyledBox width="112px" ref={ref}>
        {conditionItems.map((item) => (
          <StyledItemBox key={item} onClick={() => handleClick(item)}>
            <L12B textTransform="capitalize" color={item === 'delete' && THEME.secondaryColors.nodeError}>
              {item}
            </L12B>
          </StyledItemBox>
        ))}
      </StyledBox>
    )
  );
};

IfElseConditionModal.propTypes = {
  stepId: PropTypes.string.isRequired,
  targetId: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsShowIfElseConditionModal: PropTypes.func.isRequired,
};

export { IfElseConditionModal };
