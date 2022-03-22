import React, { useEffect, useMemo, useRef, useState } from 'react';
import { number, string, bool } from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import {
  StyledEditButton,
  StyledIconButton,
  StyledLabel,
  StyledLabelWrapper,
  StyledMoreHorizIcon,
  StyledPopover,
  StyledWrapper,
} from './styled';
import THEME from '../../../../constants/theme';
import { IfElseConditionModal } from '../Conditions/IfElseConditionModal';
import { useFlowEditorContext } from '../../context';

const addButtonSize = 24;
const editButtonSize = 16;

const IfElseEdgeButton = ({ id, edgeCenterX, edgeCenterY, stepId, edgeError, targetId }) => {
  const { t } = useTranslation();
  const ref = useRef();
  const { findElementDataById, setSelectedElementId } = useFlowEditorContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isShowIfElseConditionModal, setIsShowIfElseConditionModal] = useState(false);
  const [width, setWidth] = useState(0);
  const [height] = useState(addButtonSize);
  const element = findElementDataById(stepId);
  const trueStepId = useMemo(() => element && element.trueStepId, [element]);
  const isTrueCondition = useMemo(() => id?.includes('e-true-'), [id]);
  const isFalseCondition = useMemo(() => id?.includes('e-false-'), [id]);

  useEffect(() => {
    setWidth(ref.current.offsetWidth + (isTrueCondition || isFalseCondition ? -editButtonSize : 0));
  }, [isFalseCondition, isTrueCondition, trueStepId]);

  const showIfElseModalHandler = (e) => {
    setSelectedElementId(id);
    setAnchorEl(e.currentTarget);
    setIsShowIfElseConditionModal(true);
  };

  const onClose = (e) => {
    e.stopPropagation();
    setIsShowIfElseConditionModal(false);
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
          {isTrueCondition || isFalseCondition ? (
            <StyledLabelWrapper>
              <StyledLabel color={edgeError && THEME.secondaryColors.nodeError}>
                {isTrueCondition && t('True')}
                {isFalseCondition && t('False')}
              </StyledLabel>
              <StyledEditButton size="small" onClick={(e) => showIfElseModalHandler(e, id)}>
                <StyledMoreHorizIcon color="inherit" fontSize="small" />
              </StyledEditButton>
            </StyledLabelWrapper>
          ) : (
            <StyledIconButton size="small" onClick={(e) => showIfElseModalHandler(e, id)}>
              <AddIcon color="inherit" fontSize="small" />
            </StyledIconButton>
          )}
        </Box>
        <StyledPopover
          id={id}
          open={isShowIfElseConditionModal}
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
          <IfElseConditionModal
            stepId={stepId}
            targetId={targetId}
            isOpen={isShowIfElseConditionModal}
            setIsShowIfElseConditionModal={setIsShowIfElseConditionModal}
          />
        </StyledPopover>
      </StyledWrapper>
    </foreignObject>
  );
};

IfElseEdgeButton.propTypes = {
  id: string.isRequired,
  edgeCenterX: number,
  edgeCenterY: number,
  stepId: string.isRequired,
  edgeError: bool,
  targetId: string,
};

IfElseEdgeButton.defaultProps = {
  edgeError: false,
  edgeCenterX: 0,
  edgeCenterY: 0,
  targetId: '',
};

export { IfElseEdgeButton };
