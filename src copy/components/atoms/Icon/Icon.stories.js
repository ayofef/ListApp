import Box from '@material-ui/core/Box';
import React from 'react';
import IconComponent from './Icon';

export const Icon = (args) => (
  <Box display="flex" flexDirection="column">
    <Box>
      <IconComponent icon="WhenThen" {...args} />
    </Box>
    <Box>
      <IconComponent icon="PanelClose" {...args} />
    </Box>
  </Box>
);

Icon.args = {
  color: 'black',
};

export default {
  title: 'Atoms/Icon',
  component: IconComponent,
};
