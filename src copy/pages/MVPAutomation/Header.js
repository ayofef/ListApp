import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import capitalize from '@material-ui/core/utils/capitalize';
import styled from 'styled-components';
import { Box } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { useToggle } from 'react-use';
import { ButtonRounded, H3, L14 } from '../../components/atoms';
import { usePaymentFlowContext } from '../FlowDetailsPage/paymentFlowContext';
import THEME from '../../constants/theme';
import NewAutomationModal from './NewAutomationModal';

export const StyledWrapper = styled.div`
  position: sticky;
  top: -16px;
  background: ${THEME.primaryColors.white};
  z-index: 10;
  height: 73px;
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: -16px -32px 28px;
  border-bottom: 1px solid ${THEME.greyColors.grey5};
`;

export const StyledActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & > :not(:last-child) {
    margin-right: 16px;
  }
`;

const templateId = 'template.freeform-automation';

const FlowsHeader = ({ currentPage, hideButton }) => {
  const { flowId, loading } = usePaymentFlowContext();
  const { t } = useTranslation();
  const [isOpenNewAutomationModal, toggleNewAutomationModal] = useToggle(false);

  return (
    <StyledWrapper>
      <Box display="flex" alignItems="center">
        <H3 margin="0 8px 0 0" fontWeight="600">
          {currentPage === 'payment-processors' ? 'Connections' : t(capitalize(currentPage))}
        </H3>
        {currentPage === 'payment-processors' && (
          <L14 color={THEME.greyColors.grey9} noHover>
            / Payments
          </L14>
        )}
      </Box>
      {hideButton ||
        (loading ? (
          <Box width="140px" height="40px" borderRadius="8px" overflow="hidden" mr="16px">
            <Skeleton variant="rect" height="73px" width="100%" animation="wave" />
          </Box>
        ) : (
          <StyledActions>
            <ButtonRounded type="button" variant="contained" color="primary" onClick={toggleNewAutomationModal}>
              {t('New Automation')}
            </ButtonRounded>
          </StyledActions>
        ))}
      {isOpenNewAutomationModal && (
        <NewAutomationModal
          templateId={templateId}
          flowId={flowId}
          isOpen={isOpenNewAutomationModal}
          toggleIsOpen={toggleNewAutomationModal}
        />
      )}
    </StyledWrapper>
  );
};

FlowsHeader.propTypes = {
  currentPage: PropTypes.string,
  hideButton: PropTypes.bool,
};
FlowsHeader.defaultProps = {
  currentPage: 'overview',
  hideButton: false,
};

export default FlowsHeader;
