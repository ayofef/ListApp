import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Table from '../../components/Table';
import { headCells, transformNodeToRow } from './tableData';
import { automationPropType } from '../constant';

const MultipleFlows = ({ automationList }) => {
  const rows = useMemo(() => automationList.map(transformNodeToRow), [automationList]);

  return (
    <Box mt="32px">
      <Table headCells={headCells} rows={rows} />
    </Box>
  );
};

MultipleFlows.propTypes = {
  automationList: PropTypes.arrayOf(automationPropType).isRequired,
};

export default MultipleFlows;
