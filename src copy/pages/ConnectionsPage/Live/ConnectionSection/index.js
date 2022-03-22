import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';
import { H4 } from '../../../../components/atoms';
import ConnectionItem from '../../components/ConnectionItem';
import { generateUserPilotAttribute } from '../../../../constants/generateUserPilotLabel';
import { USER_PILOT_SECTION_ID } from '../../constant';

const ConnectionSection = ({ connections, title }) => {
  const { t } = useTranslation();
  const isConnectionArchived = connections?.[0]?.status === 'ARCHIVED';

  if (isEmpty(connections)) {
    return null;
  }

  return (
    <Box
      padding="40px 0 40px 0"
      borderBottom={isConnectionArchived ? '' : '1px solid #e6e9ec'}
      width="100%"
      alignItems="flex-start"
      justifyContent="flex-start"
      flexWrap="wrap"
      {...generateUserPilotAttribute(USER_PILOT_SECTION_ID, 'section_header', title)}
    >
      <H4 fontWeight="600" width="100%" margin="0 0 16px 0">
        {t(title)}
      </H4>

      <Box
        display="flex"
        width="100%"
        flexWrap="wrap"
        alignItems="normal"
        flexDirection="row"
        justifyContent="flex-start"
        position="relative"
        mt="-8px"
      >
        {/**ACTUAL CONTENT */}
        {connections?.map((connection) => {
          return <ConnectionItem key={connection.id} connection={connection} />;
        })}
      </Box>
    </Box>
  );
};

ConnectionSection.propTypes = {
  connections: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default ConnectionSection;
