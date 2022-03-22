import React from 'react';
import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import PropTypes, { string } from 'prop-types';
import { capitalize } from 'lodash';
import { useToggle } from 'react-use';
import { useHistory } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import Zap from '../../../../assets/icons/Zap';
import { ButtonRounded, L12M } from '../../../../components/atoms';
import THEME from '../../../../constants/theme';
import { getDescription } from '../RecommendedAutomations/RecommendedItem/constant';
import { EngageDescription } from '../../../MVPAutomation/Overview/styled';
import Plus from '../../../../assets/icons/Plus';
import RecommendedOverviewDialog from '../RecommendedAutomations/RecommendedOverviewDialog';
import { AUTOMATION_PLAN_DICTIONARY, AUTOMATION_PLAN_LABEL_MAP } from '../../PremiumDialog/constant';
import { useCreateFlowFromTemplate } from '../../../../hooks/flowActions/useCreateFlow';
import { usePaymentFlowContext } from '../../paymentFlowContext';
import { UI_ROUTES } from '../../../../constants/routes';

const EngageItem = ({ title, description, recipe }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [recipeOverview, toggleRecipeOverview] = useToggle(false);
  const [createFlowFromTemplatePromise, { loading }] = useCreateFlowFromTemplate();
  const { flow } = usePaymentFlowContext();

  const _recipe = { ...recipe, description };

  const promiseCallbackFn = () => {
    toggleRecipeOverview();
    history.push(`${UI_ROUTES.automations}/${flow.instructFlowId}/editor`);
  };

  const customHandleActionFn = () => {
    createFlowFromTemplatePromise(null, recipe?.template?.id, flow?.instructFlowId, false, promiseCallbackFn);
  };

  const showPlanTag = recipe?.plan?.toLowerCase() === AUTOMATION_PLAN_DICTIONARY.PREMIUM?.toLowerCase();
  const planTag = AUTOMATION_PLAN_LABEL_MAP[recipe?.plan] || '';

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      bgcolor={THEME.primaryColors.white}
      p="24px 20px 20px"
      borderRadius="8px"
      height={!isEmpty(recipe) ? '192px' : '144px'}
    >
      <Box>
        <Box display="flex" mb="8px">
          <Zap />
          <L12M color={THEME.secondaryColors.greenBright} textTransform="capitalize" margin="0 0 0 4px">
            {t(capitalize(title.toLowerCase()))}
          </L12M>
        </Box>
        <EngageDescription>{getDescription(description)}</EngageDescription>
      </Box>
      {!isEmpty(recipe) && (
        <Box>
          <ButtonRounded
            type="button"
            variant="contained"
            color="secondary"
            height="32px"
            borderRadius="6px"
            onClick={toggleRecipeOverview}
          >
            <Box display="flex" alignItems="center">
              <Box component="span" mt="8px" ml="-10px" mr="6px">
                <Plus fill={THEME.greyColors.grey17} size={20} />
              </Box>
              <Box component="span" fontWeight="500" fontSize="12px">
                {t('Add to flow')}
              </Box>
            </Box>
          </ButtonRounded>
        </Box>
      )}
      {recipeOverview && !isEmpty(recipe) && (
        <RecommendedOverviewDialog
          isOpen={recipeOverview}
          closeDialog={toggleRecipeOverview}
          overviewData={{ template: _recipe, showPlanTag, planTag }}
          template={_recipe}
          actionButtonText="Add to Payment flow"
          customHandleActionFn={customHandleActionFn}
          actionLoading={loading}
        />
      )}
    </Box>
  );
};

EngageItem.propTypes = {
  title: string.isRequired,
  description: string.isRequired,
  recipe: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    plan: PropTypes.string,
    template: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

EngageItem.defaultProps = {
  recipe: null,
};

export default EngageItem;
