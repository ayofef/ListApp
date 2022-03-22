import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';

import CallMadeIcon from '@material-ui/icons/CallMadeRounded';
import capitalize from '@material-ui/core/utils/capitalize';
import { P14 } from '../../../../../../components/atoms';
import { UI_ROUTES } from '../../../../../../constants/routes';
import { StyledFlowIdItem } from './styled';
import THEME from '../../../../../../constants/theme';

const FlowIdItem = ({ flow, multipleFlowEnabled }) => {
  const flowLink = multipleFlowEnabled ? `/flows/${flow.id}/details` : UI_ROUTES.automations;

  return (
    <StyledFlowIdItem to={flowLink}>
      <div>
        <P14 color={THEME.primaryColors.primary} fontWeight="500">
          {capitalize(flow.name ?? '')}
        </P14>
        <P14 color={THEME.primaryColors.primaryAccent2}>{flow.id}</P14>
      </div>

      <Box mr="6px">
        <CallMadeIcon />
      </Box>
    </StyledFlowIdItem>
  );
};

FlowIdItem.propTypes = {
  flow: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  multipleFlowEnabled: PropTypes.bool.isRequired,
};

export default FlowIdItem;
