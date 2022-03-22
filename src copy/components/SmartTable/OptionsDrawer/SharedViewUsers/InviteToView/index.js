import PropTypes from 'prop-types';
import React, { useCallback, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation } from '@apollo/client';
import { Form, Formik } from 'formik';
import Box from '@material-ui/core/Box';
import isEmpty from 'lodash/isEmpty';
import { useHistory } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import {
  StyledDialog,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
  StyledPaper,
} from '../../../../Dialog/styled';
import { P14B, SearchBar, ButtonRounded } from '../../../../atoms';

import FormControl from '../../../../forms/_common/FormControl';
import { PEOPLE_PAGE } from '../../../../../utils/queries/billing';
import { useGlobalContext } from '../../../../../containers/App/context';
import { UI_ROUTES } from '../../../../../constants/routes';
import TeamMember from './TeamMember';
import { useNotificationManager } from '../../../../../hooks/useNotificationManager';
import { INVITE } from './mutation';
import { GQL_Q_LIST_PAYMENT_VIEW } from '../../../../../utils/queries/payments/paymentsQueries';
import { validationSchema, initialValues } from './formSetting';
import Skeleton from './Skeleton';
import CloseButton from '../../../../Dialog/CloseButton';

const ID = 'invite-to-view';
const TOAST_TITLE = 'Invite to view';
const TOAST_SUCCESS_MESSAGE = (length) => `Successfully invited team member${length > 1 ? 's' : ''} to view`;

const EMPTY_TEXT_MAP = {
  empty: 'No team member in workspace..',
  searchEmpty: (search) => `${search} not found in workspace..`,
};

const mutateOptions = {
  refetchQueries: [{ query: GQL_Q_LIST_PAYMENT_VIEW }],
  awaitRefetchQueries: true,
};

const InviteToView = ({ isOpen, toggleIsOpen, viewId, sharedWith }) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const { data, loading, error } = useQuery(PEOPLE_PAGE);
  const [inviteToView] = useMutation(INVITE, mutateOptions);

  const { getMeData, setGlobalLoading } = useGlobalContext();
  const { push } = useHistory();
  useNotificationManager(error, error?.message, TOAST_TITLE, 5000);

  const teamList = useMemo(
    () =>
      data?.listUsers
        ?.filter((user) => user?.id !== `customer:${getMeData?.me?.id}`) //remove current user
        ?.filter((item) => {
          return item?.name?.toLowerCase()?.indexOf(search?.toLowerCase()) > -1;
        }) // search filter
        ?.sort((a, b) => a?.name?.localeCompare(b?.name)) ?? [], // sort alphabetically
    [data, getMeData, search]
  );

  const handleInviteToWorkspace = useCallback(() => {
    push(UI_ROUTES.userManagement);
  }, [push]);

  const handleSubmit = useCallback(
    (values) => {
      setGlobalLoading(ID, true);
      const variables = { viewId, userIds: values?.ids };
      return inviteToView({ variables })
        .then(({ errors, data: _data }) => {
          if (!isEmpty(errors) || !_data?.inviteUsersToPaymentView) {
            NotificationManager.error(t(errors?.[0]?.message), t(TOAST_TITLE), 5000);
            return;
          }
          NotificationManager.success(t(TOAST_SUCCESS_MESSAGE(variables.userIds?.length)), t(TOAST_TITLE), 5000);
          toggleIsOpen();
        })
        .finally(() => setGlobalLoading(ID, false));
    },
    [toggleIsOpen, inviteToView, viewId, t, setGlobalLoading]
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnMount
      enableReinitialize
    >
      <Form>
        <StyledDialog
          open={isOpen}
          scroll="paper"
          maxWidth="sm"
          PaperComponent={StyledPaper}
          onClose={toggleIsOpen}
          aria-labelledby={ID}
        >
          <CloseButton onClick={toggleIsOpen} />

          <StyledDialogTitle id={`${ID}-title`} disableTypography>
            {t('Invite to the view')}
          </StyledDialogTitle>
          <StyledDialogContent>
            <Box minWidth="380px" pb="24px" color="#787F88">
              <Box mt="24px" maxWidth="250px">
                <P14B margin="0 0 14px 0"> {t('Search team members')}</P14B>
                <SearchBar
                  placeholder="Enter name"
                  search={search}
                  setSearch={setSearch}
                  bgcolor="#F5F6F7"
                  borderRadius="8px"
                  paddingX="16px"
                />
              </Box>
              <Box mt="32px" mb="32px">
                {loading && <Skeleton />}
                {!loading && isEmpty(teamList) && (
                  <Box>
                    <Box>{t(search ? EMPTY_TEXT_MAP.searchEmpty(search) : EMPTY_TEXT_MAP.empty)}</Box>
                  </Box>
                )}
                {!loading &&
                  !isEmpty(teamList) &&
                  teamList?.map((user) => <TeamMember key={user?.id} user={user} sharedWith={sharedWith} />)}
              </Box>
            </Box>
          </StyledDialogContent>

          <StyledDialogActions>
            {isEmpty(teamList) ? (
              <ButtonRounded
                transform="none"
                onClick={handleInviteToWorkspace}
                color="primary"
                type="button"
                variant="contained"
              >
                {t('Invite to workspace')}
              </ButtonRounded>
            ) : (
              <FormControl primaryText="Invite" toggleIsOpen={toggleIsOpen} />
            )}
          </StyledDialogActions>
        </StyledDialog>
      </Form>
    </Formik>
  );
};

InviteToView.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleIsOpen: PropTypes.func.isRequired,
  viewId: PropTypes.string.isRequired,
  sharedWith: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default InviteToView;
