import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { string } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { useCreateFlowFromTemplate } from '../../../hooks/flowActions/useCreateFlow';
import { usePaymentFlowContext } from '../paymentFlowContext';
import { UI_ROUTES } from '../../../constants/routes';

const AutomationCreate = ({ id, field }) => {
  const [createFlowFromTemplate] = useCreateFlowFromTemplate();
  const { flow } = usePaymentFlowContext();

  useEffect(() => {
    if (flow?.id && !flow[field]) {
      createFlowFromTemplate(null, id, flow.id);
    }
  }, [id, field, flow, createFlowFromTemplate]);

  return <Box>{flow[field] && <Redirect to={`${UI_ROUTES.automations}/${flow[field]}/editor`} />}</Box>;
};

AutomationCreate.propTypes = {
  id: string.isRequired,
  field: string.isRequired,
};

export default AutomationCreate;
