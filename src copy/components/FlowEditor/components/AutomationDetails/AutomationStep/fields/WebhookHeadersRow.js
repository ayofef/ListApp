import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Close from '@material-ui/icons/Close';
import { useFlowPropertiesList } from './hooks';
import PropertyTextEditor from '../../../../../PropertyTextEditor';
import { InputField } from '../../../../../atoms';
import Title from '../../Title';
import ListLoadingState from './ListLoadingState';

const WebhookHeadersRow = ({ headerKey, headerLabel, onChange, onDelete }) => {
  const { loading, getAvailableProperties } = useFlowPropertiesList();
  const { t } = useTranslation();

  const onChangeKey = ({ target }) => {
    onChange({ key: target.value, label: headerLabel });
  };

  const onChangeValue = (newValue) => {
    onChange({ key: headerKey, label: newValue });
  };

  if (loading) {
    return <ListLoadingState />;
  }

  return (
    <Box display="flex" mb="24px" flexWrap="wrap">
      <Box mr={1} mt={1} width="100%">
        <Title fontSize="12px" mt="0">
          {t('Header key')}
        </Title>
        <InputField defaultValue={headerKey} onBlur={onChangeKey} variant="outlined" />
      </Box>

      <Box width="100%">
        <Title fontSize="12px" mt="0">
          {t(' Header value')}
        </Title>
        <Box display="flex" width="100%" mr={2} mt={1} alignItems="center">
          <PropertyTextEditor
            showToolbar={false}
            initialEditorText={headerLabel}
            border="none"
            handleSavePlainText={onChangeValue}
            properties={getAvailableProperties}
            minHeight="0"
            maxHeight="44px"
            padding="10px 16px !important"
            singleProperty
            propertyButtonYaxis="4px"
          />

          <Box ml={2} alignItems="center" display="flex">
            <IconButton size="small" onClick={onDelete}>
              <Close />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

WebhookHeadersRow.propTypes = {
  headerKey: PropTypes.string.isRequired,
  headerLabel: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default WebhookHeadersRow;
