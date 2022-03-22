import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';
import { ButtonRounded } from '../../../../components/atoms';
import { useTableStarterContext } from '../../hooks/useTableStarter';

const CheckboxEditModeHeader = () => {
  const { t } = useTranslation();
  const { toggleCheckboxEditMode, toggleSaveViewDialog } = useTableStarterContext();
  const handleSave = useCallback(() => {
    toggleSaveViewDialog();
    toggleCheckboxEditMode();
  }, [toggleCheckboxEditMode, toggleSaveViewDialog]);

  return (
    <>
      <ButtonRounded onClick={() => toggleCheckboxEditMode()} type="button" color="secondary" variant="contained">
        {t(`Close`)}
      </ButtonRounded>
      <Box pl={2}>
        <ButtonRounded onClick={handleSave} type="button" color="primary" variant="contained">
          {t(`Save`)}
        </ButtonRounded>
      </Box>
    </>
  );
};

export default CheckboxEditModeHeader;
