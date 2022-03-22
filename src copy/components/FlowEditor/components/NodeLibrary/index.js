import React, { useState, useEffect } from 'react';
import TabContext from '@material-ui/lab/TabContext';

import { useFlowEditorContext } from '../../context';
import { StyledDrawerPaper } from './styled';
import { StyleTabPanel } from './Tabs/styled';
import { TABS_SETTINGS } from './Tabs/constant';
import NodeLibraryComponent from './NodeLibraryComponent';
import Recipes from './Recipes';
import NodeLibraryHeader from './NodeLibraryHeader';
import { generateUserPilotLabel } from '../../../../constants/generateUserPilotLabel';
import { USER_PILOT_SECTION_ID } from '../constant';

const NodeLibrary = () => {
  const [tabValue, setTabValue] = useState(TABS_SETTINGS.nodes.value);

  const { drawerStatus, toggleDrawerStatus, isInstruct } = useFlowEditorContext();

  useEffect(() => {
    if (isInstruct) {
      setTabValue(TABS_SETTINGS.recipes.value);
    }
  }, [isInstruct]);

  return (
    <StyledDrawerPaper
      open={drawerStatus}
      data-userpilot={generateUserPilotLabel(USER_PILOT_SECTION_ID, 'node-library')}
    >
      <TabContext value={tabValue}>
        <NodeLibraryHeader
          drawerStatus={drawerStatus}
          toggleDrawerStatus={toggleDrawerStatus}
          tabValue={tabValue}
          setTabValue={setTabValue}
          isInstructAutomation={isInstruct}
        />

        <StyleTabPanel value={TABS_SETTINGS.nodes.value}>
          <NodeLibraryComponent drawerStatus={drawerStatus} />
        </StyleTabPanel>

        <StyleTabPanel value={TABS_SETTINGS.recipes.value}>
          <Recipes />
        </StyleTabPanel>
      </TabContext>
    </StyledDrawerPaper>
  );
};

export { NodeLibrary };
