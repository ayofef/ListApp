import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { useField } from 'formik';
import { v4 } from 'uuid';
import Input from '../../../../components/forms/_common/Input';
import { StyledGenerateIDButton } from './styled';

const IdInput = ({ name, ...rest }) => {
  const [, , { setValue }] = useField(name);
  const handleGenerateID = () => {
    setValue(v4());
  };
  const { t } = useTranslation();
  return (
    <Box>
      <Input name={name} {...rest} />
      <StyledGenerateIDButton type="button" onClick={handleGenerateID}>
        {t('Generate id')}
      </StyledGenerateIDButton>
    </Box>
  );
};

IdInput.propTypes = {
  name: PropTypes.string.isRequired,
};

export default IdInput;
