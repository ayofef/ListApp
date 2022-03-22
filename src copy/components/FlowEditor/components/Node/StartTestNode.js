import Box from '@material-ui/core/Box';
import { string } from 'prop-types';
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { StartTestNodeHandle, StyledGrabbableBox, StyledIconButton } from './styled';
import NodeBase from './NodeBase';
import Play from '../../../../assets/icons/Play';
import { useFlowEditorContext } from '../../context';
import Reload from '../../../../assets/icons/Reload';

const StartTestNode = ({ id }) => {
  const {
    isAutomationTestInProgress,
    setIsAutomationTestInProgress,
    testFlow,
    testFlowLoading,
  } = useFlowEditorContext();

  const onClickHandler = async () => {
    if (!isAutomationTestInProgress) {
      await testFlow(id);
    }
    setIsAutomationTestInProgress(!isAutomationTestInProgress);
  };

  return (
    <NodeBase id={id}>
      <StyledGrabbableBox
        display="flex"
        flexDirection="column"
        width="44px"
        height="44px"
        borderRadius="50%"
        justifyContent="flex-start"
        bgcolor={isAutomationTestInProgress ? '#FFF' : '#4E40EF'}
        border={isAutomationTestInProgress ? '2px solid #4E40EF' : '2px solid transparent'}
        boxShadow="0px 2px 4px 0px rgba(0, 0, 0, 0.04)"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          className="ellipse-container"
          width="100%"
          height="100%"
        >
          <StyledIconButton onClick={onClickHandler} disabled={testFlowLoading}>
            {/* eslint-disable-next-line no-nested-ternary */}
            {testFlowLoading ? (
              <Box display="flex" alignItems="center" color="white">
                <CircularProgress size={22} color="inherit" />
              </Box>
            ) : isAutomationTestInProgress ? (
              <Reload />
            ) : (
              <Play />
            )}
          </StyledIconButton>
        </Box>
        <StartTestNodeHandle type="source" position="right" />
      </StyledGrabbableBox>
    </NodeBase>
  );
};

StartTestNode.propTypes = {
  id: string.isRequired,
};

export { StartTestNode };
