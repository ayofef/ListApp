import Box from '@material-ui/core/Box';
import { string } from 'prop-types';
import React, { useEffect } from 'react';
import { Handle, useUpdateNodeInternals } from 'react-flow-renderer';
import compact from 'lodash/compact';
import { P11B } from '../../../atoms';
import { COLORS, VALUE_COLORS } from '../../styled';
import { flowStepPropType, flowStepTypes } from '../../types';
import { VALUE_CONDITION_PREFIX } from '../../utils/facades';
import NodeBase from './NodeBase';
import { NodeSideTools } from './NodeSideTools';
import {
  inputHandleStyle,
  StyledBottomHandle,
  StyledBottomHandleContainer,
  inputConditionHandleActiveStyle,
  StyledGrabbableBox,
} from './styled';
import { useNodeProperties } from './hooks/useNodeProperties';
import { NodeValidationMessage } from './NodeValidationMessage';
import { useFlowEditorContext } from '../../context';
import { useCurrentTestStep } from './hooks/useCurrentTestStep';

const ConditionNode = (props) => {
  const { id, data } = props;
  const { name, __typename, valueToRoute } = data;
  const { nodeConnectable, border, isHover, isHighlighted, occupiedHandleIds, isValid } = useNodeProperties(data);
  const isValueConditionNode = __typename === flowStepTypes.ValueConditionStep;
  const updateNodeInternals = useUpdateNodeInternals();
  const { isAutomationTestInProgress } = useFlowEditorContext();
  useCurrentTestStep({ stepId: id });

  useEffect(() => {
    updateNodeInternals(id);
    // re-render on change bottom handles: valueToRoute?.length
  }, [id, updateNodeInternals, valueToRoute]);

  return (
    <NodeBase id={id}>
      <StyledGrabbableBox
        display="flex"
        flexDirection="column"
        height="88px"
        width="88px"
        borderRadius="44px"
        bgcolor="white"
        boxShadow="0px 4px 4px rgba(155, 159, 171, 0.11)"
        justifyContent="center"
        alignItems="center"
        border={border}
      >
        <Box p={1} textAlign="center">
          <P11B color="#787F88">{name ?? __typename}</P11B>
        </Box>
        <Handle
          type="target"
          position="top"
          style={nodeConnectable ? inputConditionHandleActiveStyle : inputHandleStyle}
        />
        <StyledBottomHandleContainer
          position="absolute"
          bottom="-12.5px;"
          width="88px"
          height="24px"
          display="flex"
          justifyContent="center"
        >
          {isValueConditionNode ? (
            <>
              {compact(valueToRoute ?? []).map((item, index) => (
                <StyledBottomHandle
                  key={item.key}
                  id={`${VALUE_CONDITION_PREFIX}-${index}-${item.key}`}
                  type="source"
                  position="bottom"
                  backgroundColor={
                    isHighlighted ||
                    !occupiedHandleIds.includes(`${VALUE_CONDITION_PREFIX}-${index}-${item.key}`) ||
                    isAutomationTestInProgress
                      ? VALUE_COLORS[index]
                      : '#c1c3c6'
                  }
                />
              ))}
              <StyledBottomHandle
                id="else"
                type="source"
                position="bottom"
                backgroundColor={
                  isHighlighted || !occupiedHandleIds.includes('else')
                    ? COLORS.conditionalRed
                    : '#c1c3c6' || isAutomationTestInProgress
                }
              />
            </>
          ) : (
            <>
              <StyledBottomHandle
                id="true"
                type="source"
                position="bottom"
                backgroundColor={
                  isHighlighted || !occupiedHandleIds.includes('true')
                    ? COLORS.conditionalGreen
                    : '#c1c3c6' || isAutomationTestInProgress
                }
              />
              <StyledBottomHandle
                id="false"
                type="source"
                position="bottom"
                backgroundColor={
                  isHighlighted || !occupiedHandleIds.includes('false')
                    ? COLORS.conditionalRed
                    : '#c1c3c6' || isAutomationTestInProgress
                }
              />
            </>
          )}
        </StyledBottomHandleContainer>
      </StyledGrabbableBox>
      <NodeSideTools id={id} visible={isHover} />
      <NodeValidationMessage visible={!isValid} top="34px" />
    </NodeBase>
  );
};

ConditionNode.propTypes = {
  id: string.isRequired,
  data: flowStepPropType.isRequired,
};

export { ConditionNode };
