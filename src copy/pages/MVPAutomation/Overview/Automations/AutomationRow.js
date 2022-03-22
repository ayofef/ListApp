import React from 'react';
import { Box } from '@material-ui/core';
import { func, shape } from 'prop-types';
import { useHover } from 'react-use';
import NameWithDraftCell from '../../../../components/SortTable/Cells/NameWithDraftCell';
import { COLUMN_NAMES } from './tableData';
import StatusCell from '../../../../components/SortTable/Cells/StatusCell';
import { StyledAutomationRow } from './styled';
import CountCell from '../../../../components/SortTable/Cells/CountCell';
import ErrorIconCell from '../../../../components/SortTable/Cells/ErrorIconCell';
import ActionsCell from '../../../../components/SortTable/Cells/ActionsCell';
import { generateUserPilotAttribute } from '../../../../constants/generateUserPilotLabel';

const USER_PILOT_SECTION_ID = 'automation';

const AutomationRow = ({ data, handleClick }) => {
  const element = (isHovering) => (
    <StyledAutomationRow
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      $hasError={data.error?.hasErrors || data.error?.hasDraftErrors}
      onClick={() => handleClick(data.id)}
      {...generateUserPilotAttribute(USER_PILOT_SECTION_ID, 'row', data.name)}
    >
      <NameWithDraftCell data={data[COLUMN_NAMES.name]} isInstruct={data.instruct} />
      <Box display="flex" alignItems="center">
        <StatusCell data={data[COLUMN_NAMES.status]} />
        <CountCell data={data[COLUMN_NAMES.runs]} />
        <ErrorIconCell data={data.error} />
        <ActionsCell data={data} isHovering={isHovering} />
      </Box>
    </StyledAutomationRow>
  );

  const [hoverableAutomation] = useHover(element);

  return hoverableAutomation;
};

AutomationRow.propTypes = {
  data: shape({}).isRequired,
  handleClick: func.isRequired,
};

export default AutomationRow;
