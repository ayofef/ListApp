import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import { useTranslation } from 'react-i18next';
import { H4, P14 } from '../../../../components/atoms';
import MultipleFlows from './MultipleFlows';
import { automationPropType } from './constant';
import BuildPaymentFlow from '../../../MVPAutomation/Overview/BuildPaymentFlow';

const FlowIdBlock = ({ automationList, loading }) => {
  const { t } = useTranslation();
  const isEmpty = automationList.length === 0;

  return (
    <Box mt="28px">
      <Box>
        <H4>{t('Flow ID')}</H4>
        <P14 color="#787F88" margin="8px 0 0 0">
          {t('Use the Flow ID value in our Checkout SDK. It will be sent in the paymentFlowId field.')}
        </P14>

        {loading && (
          <Box borderRadius="8px" overflow="hidden" mt="32px">
            <Skeleton variant="rect" height="120px" width="100%" animation="wave" />
          </Box>
        )}

        {!loading && !isEmpty && <MultipleFlows automationList={automationList} />}
        {!loading && isEmpty && <BuildPaymentFlow />}
      </Box>
    </Box>
  );
};

FlowIdBlock.propTypes = {
  automationList: PropTypes.arrayOf(automationPropType).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default FlowIdBlock;
