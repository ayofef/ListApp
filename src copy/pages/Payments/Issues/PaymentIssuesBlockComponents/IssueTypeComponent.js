import PropTypes from 'prop-types';
import React from 'react';
import { IssueType } from '../EditableCells';
import EditableCellContainer from '../EditableCellContainer';
import CellDropdown from '../components/CellDropdown';

import { TYPE_OPTIONS } from '../constant';

const FIELD_KEY = 'type';

const IssueTypeComponent = ({ dataKey, refetch, issueData }) => {
  return (
    <EditableCellContainer
      data={issueData[dataKey]}
      options={TYPE_OPTIONS}
      issueData={issueData}
      fieldKey={FIELD_KEY}
      rowId={issueData.id}
      refetch={refetch}
      isPopover
      EditComponent={CellDropdown}
    >
      <IssueType />
    </EditableCellContainer>
  );
};

IssueTypeComponent.propTypes = {
  dataKey: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
  issueData: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

export default IssueTypeComponent;
