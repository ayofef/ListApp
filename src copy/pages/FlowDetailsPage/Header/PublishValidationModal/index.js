import PropTypes from 'prop-types';
import React, { useMemo, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';
import { useLocation } from 'react-router-dom';
import {
  StyledDialog,
  StyledDialogContent,
  StyledPaper,
  StyledDialogActions,
} from '../../../../components/Dialog/styled';
import CircledCheck from '../../../../assets/icons/CircledCheck';
import THEME from '../../../../constants/theme';
import Checklist from './Checklist';
import { ButtonRounded } from '../../../../components/atoms';
import { usePaymentFlowContext } from '../../paymentFlowContext';
import { isDefined } from '../../../../utils/helpers';
import CloseButton from '../../../../components/Dialog/CloseButton';

const ID = 'publish-flow-validation-dialog';
const generateRoute = (route, search) => `${route}${search}`;

const PremiumPreviewDialog = ({ isOpen, toggleIsOpen, handlePublish, loading }) => {
  const { t } = useTranslation();
  const { flow, flowId, hasProcessorError } = usePaymentFlowContext();
  const location = useLocation();

  const checklist = useMemo(() => {
    const search = location?.search ?? '';

    return [
      {
        label: 'Connect payment processor',
        route: generateRoute(`/flows/${flowId}/details/settings/payment-processors`, search),
        completed: !isEmpty(flow?.enabledGateways),
        required: true,
      },
      ...(!isEmpty(flow?.enabledGateways) && hasProcessorError
        ? [
            {
              label: 'No payment processor',
              route: generateRoute(`/flows/${flowId}/details/settings/payment-processors`, search),
              completed: !hasProcessorError,
              required: true,
            },
          ]
        : []),
      {
        label: 'Choose a checkout and Integrate APIs',
        route: generateRoute(`/flows/${flowId}/details/settings/checkout`, search),
        completed: isDefined(flow?.configuredCheckout),
      },
    ].filter(Boolean);
  }, [location?.search, flow?.enabledGateways, flow?.configuredCheckout, hasProcessorError, flowId]);

  const uncompletedStep = useMemo(() => checklist.find((el) => el?.required && !el?.completed), [checklist]);

  const disableButton = loading || isDefined(uncompletedStep);

  useEffect(() => {
    if (!isDefined(uncompletedStep)) {
      toggleIsOpen();
      handlePublish();
    }
  }, [handlePublish, toggleIsOpen, uncompletedStep]);

  if (!isDefined(uncompletedStep)) {
    return null;
  }

  return (
    <StyledDialog
      open={isOpen}
      scroll="paper"
      maxWidth="xs"
      width="612px"
      PaperComponent={StyledPaper}
      onClose={toggleIsOpen}
      aria-labelledby={ID}
    >
      <CloseButton onClick={toggleIsOpen} top="8px" right="8px" />

      <StyledDialogContent px="48px">
        <Box display="flex" flexDirection="column" mb="4px" mt="48px">
          <Box
            bgcolor={THEME.primaryColors.primary}
            width="40px"
            height="40px"
            borderRadius="8px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <CircledCheck size={22} fill="#fff" />
          </Box>
        </Box>

        <Box mt="20px" mb="42px">
          <Checklist toggleIsOpen={toggleIsOpen} checklist={checklist} />
        </Box>
      </StyledDialogContent>
      <StyledDialogActions py="16px 48px">
        <ButtonRounded
          type="button"
          variant="contained"
          color="primary"
          onClick={handlePublish}
          disabled={disableButton}
        >
          {t('Publish')}
        </ButtonRounded>

        <ButtonRounded type="button" color="secondary" variant="contained" onClick={toggleIsOpen}>
          {t('Cancel')}
        </ButtonRounded>
      </StyledDialogActions>
    </StyledDialog>
  );
};

PremiumPreviewDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleIsOpen: PropTypes.func.isRequired,
  handlePublish: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default PremiumPreviewDialog;
