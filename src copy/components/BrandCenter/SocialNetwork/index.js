import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NotificationManager } from 'react-notifications';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import { useTranslation } from 'react-i18next';
import { v4 as uniqueId } from 'uuid';
import { useGlobalContext } from '../../../containers/App/context';

import { P14, P16B, CircularLoader } from '../../atoms';
import InputIcon from './InputIcon';

import { StyledButton } from './styled';

const SocialNetworks = ({ socialNetwork, handleSocialEdit }) => {
  const socialData = socialNetwork;
  const [madeFirstRequest, setMadeFirstRequest] = useState(false);
  const { globalLoading } = useGlobalContext();

  const { t } = useTranslation();

  const addNewField = () => {
    if (!globalLoading && socialData?.length <= 4) {
      handleSocialEdit([...socialData, { id: uniqueId(), iconUrl: '#', linkUrl: '' }]);
    } else if (!globalLoading) {
      NotificationManager.info(t('Maximum of 5 Social network links'), 'Flow List', 5000);
    }
  };

  useEffect(() => {
    if (socialData.length) {
      return;
    }

    if (!socialData.length && !madeFirstRequest) {
      handleSocialEdit([{ id: uniqueId(), iconUrl: '#', linkUrl: '' }]);
      setMadeFirstRequest(true);
    }
  }, [socialData, handleSocialEdit, madeFirstRequest]);

  const handleSocialUpdate = (id, value, key) => {
    if (key === 'both') {
      const data = [...socialData];
      const IndexOfInput = data.findIndex((el) => el.id === id);

      data[IndexOfInput] = { ...data[IndexOfInput], iconUrl: value[0], linkUrl: value[1] };

      handleSocialEdit([...data]);
    } else {
      const data = [...socialData];
      const IndexOfInput = data.findIndex((el) => el.id === id);

      data[IndexOfInput] = { ...data[IndexOfInput], [key]: value };

      handleSocialEdit([...data]);
    }
  };

  const handleRemove = (id) => {
    const isEmpty = socialData[0].iconUrl === '#' && socialData[0].linkUrl === null;
    if (socialData?.length === 1 && !isEmpty) {
      handleSocialEdit([{ id: uniqueId(), iconUrl: '#', linkUrl: '' }]);
    } else if (!isEmpty) {
      const removedData = socialData.filter((el) => el.id !== id);
      handleSocialEdit(removedData);
    }
  };

  return (
    <Box>
      <P16B margin="0 0 16px 0">{t('Links')}</P16B>
      <Box>
        {socialData !== null &&
          socialData?.map((el) => (
            <InputIcon
              key={el?.id}
              icon={el?.iconUrl}
              link={el?.linkUrl}
              handleRemove={handleRemove}
              handleSocialUpdate={handleSocialUpdate}
              id={el?.id}
            />
          ))}
      </Box>
      <StyledButton onClick={addNewField} disabled={globalLoading}>
        {globalLoading ? <CircularLoader bgcolor="#787F88" size={17} /> : <AddIcon color="inherit" fontSize="small" />}
        <P14 cursor="pointer" color="inherit" margin="0 0 0 10px">
          {t(' Add new link')}
        </P14>
        <Box bgcolor="#0000000a"> </Box>
      </StyledButton>
    </Box>
  );
};

SocialNetworks.propTypes = {
  handleSocialEdit: PropTypes.func.isRequired,
  socialNetwork: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      linkUrl: PropTypes.string,
      iconUrl: PropTypes.string,
    })
  ),
};
SocialNetworks.defaultProps = {
  socialNetwork: [],
};

export default SocialNetworks;
