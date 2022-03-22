import React, { useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { bool } from 'prop-types';
import { useToggle } from 'react-use';
import isEmpty from 'lodash/isEmpty';
import { ButtonRounded, H2, L12M, P14M } from '../../../components/atoms';
import THEME from '../../../constants/theme';
import InstructFeatures from '../../FlowDetailsPage/Automation/RecommendedAutomations/RecommendedOverviewDialog/Content/InstructFeatures';
import EngageItem from '../../FlowDetailsPage/Automation/EngageItem';
import { ExploreButton } from './styled';
import { UI_ROUTES } from '../../../constants/routes';
import { useGetAutomationTemplates } from '../../FlowDetailsPage/hooks/useGetAutomationTemplates';
import RecommendedOverviewDialog from '../../FlowDetailsPage/Automation/RecommendedAutomations/RecommendedOverviewDialog';
import { usePaymentFlowContext } from '../../FlowDetailsPage/paymentFlowContext';
import RecipeFilter from '../../../components/FlowEditor/components/NodeLibrary/Recipes/RecipeFilter';

const engageItems = [
  { title: 'Orchestration', description: 'Re-route failed transactions to another payment processor' },
  { title: 'Orchestration', description: 'Payment Processor routing on card condition' },
  { title: 'Capture', description: 'Capture transaction based on Webhook' },
  { title: 'Fraud', description: 'Fraud check on all transactions > $100 ' },
];

const PremiumBlock = ({ directory, inModal }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { flow } = usePaymentFlowContext();
  const { recipes, paymentProcessingBaseTemplate } = useGetAutomationTemplates();
  const [openModal, toggleOpenModal] = useToggle(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const instructFlowId = flow?.instructFlowId;

  const filteredRecipes = isEmpty(selectedCategories)
    ? recipes
    : recipes.filter((recipe) => recipe.categories.some((category) => selectedCategories.includes(category)));

  const items = directory ? filteredRecipes?.map((item) => ({ title: item.categories[0], ...item })) : engageItems;

  const handleClick = () => {
    history.push(`${UI_ROUTES.automationsDirectory}?automationCategories=paymentFlow`);
  };

  const heading =
    instructFlowId && directory
      ? `Power up you payment flow with one from our ${recipes?.length} recipes.`
      : 'Unlock the power of your existing payment flow with Instruct Automation';

  return (
    <Box
      display="flex"
      flexDirection={directory ? 'column' : 'row'}
      p="40px 32px"
      mt={directory ? '8px' : '32px'}
      borderRadius="8px"
      bgcolor={instructFlowId && directory ? THEME.greyColors.grey21 : THEME.primaryColors.lightBlue}
    >
      <Box display="flex" flex={1} flexDirection="column" mr={directory ? '0' : '18px'}>
        <L12M margin="0 0 12px 0" color={THEME.primaryColors.primary}>
          {t('Premium')}
        </L12M>
        <Box
          display="flex"
          flexDirection={directory && (!inModal || instructFlowId) ? 'row' : 'column'}
          justifyContent={instructFlowId && directory ? 'space-between' : 'start'}
        >
          <H2 fontSize={directory ? '24px' : '32px'} maxWidth={instructFlowId ? '390px' : '490px'} fontWeight={700}>
            {t(heading)}
          </H2>
          <Box display="flex" flexDirection="column" justifyContent="flex-end">
            {((!inModal && !instructFlowId) || !directory) && (
              <InstructFeatures margin={directory ? '0 0 24px 0' : '24px 0'} noMinHeight hideButton />
            )}
            {!instructFlowId || !directory ? (
              <Box mt={inModal ? '16px' : '0'}>
                <ButtonRounded
                  variant="contained"
                  color="primary"
                  endIcon={<ChevronRightIcon />}
                  onClick={
                    instructFlowId
                      ? () => history.push(`${UI_ROUTES.automations}/${instructFlowId}/editor`)
                      : toggleOpenModal
                  }
                >
                  {t('Start Setup')}
                </ButtonRounded>
              </Box>
            ) : (
              <Box display="flex" alignItems="flex-end">
                <RecipeFilter
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                  recipes={recipes}
                  border
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Box flex={1} mt={directory ? '40px' : '0'}>
        <Grid container spacing={1}>
          {items.map(({ title, description, ...item }) => (
            <Grid xs={directory ? 4 : 6} key={`${title}-${description}`} item>
              <EngageItem title={title} description={description} recipe={instructFlowId ? { ...item } : null} />
            </Grid>
          ))}
          {!directory && (
            <Grid xs={12} item>
              <ExploreButton
                cursor="pointer"
                display="flex"
                justifyContent="center"
                borderRadius="8px"
                bgcolor={THEME.primaryColors.white}
                p="10px"
                onClick={handleClick}
              >
                <P14M>{t('Explore all recipes')}</P14M>
              </ExploreButton>
            </Grid>
          )}
        </Grid>
      </Box>

      {paymentProcessingBaseTemplate && (
        <RecommendedOverviewDialog
          closeDialog={toggleOpenModal}
          overviewData={{ template: paymentProcessingBaseTemplate }}
          isOpen={openModal}
        />
      )}
    </Box>
  );
};

PremiumBlock.propTypes = {
  directory: bool,
  inModal: bool,
};

PremiumBlock.defaultProps = {
  directory: false,
  inModal: false,
};

export default PremiumBlock;
