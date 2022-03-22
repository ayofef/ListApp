import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';

import isEmpty from 'lodash/isEmpty';
import { StyledWrapper, StyledTitleWrapper } from '../styled';
import { P16B } from '../../../../../../components/atoms';
import LoadingState from './LoadingState';
import EmptyState from './EmptyState';
import { useFeature } from '../../../../../../hooks/useFeature';
import { FEATURE_TOGGLES_KEYS } from '../../../../../../constants/featureToggles';
import FlowIdItem from './FlowIdItem';
import { generateUserPilotAttribute } from '../../../../../../constants/generateUserPilotLabel';
import { USER_PILOT_SECTION_ID } from '../../../../constant';

const TITLE = 'Linked to';

const LinkedFlows = ({ linkedPaymentFlows, loading, connectionName }) => {
  const [multipleFlowEnabled] = useFeature(FEATURE_TOGGLES_KEYS.MULTIPLE_FLOW);

  const { t } = useTranslation();

  return (
    <StyledWrapper {...generateUserPilotAttribute(USER_PILOT_SECTION_ID, 'status', TITLE)}>
      <StyledTitleWrapper>
        <P16B>{t(TITLE)}</P16B>
      </StyledTitleWrapper>
      <Box p="24px">
        {loading && <LoadingState />}
        {!loading && isEmpty(linkedPaymentFlows) && (
          <EmptyState connectionName={connectionName} multipleFlowEnabled={multipleFlowEnabled} />
        )}
        {!loading &&
          !isEmpty(linkedPaymentFlows) &&
          linkedPaymentFlows.map((flow) => (
            <FlowIdItem key={flow.id} flow={flow} multipleFlowEnabled={multipleFlowEnabled} />
          ))}
      </Box>
    </StyledWrapper>
  );
};

LinkedFlows.propTypes = {
  linkedPaymentFlows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  connectionName: PropTypes.string.isRequired,
};

export default LinkedFlows;
