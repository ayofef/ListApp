import Box from '@material-ui/core/Box';
import { func } from 'prop-types';
import React from 'react';
import AutomationListIcon from '../../../../assets/icons/EmptyStates/AutomationList';
import ListIconNew from '../../../../assets/icons/EmptyStates/ListIconNew';
import { StyledDialogContent, StyledDialogTitle } from '../../../../components/Dialog/styled';
import NewAutomationItem from './NewAutomationItem';

const ID = 'blank-or-template';

const BlankOrTemplateScreen = ({ handleSelection }) => {
  return (
    <>
      <StyledDialogTitle id={`${ID}-title`} disableTypography>
        New automation
      </StyledDialogTitle>
      <StyledDialogContent>
        <Box minWidth="400px" minHeight="620px" display="flex" justifyContent="space-around">
          <NewAutomationItem
            ImageComponent={AutomationListIcon}
            title="New blank automation"
            subTitle="Build a custom automation from scratch using the trigger, action and conditions nodes in our no-code builder to meet your unique business needs."
            buttonAction={() => handleSelection(false)}
            buttonText="Create blank automation"
          />
          <NewAutomationItem
            ImageComponent={ListIconNew}
            title="Choose from a Recipe Directory"
            subTitle="Browse our directory of validated and pre-made Automation Recipes. Quickly configure our pre-compiled nodes to launch powerful automations in minutes."
            buttonAction={() => handleSelection(true)}
            buttonText="Browse Recipe Directory"
          />
        </Box>
      </StyledDialogContent>
    </>
  );
};
BlankOrTemplateScreen.propTypes = {
  handleSelection: func.isRequired,
};

export default BlankOrTemplateScreen;
