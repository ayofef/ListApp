import Box from '@material-ui/core/Box';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomSwitch } from '../../../../../atoms';
import SubTitle from '../../SubTitle';
import Title from '../../Title';
import { useAuthCredentials } from '../hooks/useAuthCredentials';
import { useValidationMessage } from './hooks';
import { useElementDataToSave } from './hooks/useElementDataToSave';
import { StyledBox, StyledFormControl } from './styled';

const WebhookBasicAuth = () => {
  const { t } = useTranslation();
  const validationUsernameMessage = useValidationMessage('username');
  const validationPasswordMessage = useValidationMessage('password');
  const [{ useBasicAuthentication, authenticationType }, updateDataToSave] = useElementDataToSave();
  const { username, password } = useAuthCredentials();
  const [isUseAuth, setIsUseAuth] = useState(true);

  useEffect(() => {
    if (!authenticationType) {
      updateDataToSave({ authenticationType: useBasicAuthentication ? 'BASIC' : 'NONE' });
    }
    if (useBasicAuthentication === false || authenticationType === 'NONE') {
      setIsUseAuth(false);
    }
  }, [useBasicAuthentication, authenticationType, updateDataToSave]);

  const onSwitch = (isAuth) => {
    setIsUseAuth(isAuth);
    if (typeof useBasicAuthentication !== 'undefined') {
      updateDataToSave({ useBasicAuthentication: isAuth });
    } else {
      updateDataToSave({ authenticationType: isAuth ? 'BASIC' : 'NONE' });
    }
  };

  const onChange = (type, { target }) => {
    updateDataToSave({ [type]: target.value });
  };

  return (
    <Box>
      <StyledBox>
        <Box>
          <Title mt="40px">{t('Authentication')}</Title>
          <SubTitle>{t('Set up authentication (Optional)')}</SubTitle>
        </Box>
        <StyledBox>
          <CustomSwitch checked={isUseAuth} onClick={() => onSwitch(!isUseAuth)} />
        </StyledBox>
      </StyledBox>
      {isUseAuth && (
        <Box marginBottom="24px">
          <Title fontSize="12px" mt="0">
            {t('Username')}
          </Title>
          <StyledFormControl error={Boolean(validationUsernameMessage)} fullWidth>
            <TextField value={username ?? ''} onChange={(e) => onChange('username', e)} placeholder="Enter username" />
            <FormHelperText>{validationUsernameMessage}</FormHelperText>
          </StyledFormControl>
          <Title fontSize="12px">{t('Password')}</Title>
          <StyledFormControl error={Boolean(validationPasswordMessage)} fullWidth>
            <TextField value={password ?? ''} onChange={(e) => onChange('password', e)} placeholder="Enter password" />
            <FormHelperText>{validationPasswordMessage}</FormHelperText>
          </StyledFormControl>
        </Box>
      )}
    </Box>
  );
};

export default WebhookBasicAuth;
