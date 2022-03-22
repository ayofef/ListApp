import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import isEmpty from 'lodash/isEmpty';
import Grid from '@material-ui/core/Grid';
import { bool } from 'prop-types';
import { isDefined } from '../../../../../utils/helpers';
import RecommendedItem from '../../../../FlowDetailsPage/Automation/RecommendedAutomations/RecommendedItem';
import LoadingState from '../../../../FlowDetailsPage/Automation/RecommendedAutomations/LoadingState';
import EmptyState from '../../../../FlowDetailsPage/Automation/RecommendedAutomations/EmptyState';
import { useInfiniteScroll } from './useInfiniteScroll';
import RecommendedOverviewDialog from '../../../../FlowDetailsPage/Automation/RecommendedAutomations/RecommendedOverviewDialog';
import useSearch from '../../../../../hooks/useSearch';
import { PAYMENT_FLOW_KEY } from '../constant';
import PremiumBlock from '../../../Overview/PremiumBlock';
import { StyledContentAreaWrapper } from './styled';
import useOverviewDialogData from '../../../useOverviewDialogData';

const EMPTY_STATE_TITLE = 'Automations';
const EMPTY_STATE_DESC = 'There are currently no Automations.';

const ContentArea = ({ inModal }) => {
  const { loaderRefFn, loading, templateList, templates } = useInfiniteScroll();
  const [searchParams, setSearchParams] = useSearch();
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

  useEffect(() => {
    if (isDefined(searchParams.templateId)) {
      const templateObject = templates.find((template) => template?.template?.id === searchParams.templateId);

      if (isDefined(templateObject)) {
        onSetOverviewData({
          template: templateObject,
        });
        setSearchParams({});
      }
    }
  }, [searchParams.templateId, templates, setSearchParams, onSetOverviewData]);

  return (
    <StyledContentAreaWrapper $inModal={inModal}>
      <Grid container spacing={2}>
        {loading && <LoadingState />}
        {!loading && !(searchParams.automationCategories === PAYMENT_FLOW_KEY) && isEmpty(templateList) ? (
          <EmptyState title={EMPTY_STATE_TITLE} desc={EMPTY_STATE_DESC} />
        ) : (
          <>
            {templateList?.map((template) => (
              <Grid key={template?.template?.id} item md={12} lg={6}>
                <RecommendedItem template={template} setOverviewData={onSetOverviewData} />
              </Grid>
            ))}
            {/* Helper ref for useInfiniteScroll */}
            <Box visibility="hidden" opacity="0" mt="-100px" height="60px" width="100%" ref={loaderRefFn}>
              &nbsp;
            </Box>
          </>
        )}
        {!loading && searchParams.automationCategories === PAYMENT_FLOW_KEY && (
          <PremiumBlock inModal={inModal} directory />
        )}
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
    </StyledContentAreaWrapper>
  );
};

ContentArea.propTypes = {
  inModal: bool,
};

ContentArea.defaultProps = {
  inModal: false,
};

export default ContentArea;
