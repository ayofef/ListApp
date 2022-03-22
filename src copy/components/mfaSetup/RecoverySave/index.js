import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useCopyToClipboard } from 'react-use';
import { NotificationManager } from 'react-notifications';
import { Button, InputField, P16, P12, Checkbox } from '../../atoms';
import THEME from '../../../constants/theme';
import { STORAGE_KEYS } from '../../../constants/storage';
import { useNotificationManager } from '../../../hooks/useNotificationManager';
import { localStorageService } from '../../../utils/localStorageService';
import SubmitButton from '../../forms/_common/SubmitButton';
import { useGlobalContext } from '../../../containers/App/context';
import { FlexContainer } from '../../atoms/flex/FlexContainer';

const DESC =
  'Copy this recovery code and keep it somewhere safe. You’ll need it if you ever need to log in without your device.';
const TOAST_TITLE = 'Recovery code';
const COPIED = 'Copied Recovery Code to clipboard';
const TOAST_TIMEOUT = 5000;

const AppAuth = () => {
  const { t } = useTranslation();
  const [clipboardState, copyToClipboard] = useCopyToClipboard();
  const [saved, setSaved] = useState(false);
  const pass = localStorageService.getItem(STORAGE_KEYS.recoveryPass);
  const { getMeRefetch } = useGlobalContext();
  useNotificationManager('error', clipboardState?.error, TOAST_TITLE, TOAST_TIMEOUT);

  const handleSaved = () => {
    setSaved(!saved);
  };

  const handleSubmit = () => {
    localStorageService.removeItem(STORAGE_KEYS.recoveryPass);
    localStorageService.removeItem(STORAGE_KEYS.barcodeUri);
    getMeRefetch();
  };

  const handleCopy = () => {
    copyToClipboard(pass);
    NotificationManager.success(t(COPIED), TOAST_TITLE, TOAST_TIMEOUT);
  };

  return (
    <FlexContainer alignItems="start" flexDirection="column">
      <P16 margin="0 0 31px" color={THEME.greyColors.grey1}>
        {t(DESC)}
      </P16>
      <P12 fontWeight="700">{t('Recovery code')}</P12>
      <InputField
        variant="outlined"
        type="text"
        size="smaller"
        value={pass}
        onClick={handleCopy}
        onChange={() => null}
        disabled
      />
      <Box m="12px 0 22px 0">
        <Button onClick={handleSaved} transparent link>
          <Checkbox checked={saved} />
          <P16 margin="0 auto 0 14px">{t('I have safely recorded this code')}</P16>
        </Button>
      </Box>
      <SubmitButton disabled={!saved} className="gradient" onClick={handleSubmit}>
        {t('Finish')}
      </SubmitButton>
    </FlexContainer>
  );
};

export default AppAuth;
