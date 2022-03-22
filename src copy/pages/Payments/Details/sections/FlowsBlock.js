import React from 'react';
import { string } from 'prop-types';
import Box from '@material-ui/core/Box';
import CallMadeIcon from '@material-ui/icons/CallMade';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next/src';
import { useHistory } from 'react-router-dom';
import { P14, P16B } from '../../../../components/atoms';
import { GET_PAYMENT_FLOW_NAME } from '../../../../utils/queries/flows/flowsQueries';
import { UI_ROUTES } from '../../../../constants/routes';
import THEME from '../../../../constants/theme';
import usePermission from '../../../../permissions/hooks/usePermission';
import { AUTOMATION_PERMISSIONS_IDS } from '../../../MVPAutomation/permissions';
import { FlexContainer } from '../../../../components/atoms/flex/FlexContainer';

const FlowsBlock = ({ flowId }) => {
  const { t } = useTranslation();
  const [canNavigateToFlow] = usePermission(AUTOMATION_PERMISSIONS_IDS.automations);

  const history = useHistory();
  const { data } = useQuery(GET_PAYMENT_FLOW_NAME, {
    variables: { id: flowId },
    fetchPolicy: 'no-cache',
    skip: !flowId,
  });
  const flowData = data?.getFlow;

  const handleRedirect = () => {
    if (flowId) {
      history.push(`${UI_ROUTES.automations}/${flowData?.id || flowId}/editor`);
    }
  };

  return (
    <Box component="section" mb="40px">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <P16B margin="0 0 16px 0">{t('Payment flow')}</P16B>
      </Box>
      {flowData && (
        <FlexContainer
          width="100%"
          backgroundColor={THEME.primaryColors.primaryLight}
          padding="20px 26px 20px 24px"
          display="flex"
          alignItems="center"
          borderRadius="8px"
          justifyContent="space-between"
          border="none"
          {...(canNavigateToFlow ? { cursor: 'pointer', onClick: handleRedirect } : {})}
        >
          <Box>
            <P16B lineHeight="22px" color={THEME.primaryColors.primary}>
              {flowData?.name}
            </P16B>
            <P14 color={THEME.primaryColors.primary}>{flowData?.id}</P14>
          </Box>

          {canNavigateToFlow && (
            <Box component="span" color={THEME.primaryColors.primary}>
              <CallMadeIcon fontSize="small" />
            </Box>
          )}
        </FlexContainer>
      )}

      {!flowData && (
        <Box display="flex" marginTop="24px" justifyContent="center">
          <Box color="#787F88">No connected flow.</Box>
        </Box>
      )}
    </Box>
  );
};

FlowsBlock.propTypes = {
  flowId: string.isRequired,
};
export default FlowsBlock;
