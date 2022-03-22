import React, { useEffect, useMemo, useRef, useState } from 'react';
import { number, string, bool } from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import {
  OpBox,
  StyledEditButton,
  StyledIconButton,
  StyledLabel,
  StyledLabelWrapper,
  StyledMoreHorizIcon,
  StyledPopover,
  StyledWrapper,
} from './styled';
import { AddConditionModal } from '../Conditions/AddConditionModal';
import { EditConditionModal } from '../Conditions/EditConditionModal';
import { ChooseValueConditionModal } from '../Conditions/ChooseValueConditionModal';
import { useFlowEditorContext } from '../../context';
import THEME from '../../../../constants/theme';
import { getValidOperatorLabel } from '../../utils/getValidOperatorLabel';

const editButtonSize = 16;

const EdgeButton = ({ id, edgeCenterX, edgeCenterY, stepId, edgeError, targetId }) => {
  const ref = useRef();
  const { findElementDataById, setSelectedElementId } = useFlowEditorContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isShowAddConditionModal, setIsShowAddConditionModal] = useState(false);
  const [isShowEditConditionModal, setIsShowEditConditionModal] = useState(false);
  const [isShowChooseValueConditionModal, setIsShowChooseValueConditionModal] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const conditionElementData = findElementDataById(stepId);
  const condition = useMemo(() => conditionElementData?.conditions?.find((c) => c.nextStepId === targetId), [
    conditionElementData?.conditions,
    targetId,
  ]);
  const isConditionValid = useMemo(() => !!(condition && condition?.op && condition?.right), [condition]);
  const isOtherEdge = useMemo(() => conditionElementData?.elseStepId === targetId, [
    conditionElementData?.elseStepId,
    targetId,
  ]);
  const otherLabel = useMemo(() => (conditionElementData?.conditions?.length ? 'Other' : 'All'), [
    conditionElementData?.conditions?.length,
  ]);

  useEffect(() => {
    setWidth(ref.current.offsetWidth + (isConditionValid || isOtherEdge ? -editButtonSize : 0));
    setHeight(ref.current.offsetHeight);
  }, [condition, isConditionValid, isOtherEdge, otherLabel]);

  const showAddModalHandler = (e) => {
    setSelectedElementId(id);
    setAnchorEl(e.currentTarget);
    setIsShowAddConditionModal(true);
  };

  const showEditModalHandler = (e) => {
    setSelectedElementId(id);
    setAnchorEl(e.currentTarget);
    setIsShowEditConditionModal(true);
  };

  const onClose = (e) => {
    e.stopPropagation();
    setIsShowEditConditionModal(false);
    setIsShowAddConditionModal(false);
  };

  return (
    <foreignObject
      width={width}
      height={height}
      x={edgeCenterX - width / 2}
      y={edgeCenterY - height / 2}
      className="edgebutton-foreignobject"
      requiredExtensions="http://www.w3.org/1999/xhtml"
    >
      <StyledWrapper>
        <Box ref={ref}>
          {isOtherEdge && (
            <StyledLabelWrapper>
              <StyledLabel $color={edgeError && THEME.secondaryColors.nodeError}>{otherLabel}</StyledLabel>
              <StyledEditButton size="small" onClick={(e) => showEditModalHandler(e, id)}>
                <StyledMoreHorizIcon color="inherit" fontSize="small" />
              </StyledEditButton>
            </StyledLabelWrapper>
          )}
          {isConditionValid && !isOtherEdge && (
            <StyledLabelWrapper>
              <StyledLabel $color={edgeError && THEME.secondaryColors.nodeError}>
                <OpBox component="span" textTransform="lowercase">
                  {getValidOperatorLabel(condition?.op)}
                </OpBox>
                <Box component="span"> {condition?.label || condition?.right}</Box>
              </StyledLabel>
              <StyledEditButton size="small" onClick={(e) => showEditModalHandler(e, id)}>
                <StyledMoreHorizIcon color="inherit" fontSize="small" />
              </StyledEditButton>
            </StyledLabelWrapper>
          )}
          {!isConditionValid && !isOtherEdge && (
            <StyledIconButton size="small" onClick={(e) => showAddModalHandler(e, id)}>
              <AddIcon color="inherit" fontSize="small" />
            </StyledIconButton>
          )}
        </Box>
        <StyledPopover
          id={id}
          open={isShowChooseValueConditionModal || isShowAddConditionModal || isShowEditConditionModal}
          anchorEl={anchorEl}
          onClose={onClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <AddConditionModal
            id={id}
            stepId={stepId}
            targetId={targetId}
            isOpen={isShowAddConditionModal}
            setIsShowAddConditionModal={setIsShowAddConditionModal}
            setIsShowChooseValueConditionModal={setIsShowChooseValueConditionModal}
          />
          <EditConditionModal
            id={id}
            stepId={stepId}
            targetId={targetId}
            isOpen={isShowEditConditionModal}
            setIsShowEditConditionModal={setIsShowEditConditionModal}
            setIsShowChooseValueConditionModal={setIsShowChooseValueConditionModal}
          />
          <ChooseValueConditionModal
            isOpen={isShowChooseValueConditionModal}
            stepId={stepId}
            targetId={targetId}
            property={conditionElementData?.conditionProperty}
            setIsShowChooseValueConditionModal={setIsShowChooseValueConditionModal}
          />
        </StyledPopover>
      </StyledWrapper>
    </foreignObject>
  );
};

EdgeButton.propTypes = {
  id: string.isRequired,
  edgeCenterX: number,
  edgeCenterY: number,
  stepId: string.isRequired,
  edgeError: bool,
  targetId: string,
};

EdgeButton.defaultProps = {
  edgeError: false,
  edgeCenterX: 0,
  edgeCenterY: 0,
  targetId: '',
};

export { EdgeButton };
