import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';

import { P16, H4, ButtonRounded } from '../../atoms';
import GoToBrandCenter from '../../goToBrandCenter';
import CheckBox from './CheckBoxInput';
import { StyledFormGroup } from './styled';

const EmailControls = ({ title, handleAdd, controlForm, setControlForm }) => {
  const { t } = useTranslation();

  const handleChange = (e) => {
    const updatedState = { ...controlForm, [e.target.name]: e.target.checked };
    setControlForm(updatedState);
    handleAdd(e.target.name, e.target.checked);
  };

  return (
    <Box component="aside" ml="56px">
      <P16 margin="0 0 16px 0">Email Options</P16>
      <StyledFormGroup>
        {Object.keys(controlForm).map((key) => (
          <CheckBox key={key} name={key} checked={controlForm[key]} handleChange={handleChange} />
        ))}
      </StyledFormGroup>

      <Box component="section" mt="24px">
        <P16 margin="0 0 16px 0">{t('Current template')}</P16>
        <H4>{t(`${title || ''} Email template`)}</H4>
      </Box>
      <Box component="section" color="#3023C8" display="flex" flexDirection="column" alignItems="flex-start">
        <Box ml="-24px" mt="24px">
          <ButtonRounded variant="text" color="inherit">
            <Box p="0 16px">{t('Change template')}</Box>
          </ButtonRounded>
        </Box>
      </Box>
      <Box marginTop="40px">
        <GoToBrandCenter />
      </Box>
    </Box>
  );
};

EmailControls.propTypes = {
  title: PropTypes.string,
  handleAdd: PropTypes.func.isRequired,
  controlForm: PropTypes.shape({
    bcc: PropTypes.bool,
    cc: PropTypes.bool,
  }).isRequired,
  setControlForm: PropTypes.func.isRequired,
};
EmailControls.defaultProps = {
  title: 'New',
};

export default EmailControls;
