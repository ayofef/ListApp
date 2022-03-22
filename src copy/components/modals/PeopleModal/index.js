import React from 'react';
import { func, bool, string, shape } from 'prop-types';
import { useTranslation } from 'react-i18next';
import EditPersonContent from './EditPersonContent';
import AddPersonContent from './AddPersonContent';
import { useGlobalContext } from '../../../containers/App/context';
import { WrapModal } from '../../atoms';
import { ModalFromRightWrap, Wrap } from './styled';

const PeopleModal = ({ open, setShowModal, modalType, userContent, userRefetch, updateUser }) => {
  const { t } = useTranslation();
  const { IS_TABLET } = useGlobalContext();

  const getType = {
    add: <AddPersonContent setShowModal={setShowModal} t={t} userRefetch={userRefetch} />,
    edit: <EditPersonContent setShowModal={setShowModal} t={t} userContent={userContent} updateUser={updateUser} />,
  };
  return (
    <Wrap direction="left" in={open}>
      <div>
        <WrapModal onClick={setShowModal} />
        <ModalFromRightWrap maxWidth={IS_TABLET ? '320px' : '480px'}>{open && getType[modalType]}</ModalFromRightWrap>
      </div>
    </Wrap>
  );
};

PeopleModal.propTypes = {
  open: bool.isRequired,
  setShowModal: func.isRequired,
  modalType: string.isRequired,
  userContent: shape({}),
  userRefetch: func.isRequired,
  updateUser: func.isRequired,
};

PeopleModal.defaultProps = {
  userContent: {},
};

export default PeopleModal;
