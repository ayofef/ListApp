import React from 'react';
import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { H2, L14M } from '../../../components/atoms';
import THEME from '../../../constants/theme';
import { BlueLink } from './styled';
import { UI_ROUTES } from '../../../constants/routes';
import RecommendedItem from '../../FlowDetailsPage/Automation/RecommendedAutomations/RecommendedItem';
import { useGetAutomationTemplates } from '../../FlowDetailsPage/hooks/useGetAutomationTemplates';
import RecommendedOverviewDialog from '../../FlowDetailsPage/Automation/RecommendedAutomations/RecommendedOverviewDialog';
import useOverviewDialogData from '../useOverviewDialogData';

const TemplatesBlock = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { templates } = useGetAutomationTemplates();
  const {
    overviewData,
    onSetOverviewData,
    onCloseDialog,
    actionButtonText,
    isAddToExistingAutomationButton,
    isShowAddYourRecipeContent,
    setIsShowAddYourRecipeContent,
    onlyOneInstructAutomationId,
  } = useOverviewDialogData();

  return (
    <Box borderRadius="8px" bgcolor={THEME.greyColors.grey14} p="40px 32px" mt="32px">
      <Box display="flex" alignItems="flex-end" justifyContent="space-between" mb="32px">
        <H2 fontWeight={700} maxWidth="520px">
          {t('Start with a recipe')}
        </H2>
        <BlueLink onClick={() => history.push(UI_ROUTES.automationsDirectory)}>
          <L14M margin="0 0 0 24px" cursor="pointer" color={THEME.primaryColors.blue}>
            {t(`Explore all ${templates.length} templates`)}
          </L14M>
          <Box display="flex" alignItems="center" marginLeft="8px" fontSize="12px">
            <ArrowForwardIcon fontSize="inherit" stroke={THEME.primaryColors.blue} />
          </Box>
        </BlueLink>
      </Box>
      <Grid container spacing={2}>
        {templates.slice(0, 6).map((template) => (
          <Grid key={template?.id} item xs={6}>
            <RecommendedItem template={template} setOverviewData={onSetOverviewData} />
          </Grid>
        ))}
      </Grid>
      {overviewData ? (
        <RecommendedOverviewDialog
          isOpen={Boolean(overviewData)}
          closeDialog={onCloseDialog}
          overviewData={overviewData}
          actionButtonText={actionButtonText}
          isAddToExistingAutomationButton={isAddToExistingAutomationButton}
          isShowAddYourRecipeContent={isShowAddYourRecipeContent}
          setIsShowAddYourRecipeContent={setIsShowAddYourRecipeContent}
          onlyOneInstructAutomationId={onlyOneInstructAutomationId}
        />
      ) : null}
    </Box>
  );
};

export default TemplatesBlock;
