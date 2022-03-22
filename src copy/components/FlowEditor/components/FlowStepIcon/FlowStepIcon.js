import { string } from 'prop-types';
import React from 'react';
import { getNodeColorFromGroup } from '../../utils/getNodeColor';
import Icon from '../../../atoms/Icon/Icon';

const FlowStepIcon = ({ group, icon }) => {
  return <Icon icon={icon ?? 'FlowStep'} size="s" color={getNodeColorFromGroup(group)} />;
};

FlowStepIcon.propTypes = {
  group: string.isRequired,
  icon: string,
};

FlowStepIcon.defaultProps = {
  icon: 'FlowStep',
};

export { FlowStepIcon };
