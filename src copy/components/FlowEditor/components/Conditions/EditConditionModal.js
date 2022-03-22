import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useClickAway } from 'react-use';
import { StyledBox, StyledItemBox } from './styled';
import { L12B } from '../../../atoms/Typography/L12B';
import { useFlowEditorContext } from '../../context';
import { deleteCondition } from './utils';
import useIsDemo from '../../../../hooks/useIsDemo';

const EditConditionModal = ({
  id,
  stepId,
  targetId,
  isOpen,
  setIsShowEditConditionModal,
  setIsShowChooseValueConditionModal,
}) => {
  const { t } = useTranslation();
  const isDemo = useIsDemo();
  const ref = useRef(null);
  const { elements, saveConfigurationAsync, setElements, setSelectedElementId } = useFlowEditorContext();

  useClickAway(ref, () => {
    setSelectedElementId(null);
  });

  const handleEdit = () => {
    setIsShowChooseValueConditionModal(true);
    setIsShowEditConditionModal(false);
  };

  const handleDelete = async () => {
    const newElements = deleteCondition({ elements, edgeId: id, stepId, targetId });
    setElements(newElements);
    setIsShowEditConditionModal(false);
    await saveConfigurationAsync(newElements);
  };

  return (
    isOpen && (
      <StyledBox width="112px" ref={ref}>
        <StyledItemBox onClick={() => handleEdit()}>
          <L12B textTransform="capitalize">{t('edit')}</L12B>
        </StyledItemBox>
        {!isDemo && (
          <StyledItemBox onClick={() => handleDelete()}>
            <L12B textTransform="capitalize">{t('delete')}</L12B>
          </StyledItemBox>
        )}
      </StyledBox>
    )
  );
};

EditConditionModal.propTypes = {
  id: PropTypes.string.isRequired,
  stepId: PropTypes.string.isRequired,
  targetId: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsShowEditConditionModal: PropTypes.func.isRequired,
  setIsShowChooseValueConditionModal: PropTypes.func.isRequired,
};

export { EditConditionModal };
