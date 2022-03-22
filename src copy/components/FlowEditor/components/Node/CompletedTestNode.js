import Box from '@material-ui/core/Box';
import { string } from 'prop-types';
import React from 'react';
import { Check } from '@material-ui/icons';
import { StyledGrabbableBox, StyledIconButton, TestNodeTargetHandle } from './styled';
import NodeBase from './NodeBase';

const CompletedTestNode = ({ id }) => {
  return (
    <NodeBase id={id}>
      <StyledGrabbableBox
        display="flex"
        flexDirection="column"
        width="28px"
        height="28px"
        borderRadius="50%"
        justifyContent="flex-start"
        bgcolor="#4E40EF"
        border="2px solid #4E40EF"
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
          <StyledIconButton>
            <Check />
          </StyledIconButton>
        </Box>
        <TestNodeTargetHandle type="target" position="left" />
      </StyledGrabbableBox>
    </NodeBase>
  );
};

CompletedTestNode.propTypes = {
  id: string.isRequired,
};

export { CompletedTestNode };
