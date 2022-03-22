import Box from '@material-ui/core/Box';
import { string } from 'prop-types';
import React from 'react';
import { CircleImage, P11B } from '../../../atoms';
import { NodeRowLShape } from './styled';
import Icon from '../../../atoms/Icon/Icon';

const NodeRow = ({ iconUrl, icon, label }) => {
  return (
    <Box display="flex" height={30}>
      <NodeRowLShape />
      {icon !== 'None' && (
        <Box height="24px" width="24px" mr="8px">
          {iconUrl ? <CircleImage src={iconUrl} alt={iconUrl} size="24" /> : <Icon icon={icon} />}
        </Box>
      )}
      <P11B lineHeight="24px">{label}</P11B>
    </Box>
  );
};

NodeRow.propTypes = {
  iconUrl: string,
  icon: string,
  label: string.isRequired,
};

NodeRow.defaultProps = {
  iconUrl: '',
  icon: 'WhenThen',
};

export { NodeRow };
