import React from 'react';
import { bool, string, func } from 'prop-types';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { H2, P14, ButtonRounded } from '../../../../../../components/atoms';
import SetupIntegrations from './SetupIntegrations';
import { templatePropTypes } from './constant';
import { StyledContentWrapper } from './styled';
import { PAYMENT_PROCESSING_BASE_TEMPLATE } from '../../../../hooks/constant';
import InstructFeatures from './InstructFeatures';
import Categories from './Categories';
import THEME from '../../../../../../constants/theme';
import { usePaymentFlowContext } from '../../../../paymentFlowContext';
import AutomationItem from '../../RecommendedItem/AutomationItem';

const PUBLIC_SITE_URL = process.env.REACT_APP_PUBLIC_SITE_URL;

const Content = ({
  template,
  showPlanTag,
  planTag,
  actionButtonText,
  customHandleActionFn,
  actionLoading,
  isAddToExistingAutomationButton,
  setIsShowAddYourRecipeContent,
  onlyOneInstructAutomationId,
}) => {
  const { t } = useTranslation();
  const { push } = useHistory();

  const { flow } = usePaymentFlowContext();

  const handleConfigure = () => {
    if (typeof customHandleActionFn === 'function') {
      customHandleActionFn();
      return;
    }
    push(`/automations/templates/${template?.template?.id}/${flow?.id}`);
  };
  return (
    <StyledContentWrapper>
      <Box maxWidth="500px" display="flex" flex="1" mb="64px">
        <Categories categories={template.categories} />
        <Box>
          {showPlanTag && (
            <AutomationItem
              category={planTag}
              color={THEME.primaryColors.primary}
              bgColor={THEME.primaryColors.primaryLight}
            />
          )}
          <H2 margin="0 0 16px 0" fontWeight="700">
            {t(template?.name)}
          </H2>
          <P14 color={THEME.greyColors.grey17}>
            {t(template?.description)}...{' '}
            {template?.blogReady && (
              <ButtonRounded
                component="a"
                href={`${PUBLIC_SITE_URL}/solutions/${template.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                height="unset"
                padding="0"
              >
                {t('read more')}
              </ButtonRounded>
            )}
          </P14>
        </Box>
      </Box>
      {template?.template?.id === PAYMENT_PROCESSING_BASE_TEMPLATE ? (
        <InstructFeatures handleConfigure={handleConfigure} />
      ) : (
        <SetupIntegrations
          template={template}
          actionButtonText={actionButtonText}
          handleConfigure={handleConfigure}
          actionLoading={actionLoading}
          isAddToExistingAutomationButton={isAddToExistingAutomationButton}
          setIsShowAddYourRecipeContent={setIsShowAddYourRecipeContent}
          onlyOneInstructAutomationId={onlyOneInstructAutomationId}
        />
      )}
    </StyledContentWrapper>
  );
};

Content.propTypes = {
  template: templatePropTypes.isRequired,
  showPlanTag: bool,
  planTag: string,
  actionButtonText: string,
  customHandleActionFn: func,
  actionLoading: bool,
  isAddToExistingAutomationButton: bool,
  setIsShowAddYourRecipeContent: func,
  onlyOneInstructAutomationId: string,
};

Content.defaultProps = {
  actionButtonText: undefined,
  customHandleActionFn: undefined,
  actionLoading: false,
  showPlanTag: false,
  planTag: null,
  isAddToExistingAutomationButton: false,
  setIsShowAddYourRecipeContent: () => {},
  onlyOneInstructAutomationId: null,
};
export default Content;
