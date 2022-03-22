import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { TextField } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types';
import Title from '../../Title';
import { StyledFormControl } from './styled';
import { useValidationMessage } from './hooks';
import { URL_REGEX } from './constants';
import WebhookCopyToClipboard from './WebhookCopyToClipboard';
import { useElementDataToSave } from './hooks/useElementDataToSave';

const URL_ERR_MSG = 'Destination URL is not valid.';
const URL_PLACEHOLDER = 'https://';

const GeneratedWebhookUrlField = ({ stepType, titleSize }) => {
  const { t } = useTranslation();
  const [urlInvalid, setUrlInvalid] = useState(false);
  const validationMessage = useValidationMessage('url');
  const [elementDataToSave, updateDataToSave] = useElementDataToSave();
  const isActionType = stepType === 'ACTION';

  const fieldValueName = isActionType ? 'url' : 'webhookUrl';

  const onChange = useCallback(
    ({ target }) => {
      updateDataToSave({ [fieldValueName]: target.value });
      if (isActionType) {
        const isValid = URL_REGEX.test(target.value);
        setUrlInvalid(!isValid);
      }
    },
    [fieldValueName, updateDataToSave, isActionType]
  );

  return (
    <Box component="section">
      <Title fontSize={titleSize}>{t('Webhook URL')}</Title>

      <StyledFormControl error={Boolean(validationMessage)} fullWidth>
        {isActionType ? (
          <TextField
            value={elementDataToSave[fieldValueName] ?? ''}
            onChange={onChange}
            disabled={!isActionType}
            {...(isActionType && { placeholder: URL_PLACEHOLDER })}
          />
        ) : (
          <WebhookCopyToClipboard value={elementDataToSave[fieldValueName]} desc="Webhook URL" />
        )}

        {!validationMessage && urlInvalid && <FormHelperText error>{URL_ERR_MSG}</FormHelperText>}
        <FormHelperText>{validationMessage}</FormHelperText>
      </StyledFormControl>
    </Box>
  );
};

GeneratedWebhookUrlField.propTypes = {
  stepType: PropTypes.oneOf(['ACTION', 'TRIGGER', 'DELAY_ACTION']),
  titleSize: PropTypes.string,
};

GeneratedWebhookUrlField.defaultProps = {
  stepType: 'ACTION',
  titleSize: '16px',
};

export default GeneratedWebhookUrlField;
