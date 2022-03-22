import React from 'react';
import { bool, shape, string, func } from 'prop-types';
import Box from '@material-ui/core/Box';
import ManageAutomation from '../../../pages/FlowDetailsPage/Automation/AutomationBar/ManageAutomation';

const ActionsCell = ({ data, isHovering }) => {
  const { automationId, automationName, automationStatus, hasDraft, hasDraftErrors, handleEdit } = data?.actions;
  return (
    <Box width="32px" ml="16px">
      {isHovering && (
        <ManageAutomation
          automationId={automationId}
          automationName={automationName}
          automationStatus={automationStatus}
          hasDraft={hasDraft}
          hasDraftErrors={hasDraftErrors}
          handleEdit={handleEdit}
        />
      )}
    </Box>
  );
};

ActionsCell.propTypes = {
  data: shape({
    automationId: string,
    automationName: string,
    hasDraft: bool,
    hasDraftErrors: bool,
    automationStatus: string,
    handleEdit: func,
  }).isRequired,
  isHovering: bool,
};

ActionsCell.defaultProps = {
  isHovering: false,
};

export default ActionsCell;
