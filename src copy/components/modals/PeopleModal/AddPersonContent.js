import React from 'react';
import { func } from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import AddPersonForm from '../../forms/PersonForm/AddPersonForm';
import { P16B } from '../../atoms';
import { HeaderWrapper } from './styled';
import { StyledIconButton } from '../../atoms/Buttons/StyledIconButton';
import { StretchBlock } from '../../atoms/flex/StretchBlock';

const AddPersonContent = ({ setShowModal, t, userRefetch }) => (
  <StretchBlock alignItems="flex-start" flexDirection="column" minHeight="calc(100vh - 90px)">
    <HeaderWrapper>
      <P16B>{t('people.addPersonTitle')}</P16B>
      <span>
        <span className="modal-body__close">
          <StyledIconButton onClick={setShowModal}>
            <CloseIcon />
          </StyledIconButton>
        </span>
      </span>
    </HeaderWrapper>
    <AddPersonForm setShowModal={setShowModal} userRefetch={userRefetch} />
  </StretchBlock>
);

AddPersonContent.propTypes = {
  setShowModal: func.isRequired,
  t: func.isRequired,
  userRefetch: func.isRequired,
};

export default AddPersonContent;
