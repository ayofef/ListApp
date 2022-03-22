import { useCallback } from 'react';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';

import useMutationSetTokens from '../useMutationSetTokens';
import { ERROR_CODES, MUTATION_NAMES } from '../../constants/api';
import { COMPLETE_INVITATION } from '../../utils/queries/public/publicMutations';

import { useNotificationManager } from '../useNotificationManager';
import { TOAST_TIMEOUT, TOAST_UNEXPECTED_ERROR_MESSAGE } from '../../constants/toasts';
import { useGoogleOAuth } from '../useGoogleOAuth';
import { UI_ROUTES } from '../../constants/routes';

const TITLE = 'Invitation';

const ERROR_MESSAGE_MAP = {
  [ERROR_CODES.invitationExpired]: 'This invitation has expired!',
  [ERROR_CODES.invitationNotFound]: 'This invitation has not found!',
};

const useCompleteInvitation = () => {
  const { push } = useHistory();
  const { t } = useTranslation();

  const { authenticationState, error: oauthError } = useGoogleOAuth();
  const [completeInvitationPromise, { loading, error: invitationError }] = useMutationSetTokens(
    COMPLETE_INVITATION,
    MUTATION_NAMES.completeInvitation,
    {
      context: { skipGlobalHandling: true },
    }
  );

  //Handles error
  const invitationErrorMessage =
    ERROR_MESSAGE_MAP[invitationError?.message] ?? invitationError?.message ?? invitationError;
  const error = oauthError || invitationErrorMessage;
  useNotificationManager('error', t(error), t(TITLE), TOAST_TIMEOUT);

  //Handles Invitation Request
  const handleCompleteInvitation = useCallback(
    async (variables) => {
      try {
        const res = await completeInvitationPromise({ variables });
        const failed = !isEmpty(res?.errors) || !res?.data?.completeInvitation?.isLoggedIn;

        if (failed) {
          return;
        }

        push(UI_ROUTES.mfaSetup);
      } catch (e) {
        NotificationManager.error(t(TOAST_UNEXPECTED_ERROR_MESSAGE), t(TITLE), TOAST_TIMEOUT);
      }
    },
    [t, completeInvitationPromise, push]
  );

  return {
    completeInvitation: handleCompleteInvitation,
    loading,
    authenticationState,
  };
};

export { useCompleteInvitation };
