import React from 'react';
import Box from '@material-ui/core/Box';
import { useToggle } from 'react-use';
import { useTranslation } from 'react-i18next';
import {
  StyledFeaturedItemLeft,
  StyledFeaturedItemWrapper,
  StyledFeaturedWrapper,
} from '../Directory/AutomationsDirectoryHeroSection/styled';
import { L10BU } from '../../../components/atoms/Typography/L10BU';
import THEME from '../../../constants/theme';
import { TempH2 } from '../../../components/atoms/Typography/TempH2';
import BuildPaymentFlowImage from '../../../assets/img/BuildPaymentFlowImage.svg';
import RecommendedOverviewDialog from '../../FlowDetailsPage/Automation/RecommendedAutomations/RecommendedOverviewDialog';
import { useGetAutomationTemplates } from '../../FlowDetailsPage/hooks/useGetAutomationTemplates';
import { StyledButton } from './styled';

const BuildPaymentFlow = () => {
  const { t } = useTranslation();
  const { paymentProcessingBaseTemplate } = useGetAutomationTemplates();
  const [openModal, toggleOpenModal] = useToggle(false);

  return (
    <StyledFeaturedWrapper>
      <StyledFeaturedItemWrapper>
        <StyledFeaturedItemLeft $maxWidth="513px">
          <L10BU color={THEME.primaryColors.white}>Not accepting payments yet ?</L10BU>
          <TempH2 color={THEME.primaryColors.white}>Build your first payment flow with WhenThen</TempH2>
          <Box mt="20px">
            <StyledButton
              padding="16px"
              variant="contained"
              color="primary"
              backgroundColor={THEME.primaryColors.white}
              hoverColor={THEME.primaryColors.primaryLight}
              onClick={toggleOpenModal}
            >
              {t('Build Payment Flow')}
            </StyledButton>
          </Box>
        </StyledFeaturedItemLeft>
        <Box position="absolute" right="0" top="0">
          <img src={BuildPaymentFlowImage} alt="" height="100%" />
        </Box>
        {paymentProcessingBaseTemplate && (
          <RecommendedOverviewDialog
            closeDialog={toggleOpenModal}
            overviewData={{ template: paymentProcessingBaseTemplate }}
            isOpen={openModal}
          />
        )}
      </StyledFeaturedItemWrapper>
    </StyledFeaturedWrapper>
  );
};

export default BuildPaymentFlow;
