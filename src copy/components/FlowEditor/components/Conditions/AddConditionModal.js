import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import { useTranslation } from 'react-i18next';
import { useClickAway } from 'react-use';
import CloseIcon from '@material-ui/icons/Close';
import { StyledBox, StyledItemBox } from './styled';
import { L12B } from '../../../atoms/Typography/L12B';
import { useFlowEditorContext } from '../../context';
import { repopulateEdges } from '../../utils/facades';
import { deleteCondition } from './utils';
import THEME from '../../../../constants/theme';

const iconProps = {
  color: 'inherit',
  fontSize: 'small',
};

const conditionItemTypes = {
  other: 'other',
  value: 'value',
  delete: 'delete',
};

const conditionItems = [
  {
    icon: <MoreHorizIcon {...iconProps} />,
    type: conditionItemTypes.other,
  },
  {
    icon: <LabelOutlinedIcon {...iconProps} />,
    type: conditionItemTypes.value,
  },
  {
    icon: <CloseIcon {...iconProps} />,
    type: conditionItemTypes.delete,
  },
];

const AddConditionModal = ({
  id,
  isOpen,
  stepId,
  targetId,
  setIsShowAddConditionModal,
  setIsShowChooseValueConditionModal,
}) => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const { elements, setElements, saveConfigurationAsync, setSelectedElementId } = useFlowEditorContext();

  useClickAway(ref, () => {
    setSelectedElementId(null);
  });

  const handleOther = async () => {
    const updatedElements = elements.map((el) =>
      el.id === stepId
        ? {
            ...el,
            data: {
              ...el.data,
              elseStepId: targetId,
              conditions: el?.data?.conditions?.filter((c) => c?.nextStepId !== targetId),
            },
          }
        : el
    );
    setElements(repopulateEdges(updatedElements));
    await saveConfigurationAsync(updatedElements);
  };

  const handleDelete = async () => {
    const newElements = deleteCondition({ elements, edgeId: id, stepId, targetId });
    setElements(newElements);
    setIsShowAddConditionModal(false);
    await saveConfigurationAsync(newElements);
  };

  const handleClick = async (type) => {
    switch (type) {
      case conditionItemTypes.value:
        setIsShowAddConditionModal(false);
        setIsShowChooseValueConditionModal(true);
        break;
      case conditionItemTypes.other:
        setIsShowAddConditionModal(false);
        await handleOther();
        break;
      case conditionItemTypes.delete:
        setIsShowAddConditionModal(false);
        await handleDelete();
        break;
      default:
        setIsShowAddConditionModal(false);
    }
  };

  return (
    isOpen && (
      <StyledBox width="176px" ref={ref}>
        {conditionItems.map(({ type }) => (
          <StyledItemBox key={type} onClick={() => handleClick(type)}>
            <L12B
              textTransform="capitalize"
              color={type === conditionItemTypes.delete && THEME.secondaryColors.nodeError}
            >
              {t(type)}
            </L12B>
          </StyledItemBox>
        ))}
      </StyledBox>
    )
  );
};

AddConditionModal.propTypes = {
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  stepId: PropTypes.string.isRequired,
  targetId: PropTypes.string.isRequired,
  setIsShowAddConditionModal: PropTypes.func.isRequired,
  setIsShowChooseValueConditionModal: PropTypes.func.isRequired,
};

export { AddConditionModal };
