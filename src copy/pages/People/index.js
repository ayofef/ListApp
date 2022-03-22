import { useQuery, useMutation } from '@apollo/client';
import React, { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';
import { NotificationManager } from 'react-notifications';
import { useHistory } from 'react-router-dom';
import { useToggle } from 'react-use';
import { BlockWrap } from '../../components/atoms';
import SearchForm from '../../components/forms/SearchForm';
import Table from '../../components/tables/Table';
import { PEOPLE_TABLE } from '../../constants/tables';
import PeopleModal from '../../components/modals/PeopleModal';
import { useGlobalContext } from '../../containers/App/context';
import PeopleHeader from './PeopleHeader';
import { PEOPLE_PAGE } from '../../utils/queries/billing';
import { UPDATE_USER_ROLE, DEACTIVATE_USER, REACTIVATE_USER } from '../../utils/queries/users/usersMutations';
import { SearchLine } from './styled';
import { useHandleConnectionConnect } from '../../hooks/connectionsHooks';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import {
  STATUS_ACTION_MAP,
  STATUS_ACTION_SUCCESS_TITLE_MAP,
  STATUS_ACTION_SUCCESS_MESSAGE_MAP,
  MODAL_TEXT_TITLE_MAP,
  MODAL_TEXT_SUBMIT,
} from './constant';
import { FlexContainer } from '../../components/atoms/flex/FlexContainer';
import ListSkeleton from '../../components/ListSkeleton';

const mutateOptions = {
  refetchQueries: [{ query: PEOPLE_PAGE }],
  awaitRefetchQueries: true,
};

const People = () => {
  const { t } = useTranslation();
  const { getMeData, getMeLoading, setGlobalLoading } = useGlobalContext();
  const history = useHistory();
  const {
    location: { search, pathname, state },
    replace,
  } = history;

  const [modalOpen, toggleModal] = useToggle();
  const [userContent, setUserContent] = useState({});
  const [modalType, setModalType] = useState('add');
  const [searchPeople, setSearch] = useState('');
  const { data, loading, refetch: userRefetch } = useQuery(PEOPLE_PAGE);
  const [updateUser, { data: updateUserData, loading: updateUserLoading }] = useMutation(UPDATE_USER_ROLE);
  const { renderConnectionForm } = useHandleConnectionConnect({
    connection: { id: 'slack:default', name: 'Slack' },
    callback: userRefetch,
    avoidRedirect: true,
  });

  const [statusActionData, setStatusActionData] = useState();
  const [statusAction, setStatusAction] = useState('');
  const [deactivateUser, { loading: deactivateLoading }] = useMutation(DEACTIVATE_USER, mutateOptions);
  const [reactivateUser, { loading: reactivateLoading }] = useMutation(REACTIVATE_USER, mutateOptions);
  const statusActionLoading = statusAction === STATUS_ACTION_MAP.INACTIVE ? reactivateLoading : deactivateLoading;

  const MODAL_TEXT_DESC = {
    deactivate: `You're about to deactivate ${statusActionData?.name}`,
    reactivate: `You're about to reactivate ${statusActionData?.name}`,
  };

  const confirmationModalText = {
    title: MODAL_TEXT_TITLE_MAP[statusAction],
    description: MODAL_TEXT_DESC[statusAction],
    submit: MODAL_TEXT_SUBMIT[statusAction],
    cancel: 'Cancel',
  };

  const handleCloseModal = useCallback(() => setStatusActionData(), []);

  const statusActionsHandler = (status, statusData) => {
    setStatusActionData(statusData);
    setStatusAction(STATUS_ACTION_MAP[status]);
  };

  useEffect(() => {
    if (state) {
      switch (true) {
        case state.inviteModal:
          setModalType('add');
          toggleModal();
          break;
        default:
          break;
      }
    }
  }, [state, toggleModal]);

  useEffect(() => {
    if (loading && data === undefined) {
      setGlobalLoading('people', true);
    } else if (!loading && data) {
      setGlobalLoading('people', false);
    }
  }, [loading, data, setGlobalLoading]);

  useEffect(() => {
    if (search && search !== '?tour=true') {
      NotificationManager.success(t('slackMessages.text1'), t('slackMessages.success'), 5000);
      userRefetch();
      replace(pathname);
    }
  }, [search, replace, pathname, userRefetch, t]);

  useEffect(() => {
    if (!updateUserLoading && updateUserData) {
      userRefetch();
    }
  }, [updateUserData, updateUserLoading, userRefetch]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const searchPeopleHandler = useCallback(
    (arr) => {
      if (!searchPeople) {
        return arr;
      }
      return arr.filter(({ name }) => name.toLowerCase().includes(searchPeople.toLowerCase()));
    },
    [searchPeople]
  );

  const statusActionHandler = useCallback(() => {
    const statusMutation = statusAction === STATUS_ACTION_MAP.INACTIVE ? reactivateUser : deactivateUser;

    statusMutation({ variables: { id: statusActionData?.id?.replace('customer:', '') } }).then(({ errors }) => {
      if (!isEmpty(errors)) {
        NotificationManager.error(t(errors[0]?.message), t(STATUS_ACTION_SUCCESS_MESSAGE_MAP[statusAction]), 5000);
        return;
      }

      NotificationManager.success(
        t(STATUS_ACTION_SUCCESS_TITLE_MAP[statusAction]),
        t(STATUS_ACTION_SUCCESS_MESSAGE_MAP[statusAction]),
        500
      );

      handleCloseModal();
    });
  }, [t, statusAction, deactivateUser, reactivateUser, statusActionData, handleCloseModal]);

  const editPeopleHandler = (selectedId) => {
    setModalType('edit');
    toggleModal();
    setUserContent(data.listUsers.find(({ id }) => id === selectedId));
  };

  const showSkeleton = loading || getMeLoading || isEmpty(data) || isEmpty(getMeData);

  return (
    <FlexContainer flex={1} width="100%" alignItems="flex-start" justifyContent="flex-start" flexDirection="column">
      <PeopleModal
        open={modalOpen}
        setShowModal={toggleModal}
        userRefetch={userRefetch}
        modalType={modalType}
        userContent={userContent}
        updateUser={updateUser}
      />
      <PeopleHeader
        title={t('User Management')}
        buttonText={t('buttonsText.Invite')}
        handleClick={() => {
          toggleModal();
          setModalType('add');
        }}
      />
      <SearchLine>
        <SearchForm
          width="100%"
          placeholder={t('people.searchPlaceholder')}
          onChange={handleChange}
          color="black"
          iconWidth="20px"
        />
      </SearchLine>

      {showSkeleton ? (
        <BlockWrap width="100%" margin="16px 0 0 0">
          <ListSkeleton rowNumber={4} height={56} p={0.5} />
        </BlockWrap>
      ) : (
        <BlockWrap width="100%">
          <Table
            headCells={PEOPLE_TABLE}
            rows={searchPeopleHandler(data && data.listUsers)}
            displayAllRows
            rowType=""
            buttonActions={{
              changeRole: editPeopleHandler,
              statusActions: statusActionsHandler,
              meData: getMeData.me.id,
            }}
            defaultSort="name"
          />
          <ConfirmationModal
            loading={statusActionLoading}
            open={!isEmpty(statusActionData)}
            onConfirm={statusActionHandler}
            onClose={handleCloseModal}
            onCancel={handleCloseModal}
            text={confirmationModalText}
          />
        </BlockWrap>
      )}
      {renderConnectionForm()}
    </FlexContainer>
  );
};

export default People;
