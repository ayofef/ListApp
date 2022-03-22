import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types';
import { StyledFormControl } from './styled';
import { useValidationMessage } from './hooks';
import Title from '../../Title';
import Select, { NONE } from '../../../../../forms/_common/Select';
import MultilineTemplateField from './MultilineTemplateField';
import WebhookBasicAuth from './WebhookBasicAuth';
import { useElementDataToSave } from './hooks/useElementDataToSave';

const options = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map((m) => ({ title: m, value: m }));

const BODY_SUPPORTED_HTTP_METHODS = {
  POST: true,
  PUT: true,
  PATCH: true,
};

const PAYLOAD_TYPE_OPTIONS = [{ title: 'JSON', value: 'APPLICATION_JSON' }];

const WebhookActionField = ({ titleSize }) => {
  const { t } = useTranslation();
  const [{ method }, updateDataToSave] = useElementDataToSave();
  const onChange = ({ target }) => updateDataToSave({ method: target.value });

  const validationMessage = useValidationMessage('webhook');
  const isValid = Boolean(validationMessage);
  const showBodyFields = Boolean(BODY_SUPPORTED_HTTP_METHODS[method]);

  return (
    <Box>
      <Title fontSize={titleSize}>{t('HTTP Method')}</Title>
      <StyledFormControl fullWidth error={isValid}>
        <Select name="method" value={method ?? NONE} options={options} onChange={onChange} />
        <FormHelperText>{validationMessage}</FormHelperText>
      </StyledFormControl>
      {showBodyFields && (
        <>
          <Title>{t('Payload Type')}</Title>
          <StyledFormControl fullWidth error={isValid}>
            <Select name="payloadType" value="APPLICATION_JSON" options={PAYLOAD_TYPE_OPTIONS} disabled={true} />
            <FormHelperText>{validationMessage}</FormHelperText>
          </StyledFormControl>
          <MultilineTemplateField label={t('Payload')} property="payload" />
        </>
      )}
      <WebhookBasicAuth />
    </Box>
  );
};

WebhookActionField.propTypes = {
  titleSize: PropTypes.string,
};

WebhookActionField.defaultProps = {
  titleSize: '16px',
};

export default WebhookActionField;
