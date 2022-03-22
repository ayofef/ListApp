import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import ArrowForwardRounded from '@material-ui/icons/ArrowForwardRounded';

import { EditableProcessorCell } from '../EditableCells';
import EditableCellContainer from '../EditableCellContainer';
import SearchPeopleCell from '../components/SearchPeopleCell';
import Processor from '../../../../components/table/Processor';

const FIELD_KEY = 'assigneeUserId';

const getFirstName = (name) => {
  if (typeof name !== 'string') return name;
  return name.split(' ')[0];
};

const CreatorAssigneeComponent = ({ refetch, issueData }) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Processor name={getFirstName(issueData.userCreator?.name || 'N/A')} logo={issueData.userCreator?.avatar} />
      <Box mx="10px" mt="6px" fontSize="18px">
        <ArrowForwardRounded fontSize="inherit" />
      </Box>
      <EditableCellContainer
        data={{
          name: getFirstName(issueData.assigneeUser?.name || 'N/A'),
          logo: issueData.assigneeUser?.avatar,
        }}
        options={[]}
        EditComponent={SearchPeopleCell}
        issueData={issueData}
        fieldKey={FIELD_KEY}
        rowId={issueData.id}
        refetch={refetch}
        isPopover
        padding="4px 0px"
        pseudoWidth="115%"
      >
        <EditableProcessorCell />
      </EditableCellContainer>
    </Box>
  );
};

CreatorAssigneeComponent.propTypes = {
  refetch: PropTypes.func.isRequired,
  issueData: PropTypes.shape({
    id: PropTypes.string,
    userCreator: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
    assigneeUser: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
  }).isRequired,
};

export default CreatorAssigneeComponent;
