import React from 'react';
import styled from 'styled-components';
import { Box } from '@material-ui/core';
import { ArrowBackRounded } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useFlowEditorContext } from '../../FlowEditor/context';
import THEME from '../../../constants/theme';
import NodeIcon from '../../FlowEditor/components/NodeLibrary/NodeIcon';
import { L14M } from '../../atoms';
import { StyledDetailsTitle } from '../../DetailDrawer/styled';

const BackButton = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  margin-right: 12px;
  color: ${THEME.primaryColors.black};

  &:hover {
    background: ${THEME.greyColors.grey12};
  }
`;

const NodeLikeHeader = ({ isLogsScreen, isInstanceStepsScreen }) => {
  const {
    selectedElementData,
    setSelectedElementId,
    selectedInstanceId,
    setSelectedInstanceId,
    selectedFlowInstance,
  } = useFlowEditorContext();
  const onGoBack = () => {
    if (selectedElementData) {
      setSelectedElementId(null);
      return;
    }
    if (selectedInstanceId) {
      setSelectedInstanceId(null);
    }
  };
  return (
    <Box
      display="flex"
      alignItems="center"
      p="16px 24px"
      borderBottom={`1px solid ${THEME.greyColors.grey200}`}
      width="100%"
    >
      <BackButton onClick={onGoBack}>
        <ArrowBackRounded color="inherit" fontSize="inherit" />
      </BackButton>
      {isLogsScreen && <NodeIcon nodeData={selectedElementData} type={selectedElementData?.group?.toLowerCase()} />}
      {isInstanceStepsScreen && (
        <StyledDetailsTitle component="span" fontSize="16px" fontWeight="600" lineHeight="1.3">
          {selectedFlowInstance?.date}
        </StyledDetailsTitle>
      )}
      {isLogsScreen && <L14M color={THEME.greyColors.grey11}>{selectedElementData?.name}</L14M>}
    </Box>
  );
};
NodeLikeHeader.propTypes = {
  isLogsScreen: PropTypes.bool.isRequired,
  isInstanceStepsScreen: PropTypes.bool.isRequired,
};

export default NodeLikeHeader;
