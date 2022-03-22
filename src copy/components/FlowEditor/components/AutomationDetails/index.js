import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slide from '@material-ui/core/Slide';
import isEqual from 'lodash/isEqual';
import { useFlowEditorContext } from '../../context';
import { StyledDialog, StyledDialogTitle, StyledDialogContent, StyledBox } from '../../styled';
import { ButtonRounded, P12, P18B } from '../../../atoms';
import { StyledDialogActions } from '../../../Dialog/styled';
import AutomationStep from './AutomationStep';
import NodeIcon from '../NodeLibrary/NodeIcon';
import { flowStepTypes } from '../../types';
import Logical from './AutomationStep/fields/Logical';
import UnsavedChangesDialog from './UnsavedChangesDialog';
import { useElementDataToSave } from './AutomationStep/fields/hooks/useElementDataToSave';
import useIsDemo from '../../../../hooks/useIsDemo';

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="left" ref={ref} {...props} />;
});

const AutomationDetails = () => {
  const { t } = useTranslation();
  const isDemo = useIsDemo();
  const { selectedElementData, setSelectedElementId, isDataSaving, commitElementDataToSave } = useFlowEditorContext();
  const [elementDataToSave] = useElementDataToSave();
  const open = Boolean(selectedElementData && selectedElementData?.__typename !== flowStepTypes.LinkFlowStep);
  const group = useMemo(() => selectedElementData?.group, [selectedElementData?.group]);
  const [changesModalOpen, setChangesModalOpen] = useState(false);

  const handleClose = () => {
    if (!isDemo && !isEqual(selectedElementData, elementDataToSave)) {
      setChangesModalOpen(true);
      return;
    }
    setSelectedElementId(null);
  };

  const handleCancel = () => {
    setSelectedElementId(null);
  };

  return (
    <>
      <StyledDialog open={open} fullWidth={true} maxWidth="sm" TransitionComponent={Transition} onClose={handleClose}>
        <StyledDialogTitle>
          <StyledBox justifyContent="space-between">
            <P18B>{t(selectedElementData?.name)}</P18B>
            <StyledBox justifyContent="center">
              {selectedElementData?.__typename === flowStepTypes.IfElseStep ? (
                <Logical />
              ) : (
                <>
                  <P12 color="#787F88">{group}</P12>
                  <StyledBox marginLeft="16px">
                    {selectedElementData && (
                      <NodeIcon nodeData={selectedElementData} type={group?.toLowerCase()} mr="0" />
                    )}
                  </StyledBox>
                </>
              )}
            </StyledBox>
          </StyledBox>
        </StyledDialogTitle>
        <StyledDialogContent>
          <AutomationStep />
        </StyledDialogContent>
        <StyledDialogActions py="32px" $buttonMargin="16px" $fixed $borderTop>
          <ButtonRounded
            type="button"
            variant="contained"
            color="primary"
            onClick={commitElementDataToSave}
            disabled={isDataSaving || isDemo}
          >
            {isDataSaving ? <CircularProgress size={24} color="inherit" /> : t('Save')}
          </ButtonRounded>
          <ButtonRounded type="button" color="secondary" variant="contained" onClick={handleCancel}>
            {t('Cancel')}
          </ButtonRounded>
        </StyledDialogActions>
      </StyledDialog>
      <UnsavedChangesDialog open={changesModalOpen} setOpen={setChangesModalOpen} />
    </>
  );
};

export { AutomationDetails };
