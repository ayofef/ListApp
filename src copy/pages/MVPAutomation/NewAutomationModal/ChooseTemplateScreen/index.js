import React from 'react';
import { StyledDialogContent, StyledDialogTitle } from '../../../../components/Dialog/styled';
import SideBar from '../../Directory/DirectoryList/SideBar';
import ContentArea from '../../Directory/DirectoryList/ContentArea';
import { StyledDirectoryWrapper } from './styled';

const ID = 'choose-template';

const ChooseTemplateScreen = () => {
  return (
    <>
      <StyledDialogTitle id={`${ID}-title`} disableTypography>
        Automations
      </StyledDialogTitle>
      <StyledDialogContent>
        <StyledDirectoryWrapper>
          <SideBar inModal />
          <ContentArea inModal />
        </StyledDirectoryWrapper>
      </StyledDialogContent>
    </>
  );
};
export default ChooseTemplateScreen;
