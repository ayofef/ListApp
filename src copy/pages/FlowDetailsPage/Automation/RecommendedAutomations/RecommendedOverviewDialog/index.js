import React from 'react';
import { string, shape, func, bool, arrayOf } from 'prop-types';
import Box from '@material-ui/core/Box';
import { StyledDialog, StyledPaper } from '../../../../../components/Dialog/styled';
import Content from './Content';

import THEME from '../../../../../constants/theme';
import AddYourRecipeContent from './AddYourRecipeContent';
import CloseButton from '../../../../../components/Dialog/CloseButton';

const ID = 'flow-automation-recommendation-overview';

const RecommendedOverviewDialog = ({
  isOpen,
  closeDialog,
  overviewData,
  actionButtonText,
  customHandleActionFn,
  actionLoading,
  isAddToExistingAutomationButton,
  isShowAddYourRecipeContent,
  setIsShowAddYourRecipeContent,
  onlyOneInstructAutomationId,
}) => {
  return (
    <StyledDialog
      open={isOpen}
      scroll="paper"
      maxWidth="xl"
      PaperComponent={StyledPaper}
      PaperProps={{
        $borderRadius: '8px',
        $overflowY: 'unset',
      }}
      onClose={closeDialog}
      aria-labelledby={ID}
    >
      <CloseButton onClick={closeDialog} />

      {isShowAddYourRecipeContent ? (
        <AddYourRecipeContent
          template={overviewData?.template}
          setIsShowAddYourRecipeContent={setIsShowAddYourRecipeContent}
        />
      ) : (
        <Box
          position="relative"
          overflow="hidden"
          boxSizing="border-box"
          display="flex"
          flexDirection="column"
          borderRadius="8px"
        >
          <Box
            boxSizing="border-box"
            display="flex"
            height="380px"
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
            bgcolor={THEME.greyColors.grey12}
          >
            <Box
              src={overviewData.template?.imageWebApp}
              component="img"
              alt={overviewData.template?.name}
              width="100%"
            />
          </Box>

          <Content
            template={overviewData.template}
            showPlanTag={overviewData.showPlanTag}
            planTag={overviewData.planTag}
            actionButtonText={actionButtonText}
            actionLoading={actionLoading}
            customHandleActionFn={customHandleActionFn}
            isAddToExistingAutomationButton={isAddToExistingAutomationButton}
            setIsShowAddYourRecipeContent={setIsShowAddYourRecipeContent}
            onlyOneInstructAutomationId={onlyOneInstructAutomationId}
          />
        </Box>
      )}
    </StyledDialog>
  );
};

RecommendedOverviewDialog.propTypes = {
  isOpen: bool.isRequired,
  closeDialog: func.isRequired,
  overviewData: shape({
    template: shape({
      id: string,
      imageWebApp: string,
      template_id: string,
      category: arrayOf(string),
      description: string,
      minimumPlanRequired: string,
      name: string,
    }).isRequired,
    showPlanTag: bool,
    planTag: string,
  }).isRequired,
  actionButtonText: string,
  customHandleActionFn: func,
  actionLoading: bool,
  isAddToExistingAutomationButton: bool,
  isShowAddYourRecipeContent: bool,
  setIsShowAddYourRecipeContent: func,
  onlyOneInstructAutomationId: bool,
};
RecommendedOverviewDialog.defaultProps = {
  actionButtonText: undefined,
  customHandleActionFn: undefined,
  actionLoading: false,
  isAddToExistingAutomationButton: false,
  isShowAddYourRecipeContent: false,
  setIsShowAddYourRecipeContent: () => {},
  onlyOneInstructAutomationId: false,
};

export default RecommendedOverviewDialog;
