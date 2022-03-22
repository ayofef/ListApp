import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types';
import { StyledFormControl } from './styled';
import { useValidationMessage } from './hooks';
import Title from '../../Title';
import Select, { NONE } from '../../../../../forms/_common/Select';
import WebhookBasicAuth from './WebhookBasicAuth';
import { useElementDataToSave } from './hooks/useElementDataToSave';

const DelayActionWebhookField = ({ titleSize }) => {
  const { t } = useTranslation();
  const [{ methods, selectedMethod }, updateDataToSave] = useElementDataToSave();

  const options = useMemo(
    () =>
      methods?.map((type) => ({
        value: type,
        title: type,
      })),
    [methods]
  );

  const onChange = ({ target }) => updateDataToSave({ selectedMethod: target.value });

  const validationMessage = useValidationMessage('method');
  const isValid = Boolean(validationMessage);

  return (
    <Box>
      <Title fontSize={titleSize}>{t('HTTP Method')}</Title>
      <StyledFormControl fullWidth error={isValid}>
        <Select name="method" value={selectedMethod ?? NONE} options={options} onChange={onChange} />
        <FormHelperText>{validationMessage}</FormHelperText>
      </StyledFormControl>
      <WebhookBasicAuth />
    </Box>
  );
};

DelayActionWebhookField.propTypes = {
  titleSize: PropTypes.string,
};

DelayActionWebhookField.defaultProps = {
  titleSize: '16px',
};

export default DelayActionWebhookField;
