import React, { useEffect, useMemo, useState } from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import { v4 } from 'uuid';
import isEmpty from 'lodash/isEmpty';
import { ActionOptionBox, ActionTextField, AddActionButton, RemoveActionBox, StyledFormControl } from './styled';
import Title from '../../Title';
import { useElementDataToSave } from './hooks/useElementDataToSave';
import { Close } from '../../../../../../assets/icons';
import Plus from '../../../../../../assets/icons/Plus';
import THEME from '../../../../../../constants/theme';

const REMOVE_BUTTON_CLASSNAME = 'remove-button';

const UserDecision = () => {
  const { t } = useTranslation();
  const [{ actions }, updateDataToSave] = useElementDataToSave();
  const [actionsOptions, setActionsOptions] = useState([]);
  const isAddActionDisabled = useMemo(() => actionsOptions.find((opt) => opt?.value === ''), [actionsOptions]);

  useEffect(() => {
    const actionOpts = actions?.map((action) => ({
      id: v4(),
      value: action,
    }));
    setActionsOptions(actionOpts);
  }, [actions]);

  const addConditionHandler = () => {
    setActionsOptions([...actionsOptions, { id: v4(), value: '' }]);
  };

  const handleOnChange = ({ target: { name: id, value } }) => {
    const updatedOptions = actionsOptions.map((option) => (option.id === id ? { id, value } : option));
    setActionsOptions(updatedOptions);
  };

  const getActionFromActionsOptions = (opts) => {
    return opts?.filter((opt) => !isEmpty(opt.value)).map((opt) => opt?.value);
  };

  const removeConditionHandler = (id) => {
    const newActionsOptions = actionsOptions?.filter((opt) => opt.id !== id);
    setActionsOptions(newActionsOptions);
    const newActions = getActionFromActionsOptions(newActionsOptions);
    updateDataToSave({ actions: newActions });
  };

  const handleOnBlur = (e, value) => {
    if (value === '' || e?.relatedTarget?.className?.includes(REMOVE_BUTTON_CLASSNAME)) {
      return;
    }
    const newActions = getActionFromActionsOptions(actionsOptions);
    updateDataToSave({ actions: newActions });
  };

  return (
    <Box>
      <Title mb="24px">{t('Options')}</Title>
      <Box>
        {actionsOptions?.map(({ id, value }) => {
          return (
            <ActionOptionBox key={id}>
              <StyledFormControl height="48px" padding="3px 32px 3px 18px" fullWidth>
                <ActionTextField
                  name={id}
                  fullWidth
                  value={value}
                  onChange={handleOnChange}
                  onBlur={(e) => handleOnBlur(e, value)}
                />
              </StyledFormControl>
              <RemoveActionBox>
                <IconButton className={REMOVE_BUTTON_CLASSNAME} size="small" onClick={() => removeConditionHandler(id)}>
                  <Close stroke="#787f88" height="10px" width="10px" />
                </IconButton>
              </RemoveActionBox>
            </ActionOptionBox>
          );
        })}
        <AddActionButton
          color="inherit"
          type="button"
          startIcon={<Plus size={16} fill={isAddActionDisabled ? THEME.greyColors.grey8 : THEME.greyColors.grey1} />}
          onClick={addConditionHandler}
          disabled={isAddActionDisabled}
        >
          {t('Add new')}
        </AddActionButton>
      </Box>
    </Box>
  );
};

export default UserDecision;
