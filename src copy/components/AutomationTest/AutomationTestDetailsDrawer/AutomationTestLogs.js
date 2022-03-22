import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { StyledP12 } from './styled';
import LogItem from './LogItem';

const AutomationTestLogs = ({ logs }) => {
  return logs && logs.length ? (
    <>
      <StyledP12 color="#545A61">Output</StyledP12>
      <Box mt="20px">
        {logs?.map((log) => (
          <LogItem key={log?.id} message={log?.message} ts={log?.ts} />
        ))}
      </Box>
    </>
  ) : null;
};

AutomationTestLogs.propTypes = {
  logs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      level: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      stepId: PropTypes.string.isRequired,
      ts: PropTypes.string.isRequired,
    }).isRequired
  ),
};

AutomationTestLogs.defaultProps = {
  logs: [],
};

export default AutomationTestLogs;
