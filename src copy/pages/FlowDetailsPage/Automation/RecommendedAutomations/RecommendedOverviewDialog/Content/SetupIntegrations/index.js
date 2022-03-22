import React from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { string, func, bool } from 'prop-types';
import SetupItem from './SetupItem';
import { templatePropTypes } from '../constant';
import { isDefined } from '../../../../../../../utils/helpers';
import { MENU_ITEMS, MENU_ITEMS_TITLE_MAP } from './constant';
import { SetupItemsStyledBox, StyledSetupIntegrationWrapper } from './styled';
import { ButtonRounded, CircularLoader } from '../../../../../../../components/atoms';
import THEME from '../../../../../../../constants/theme';
import useIsDemo from '../../../../../../../hooks/useIsDemo';
import { useCreateFlowFromTemplate } from '../../../../../../../hooks/flowActions/useCreateFlow';

const SetupIntegrations = ({
  template,
  actionButtonText,
  handleConfigure,
  actionLoading,
  isAddToExistingAutomationButton,
  setIsShowAddYourRecipeContent,
  onlyOneInstructAutomationId,
}) => {
  const { t } = useTranslation();
  const isDemo = useIsDemo();
  const [createFlowFromTemplatePromise] = useCreateFlowFromTemplate();

  const integrationItems = MENU_ITEMS.map((menuItem) => {
    const data = template[menuItem.dataKey];
    const subData = template[menuItem?.subDataKey];
    return {
      dataKey: menuItem.dataKey,
      title: MENU_ITEMS_TITLE_MAP[menuItem.dataKey],
      data,
      ...(isDefined(subData) && { subData }),
    };
  });

  const handleAddToExisting = () => {
    // add recipe to only one existing instruct automation
    if (onlyOneInstructAutomationId) {
      createFlowFromTemplatePromise(null, template?.template?.id, onlyOneInstructAutomationId, false);
      return;
    }
    setIsShowAddYourRecipeContent(true);
  };

  return (
    <StyledSetupIntegrationWrapper>
      <SetupItemsStyledBox>
        {integrationItems.map((item) => (
          <SetupItem key={item.dataKey} integrationItem={item} />
        ))}
      </SetupItemsStyledBox>
      <Box mt="24px" display="flex" justifyContent="flex-end">
        <ButtonRounded
          disabled={isDemo || actionLoading}
          type="button"
          variant="contained"
          color={isAddToExistingAutomationButton ? 'secondary' : 'primary'}
          onClick={handleConfigure}
          endIcon={
            actionLoading && (
              <Box ml="4px" mr="6px">
                <CircularLoader size={14} bgcolor={THEME.primaryColors.white} />
              </Box>
            )
          }
        >
          {t(actionButtonText || 'Configure Template')}
        </ButtonRounded>
        {isAddToExistingAutomationButton && (
          <ButtonRounded
            disabled={isDemo || actionLoading}
            type="button"
            variant="contained"
            color="primary"
            ml="8px"
            onClick={handleAddToExisting}
            endIcon={
              actionLoading && (
                <Box ml="4px" mr="6px">
                  <CircularLoader size={14} bgcolor={THEME.primaryColors.white} />
                </Box>
              )
            }
          >
            {t('Add to existing automation')}
          </ButtonRounded>
        )}
      </Box>
    </StyledSetupIntegrationWrapper>
  );
};

SetupIntegrations.propTypes = {
  template: templatePropTypes.isRequired,
  actionButtonText: string,
  handleConfigure: func.isRequired,
  actionLoading: bool,
  isAddToExistingAutomationButton: bool,
  setIsShowAddYourRecipeContent: func,
  onlyOneInstructAutomationId: string,
};
SetupIntegrations.defaultProps = {
  actionButtonText: undefined,
  actionLoading: false,
  isAddToExistingAutomationButton: false,
  setIsShowAddYourRecipeContent: () => {},
  onlyOneInstructAutomationId: null,
};
export default SetupIntegrations;
