import Box from '@material-ui/core/Box';
import { string } from 'prop-types';
import React, { useEffect } from 'react';
import { Handle, useUpdateNodeInternals } from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';
import LinesEllipsis from 'react-lines-ellipsis';
import { Link } from 'react-router-dom';
import capitalize from 'lodash/capitalize';
import THEME from '../../../../constants/theme';
import { P11B } from '../../../atoms';
import { L10B } from '../../../atoms/Typography/L10B';
import { P12B } from '../../../atoms/Typography/P12B';
import { useFlowEditorContext } from '../../context';
import { flowStepPropType } from '../../types';
import NodeIcon from '../NodeLibrary/NodeIcon';
import { NODE_DETAILS } from './constant';
import { useCurrentTestStep } from './hooks/useCurrentTestStep';
import { useNodeProperties } from './hooks/useNodeProperties';
import MoreBlock from './MoreBlock';
import NodeBase from './NodeBase';
import { NodeValidationMessage } from './NodeValidationMessage';
import { ErrorDot, NodeNameBox, sourceHandleStyle, StyledGrabbableBox, StyledL10B, TargetHandle } from './styled';
import { TestBadge } from './TestBadge';
import { generateUserPilotAttribute } from '../../../../constants/generateUserPilotLabel';
import { USER_PILOT_SECTION_ID } from '../constant';

const Node = (props) => {
  const { id, data } = props;
  const { name, __typename, group, connectionId, locked, hasCTA } = data;

  const { t } = useTranslation();
  const {
    isAutomationTestInProgress,
    connectingNodeData,
    updatingEdgeNodeData,
    isFlowMonitor,
  } = useFlowEditorContext();
  const { isHighlighted, border, isHover, isValid } = useNodeProperties(data);
  const updateNodeInternals = useUpdateNodeInternals();
  useCurrentTestStep({ stepId: id });

  useEffect(() => updateNodeInternals(id), [updateNodeInternals, id]);

  const fixedActionStepRow = __typename === 'FixedActionStep' && connectionId && t('Any  Connection');

  const nodeSelectedDetails = NODE_DETAILS[group] ?? NODE_DETAILS.default;

  return (
    <NodeBase id={id}>
      <StyledGrabbableBox
        display="flex"
        justifyContent="flex-start"
        flexDirection="column"
        width="208px"
        height="160px"
        padding="24px"
        borderRadius="8px"
        bgcolor="white"
        boxShadow={
          isHighlighted
            ? '0 2px 2px rgba(0, 0, 0, 0.04), 0 10px 14px rgba(0, 0, 0, 0.04)'
            : '0 2px 4px rgba(0, 0, 0, 0.04)'
        }
        border={border}
        {...generateUserPilotAttribute(USER_PILOT_SECTION_ID, 'node', id)}
      >
        <>
          {isHover && !locked && <MoreBlock id={id} />}
          <Box
            flex={1}
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
            className="ellipse-container"
            flexDirection="column"
          >
            <Box display="flex" alignItems="center">
              <NodeIcon nodeData={data} type={group?.toLowerCase()} />
              <NodeNameBox color="#787F88" fontSize="12px" lineHeight="16px">
                <LinesEllipsis
                  text={capitalize(name?.toLowerCase() ?? __typename?.toLowerCase())}
                  maxLine={2}
                  basedOn="letters"
                />
              </NodeNameBox>
            </Box>
            {nodeSelectedDetails && data.subLabel && !locked && (
              <Box display="flex" flexDirection="column" mt="16px" width="100%" maxHeight="72px">
                <StyledL10B lineHeight="12px">{t(nodeSelectedDetails.label)}</StyledL10B>
                <P12B
                  lineHeight="20px"
                  margin="2px 0 0 0"
                  overflow="hidden"
                  width="100%"
                  height="100%"
                  textOverflow="ellipsis"
                >
                  {nodeSelectedDetails?.transformFn?.(data.subLabel) || t(data.subLabel)}
                </P12B>
              </Box>
            )}
          </Box>
          {isAutomationTestInProgress && <TestBadge stepId={id} />}
          {fixedActionStepRow && (
            <Box display="flex" ml="28px">
              <P11B lineHeight="24px">{fixedActionStepRow}</P11B>
            </Box>
          )}
          {!locked && (
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Link to="/">
                <L10B color={THEME.primaryColors.primary}>{hasCTA ? `Edit ${name ?? __typename}` : ''}</L10B>
              </Link>
            </Box>
          )}
          {!isValid && <ErrorDot />}
          <NodeValidationMessage
            visible={(!isValid && isHover) || (!isValid && isFlowMonitor)}
            isFlowMonitor={isFlowMonitor}
          />
        </>
        <Handle type="source" position="right" style={sourceHandleStyle} />
        <TargetHandle type="target" position="left" connecting={!!connectingNodeData || !!updatingEdgeNodeData} />
      </StyledGrabbableBox>
    </NodeBase>
  );
};

Node.propTypes = {
  id: string.isRequired,
  data: flowStepPropType.isRequired,
};

export { Node };
