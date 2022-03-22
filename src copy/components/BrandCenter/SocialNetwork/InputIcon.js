import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import { ClearSharp, LanguageSharp } from '@material-ui/icons';
import { getDomain } from '../../../utils/helpers';
import { useGlobalContext } from '../../../containers/App/context';

import { StyledLabel, StyledIcon, StyledButton } from './styled';
import { SOCIAL_NETWORK_MAP } from '../constants';

const InputIcon = ({ id, icon, link, handleRemove, handleSocialUpdate }) => {
  const [value, setValue] = useState('');
  const { setGlobalLoading } = useGlobalContext();
  useEffect(() => {
    setValue(link);
  }, [link]);

  const parsedValue = value?.includes('https://') ? value : `https://${value ?? ''}`;

  const handleSocialForm = () => {
    const domain = getDomain(value);
    setGlobalLoading('brandCenter', true);
    const iconObj = SOCIAL_NETWORK_MAP?.find((el) => el?.key === domain?.split('.')[0]);

    if (iconObj) {
      handleSocialUpdate(id, [iconObj?.url, parsedValue], 'both');
      return;
    }

    if (icon === '#' && domain?.includes('.')) {
      axios
        .get(`https://favicongrabber.com/api/grab/${domain}`)
        .then((result) => {
          handleSocialUpdate(id, [result.data.icons[0].src, parsedValue], 'both');
        })
        .catch(() => {
          handleSocialUpdate(id, parsedValue, 'linkUrl');
        });

      return;
    }

    handleSocialUpdate(id, parsedValue, 'linkUrl');
  };

  return (
    <Box color="#787F88" display="flex" justifyContent="flex-start" alignItems="center" margin="0 0 16px 0">
      <Box
        bgcolor="#F5F6F7"
        paddingLeft="20px"
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        margin="0 10px 0 0"
        borderRadius="8px"
      >
        <StyledIcon>{icon && icon.length > 1 ? <img src={icon} alt="social media" /> : <LanguageSharp />}</StyledIcon>
        <StyledLabel>
          <input
            type="text"
            value={value || ''}
            onBlur={handleSocialForm}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter Url"
          />
        </StyledLabel>
      </Box>

      <StyledButton onClick={() => handleRemove(id)}>
        <ClearSharp fontSize="small" color="inherit" />
      </StyledButton>
    </Box>
  );
};

InputIcon.propTypes = {
  handleRemove: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  handleSocialUpdate: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  link: PropTypes.string,
};

InputIcon.defaultProps = {
  link: '',
};

export default InputIcon;
