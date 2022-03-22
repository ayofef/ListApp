import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';

import SideBar from './SideBar';
import ContentArea from './ContentArea';

import { StyledWrapper } from './styled';
import { P16B } from '../../../../components/atoms';

const DirectoryList = () => {
  const { t } = useTranslation();
  return (
    <Box mt="40px" mb="60px" display="flex">
      <StyledWrapper>
        <P16B>{t('All Automations')}</P16B>
        <SideBar />
      </StyledWrapper>
      <ContentArea />
    </Box>
  );
};

export default DirectoryList;
