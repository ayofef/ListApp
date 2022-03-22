import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { useToggle } from 'react-use';

import { ButtonRounded, P16M } from '../../../../../atoms';
import Plus from '../../../../../../assets/icons/Plus';
import { StyledDescription, StyledRecipeWrapper } from './styled';
import THEME from '../../../../../../constants/theme';
import RecommendedOverviewDialog from '../../../../../../pages/FlowDetailsPage/Automation/RecommendedAutomations/RecommendedOverviewDialog';
import {
  AUTOMATION_PLAN_LABEL_MAP,
  AUTOMATION_PLAN_DICTIONARY,
} from '../../../../../../pages/FlowDetailsPage/PremiumDialog/constant';
import { useCreateFlowFromTemplate } from '../../../../../../hooks/flowActions/useCreateFlow';
import { useFlowEditorContext } from '../../../../context';
import useIsDemo from '../../../../../../hooks/useIsDemo';
import CircleWithIcon from '../../../../../atoms/CircleWithIcon/CircleWithIcon';
import { getAutomationTemplateIcon } from '../../../../../../constants/getAutomationTemplateIcon';
import AutomationItem from '../../../../../../pages/FlowDetailsPage/Automation/RecommendedAutomations/RecommendedItem/AutomationItem';

const SKIP_REDIRECT = true;

const RecipeItem = ({ recipe }) => {
  const { t } = useTranslation();
  const isDemo = useIsDemo();
  const [recipeOverview, toggleRecipeOverview] = useToggle(false);
  const [createFlowFromTemplatePromise, { loading }] = useCreateFlowFromTemplate();
  const { flowId, refetch } = useFlowEditorContext();

  const showPlanTag = recipe?.plan?.toLowerCase() === AUTOMATION_PLAN_DICTIONARY.PREMIUM?.toLowerCase();
  const planTag = AUTOMATION_PLAN_LABEL_MAP[recipe?.plan] || '';

  const promiseCallbackFn = () => {
    toggleRecipeOverview();
    refetch();
  };

  const customHandleActionFn = () => {
    createFlowFromTemplatePromise(null, recipe?.template?.id, flowId, SKIP_REDIRECT, promiseCallbackFn);
  };

  const icons = useMemo(() => getAutomationTemplateIcon(recipe?.categories) || [], [recipe?.categories]);

  return (
    <>
      <StyledRecipeWrapper>
        <Box mb="12px" display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex">
            {icons?.map(
              ({ Icon, color, key }, index) =>
                Icon && (
                  <CircleWithIcon key={key} array={icons} index={index}>
                    <Icon size={20} color={color} />
                  </CircleWithIcon>
                )
            )}
          </Box>
          {showPlanTag && (
            <AutomationItem
              category={planTag}
              color={THEME.primaryColors.primary}
              bgColor={THEME.primaryColors.primaryLight}
            />
          )}
        </Box>
        <Box mb="4px">
          <P16M fontWeight="500" overflow="hidden" textOverflow="ellipsis" noWrap>
            {recipe?.name}
          </P16M>
        </Box>
        <Box mb="16px">
          <StyledDescription>{recipe?.description}</StyledDescription>
        </Box>

        <ButtonRounded
          type="button"
          variant="contained"
          color="secondary"
          height="32px"
          borderRadius="6px"
          onClick={toggleRecipeOverview}
          disabled={isDemo}
        >
          <Box display="flex" alignItems="center">
            <Box component="span" mt="8px" ml="-10px" mr="6px">
              <Plus fill={THEME.greyColors.grey17} size={20} />
            </Box>
            <Box component="span" fontWeight="500" fontSize="12px">
              {t('Add to canvas')}
            </Box>
          </Box>
        </ButtonRounded>
      </StyledRecipeWrapper>
      {recipeOverview && (
        <RecommendedOverviewDialog
          isOpen={recipeOverview}
          closeDialog={toggleRecipeOverview}
          overviewData={{ template: recipe, showPlanTag, planTag }}
          template={recipe}
          actionButtonText="Add to Payment flow"
          customHandleActionFn={customHandleActionFn}
          actionLoading={loading}
        />
      )}
    </>
  );
};

RecipeItem.propTypes = {
  recipe: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    plan: PropTypes.string,
    description: PropTypes.string,
    template: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeItem;
