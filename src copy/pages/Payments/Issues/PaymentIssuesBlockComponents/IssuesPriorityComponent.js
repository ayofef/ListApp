import PropTypes from 'prop-types';
import React from 'react';
import { EditableStatusCell } from '../EditableCells';
import EditableCellContainer from '../EditableCellContainer';
import CellDropdown from '../components/CellDropdown';
import { PRIORITY_OPTIONS } from '../constant';

const FIELD_KEY = 'priority';

const IssuesPriorityComponent = ({ dataKey, refetch, issueData }) => {
  return (
    <EditableCellContainer
      data={issueData[dataKey]}
      options={PRIORITY_OPTIONS}
      issueData={issueData}
      fieldKey={FIELD_KEY}
      rowId={issueData.id}
      refetch={refetch}
      isPopover
      EditComponent={CellDropdown}
      isIssuesDetails
    >
      <EditableStatusCell />
    </EditableCellContainer>
  );
};

IssuesPriorityComponent.propTypes = {
  dataKey: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
  issueData: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

export default IssuesPriorityComponent;
