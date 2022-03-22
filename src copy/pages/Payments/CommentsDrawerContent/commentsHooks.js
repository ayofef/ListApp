import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { NotificationManager } from 'react-notifications';
import { useTranslation } from 'react-i18next';
import { useLoadingIndicator } from '../../../hooks/useLoadingIndicator';
import { globalLoadingConst } from '../../../constants/globalLoadingConsts';
import { ADD_COMMENT, DELETE_COMMENT, EDIT_COMMENT } from '../../../utils/queries/comments/commentsMutations';
import useIsDemo from '../../../hooks/useIsDemo';

const TOAST_TIMEOUT = 5000;

export const useComments = () => {
  const [addComment, { loading: addingLoading }] = useMutation(ADD_COMMENT);
  const [editComment, { loading: editCommentLoading }] = useMutation(EDIT_COMMENT);
  const [deleteComment, { loading: deleteCommentLoading }] = useMutation(DELETE_COMMENT);
  const { t } = useTranslation();
  const loading = addingLoading || editCommentLoading || deleteCommentLoading;
  const isDemo = useIsDemo();
  const updateComment = useCallback(
    (data) => {
      const mutation = data.commentId ? editComment : addComment;
      return mutation({
        variables: data,
      }).then((res) => {
        if (res && !res.errors) {
          NotificationManager.success(
            `Comment have been ${data.commentId ? 'updated' : 'created'}`,
            'Success',
            TOAST_TIMEOUT
          );
        } else if (!isDemo) {
          NotificationManager.error('Server error', t('uiMessages.error'), TOAST_TIMEOUT);
        }
        return res;
      });
    },
    [addComment, editComment, t, isDemo]
  );

  const deleteHandleFunction = useCallback(
    (variables) => {
      return deleteComment({
        variables,
      }).then((res) => {
        if (res && !res.errors) {
          NotificationManager.success(`Comment have been deleted`, 'Success', TOAST_TIMEOUT);
        } else {
          NotificationManager.error('Server error', t('uiMessages.error'), TOAST_TIMEOUT);
        }
        return res;
      });
    },
    [deleteComment, t]
  );

  useLoadingIndicator(globalLoadingConst.createIssue, loading);

  return {
    updateComment,
    deleteComment: deleteHandleFunction,
  };
};
