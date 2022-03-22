import React from 'react';
import Box from '@material-ui/core/Box';

import ChecklistActions from '../../../FlowDetailsPage/Components/ChecklistActions';

/**
 * TODO
 * Switch  MOCKED_STEPS to Backend value
 * Switch link to="/" to Backend value
 */

const MOCKED_STEPS = [
  {
    label: 'Setup payment terms',
    completed: true,
  },
  {
    label: 'Setup payment collection',
  },
  {
    label: 'Setup acceptance',
  },
];

const StepActions = () => {
  return (
    <Box>
      <ChecklistActions checklist={MOCKED_STEPS} />
    </Box>
  );
};

export default StepActions;
