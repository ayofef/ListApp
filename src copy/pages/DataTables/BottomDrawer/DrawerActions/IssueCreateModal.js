import React from 'react';

import { string, arrayOf, bool, func } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { NotificationManager } from 'react-notifications';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import isEmpty from 'lodash/isEmpty';

import CreateIssueForm from './CreateIssueForm';
import { useCreateIssue } from '../../../Payments/Issues/issuesHooks';
import { ISSUES_EXCEPTION_DICTIONARY } from '../../../Payments/Issues/constants';
import { useGlobalContext } from '../../../../containers/App/context';
import {
  StyledDialog,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
  StyledPaper,
} from '../../../../components/Dialog/styled';
import { isDefined } from '../../../../utils/helpers';
import { findErrorByCode } from '../../../../utils/graphql';
import CloseButton from '../../../../components/Dialog/CloseButton';

const ID = 'issues-create-modal';
const TOAST_TIMEOUT = 5000;

const IssueCreateModal = ({ modalShown, closeModal, selected }) => {
  const { t } = useTranslation();
  const { createIssue, loading } = useCreateIssue();
  const { getMeData } = useGlobalContext();
  const {
    push,
    location: { pathname },
  } = useHistory();

  const handleIssuesCreationError = (errors) => {
    const issueAlreadyExistsError = findErrorByCode(errors, ISSUES_EXCEPTION_DICTIONARY.issueAlreadyExists);
    if (isDefined(issueAlreadyExistsError)) {
      NotificationManager.error(issueAlreadyExistsError.message, t('uiMessages.error'), TOAST_TIMEOUT);
    } else {
      NotificationManager.error('Issues creation error', t('uiMessages.error'), TOAST_TIMEOUT);
    }
  };

  const id = getMeData?.me?.id;
  const handleCreateIssue = (data) => {
    createIssue({
      variables: {
        paymentIds: selected,
        paymentIssue: {
          assigneeUserId: id,
          userId: id,
          type: data.issuer.toUpperCase(),
          comments: [
            {
              message: data.comment,
            },
          ],
        },
      },
      context: {
        skipGlobalHandling: true,
      },
    })
      .then((res) => {
        if (isEmpty(res.errors) && !isEmpty(res.data?.addPaymentIssues)) {
          NotificationManager.success('Issues have been created', t('uiMessages.great'), TOAST_TIMEOUT);
          closeModal();

          const issueId = res.data.addPaymentIssues[0].id;
          if (pathname.indexOf('/details/') > -1 && isDefined(issueId)) {
            push(`${pathname}/payment-issues/${issueId}`);
          }
        } else {
          handleIssuesCreationError(res.errors);
        }
      })
      .catch(() => {
        handleIssuesCreationError();
      });
  };

  return (
    <StyledDialog
      open={modalShown}
      scroll="paper"
      maxWidth="sm"
      PaperComponent={StyledPaper}
      onClose={closeModal}
      aria-labelledby={ID}
    >
      <CloseButton onClick={closeModal} />
      <StyledDialogTitle id={`${ID}-title`} disableTypography>
        {t('payments.issues.modal.title')}
      </StyledDialogTitle>
      <StyledDialogContent>
        <Box minWidth="400px">
          <CreateIssueForm submitForm={handleCreateIssue} loading={loading} closeModal={closeModal} />
        </Box>
      </StyledDialogContent>
      <StyledDialogActions />
    </StyledDialog>
  );
};

IssueCreateModal.propTypes = {
  selected: arrayOf(string).isRequired,
  modalShown: bool.isRequired,
  closeModal: func.isRequired,
};

export default IssueCreateModal;
