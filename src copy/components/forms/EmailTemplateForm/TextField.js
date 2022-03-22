import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, capitalize } from '@material-ui/core';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';
import TextFieldSkeleton from './TextFieldSkeleton';
import PropertyTextEditor from '../../PropertyTextEditor';
import { useFlowPropertiesList } from '../../FlowEditor/components/AutomationDetails/AutomationStep/fields/hooks';
import { flattenEditorPropertiesGroup } from '../../../utils/helpers';

const TextField = ({ name }) => {
  const { t } = useTranslation();
  const [fieldInputProps, , { setValue }] = useField(name);
  const { getAvailableProperties, loading } = useFlowPropertiesList();

  const attachmentsFlatten = useMemo(() => {
    const attachable = flattenEditorPropertiesGroup(getAvailableProperties)?.filter((el) => el?.type === 'FILE') ?? [];
    if (attachable?.length === 0) {
      return [{ id: 0, key: '#', value: 'No available properties', disabled: true, group: 'No available properties' }];
    }
    return attachable;
  }, [getAvailableProperties]);

  const handleSetToFormik = (value) => {
    setValue(value);
  };

  if (loading) {
    return (
      <Box borderRadius="8px" height="60px" overflow="hidden">
        <TextFieldSkeleton />
      </Box>
    );
  }

  return (
    <Box bgcolor="#fff" borderRadius="8px" display="flex" alignItems="center" pt="6px" pl="16px" minHeight="60px">
      <Box component="p">{t(capitalize(name))}:</Box>
      <Box flex="1" maxHeight="60px">
        <PropertyTextEditor
          showToolbar={false}
          initialEditorText={fieldInputProps.value}
          border="none"
          properties={name === 'attachments' ? attachmentsFlatten : getAvailableProperties}
          minHeight="100%"
          propertyButtonYaxis="25%"
          bgcolor="#fff"
          maxHeight="60px"
          handleSavePlainText={handleSetToFormik}
        />
      </Box>
    </Box>
  );
};

TextField.propTypes = {
  name: PropTypes.string.isRequired,
};

export default TextField;
