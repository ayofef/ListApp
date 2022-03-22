import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import moment from 'moment';
import { UL, LI } from '../../../../../../components/Timeline';

const Flows = ({ value }) =>
  Array.isArray(value) ? (
    <UL>
      {value.map(({ name, date }) => (
        <LI key={name}>
          <Box component="p" m={0} fontSize="14px">
            {name}
          </Box>

          <Box component="p" m="2px 0" fontSize="12px" color="#787F88">
            {date ? moment(date).format('MMM DD, YYYY, LT') : 'Scheduled'}
          </Box>
        </LI>
      ))}
    </UL>
  ) : (
    <Box>No automation runs</Box>
  );

Flows.propTypes = {
  value: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      date: PropTypes.string,
    })
  ),
};

Flows.defaultProps = {
  value: null,
};

export default Flows;
