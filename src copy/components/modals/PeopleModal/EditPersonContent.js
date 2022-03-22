import React from 'react';
import { func, shape } from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import EditPersonForm from '../../forms/PersonForm/EditPersonForm';
import { P16B } from '../../atoms';
import { HeaderWrapper } from './styled';
import { StyledIconButton } from '../../atoms/Buttons/StyledIconButton';
import { StretchBlock } from '../../atoms/flex/StretchBlock';

const EditPersonContent = ({ setShowModal, t, userContent, updateUser }) => (
  <StretchBlock alignItems="flex-start" flexDirection="column" minHeight="calc(100vh - 90px)">
    <HeaderWrapper margin="0 0 44px 0 ">
      <P16B>{t('people.changeRole')}</P16B>
      <span>
        <span className="modal-body__close">
          <StyledIconButton onClick={setShowModal}>
            <CloseIcon />
          </StyledIconButton>
        </span>
      </span>
    </HeaderWrapper>
    <Box mb="24px">
      <P16B>{userContent.name}</P16B>
    </Box>
    <EditPersonForm
      setShowModal={setShowModal}
      userId={userContent.id}
      initialValues={{ ...userContent }}
      updateUser={updateUser}
    />
  </StretchBlock>
);

EditPersonContent.propTypes = {
  setShowModal: func.isRequired,
  t: func.isRequired,
  userContent: shape({}).isRequired,
  updateUser: func.isRequired,
};

export default EditPersonContent;
