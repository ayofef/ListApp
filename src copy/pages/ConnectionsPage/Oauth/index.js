import React from 'react';
import { useHandleConnectionConnect } from '../../../hooks/connectionsHooks';
import TakeAction from '../../../assets/img/TakeAction.svg';
import IconBoxScreen from '../../../components/common/IconBoxScreen';
import { FlexContainer } from '../../../components/atoms/flex/FlexContainer';

const OauthPage = () => {
  useHandleConnectionConnect({ connection: null });
  return (
    <FlexContainer
      padding="0 32px 16px 32px"
      flexDirection="column"
      alignItems="flex-start"
      flex={1}
      width="100%"
      justifyContent="flex-start"
    >
      <IconBoxScreen
        icon={<img src={TakeAction} alt="" />}
        iconMargin="0"
        description="Taking actions"
        padding="40px 82px"
        margin="120px auto 0"
      />
    </FlexContainer>
  );
};

export default OauthPage;
