import React, { useEffect, useMemo, useState } from 'react';
import Box from '@material-ui/core/Box';
import findLastIndex from 'lodash/findLastIndex';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import { useCommentsContext } from './CommentsContext';
import { useComments } from './commentsHooks';
import ConfirmationModal from '../../../components/modals/ConfirmationModal';
import { useGlobalContext } from '../../../containers/App/context';
import { usePaymentsDetailsContext } from '../../DataTables/PaymentDetails/PaymentDetailsContext';
import { FlexContainer } from '../../../components/atoms/flex/FlexContainer';

const CommentsDrawerContent = () => {
  const [selectedComment, setSelectedComment] = useState({});

  const [deleteCommentId, setDeleteCommentId] = useState(null);
  const { pageContentRefetch } = usePaymentsDetailsContext();
  const { commentsData: contextData, setNewCommentsCount } = useCommentsContext();

  const { updateComment, deleteComment } = useComments();
  const { getMeData } = useGlobalContext();
  const commentsData = useMemo(() => contextData?.comments || [], [contextData?.comments]);

  const handleSelect = (data) => {
    setSelectedComment(data);
  };
  const handleSubmit = (data) => {
    updateComment({
      paymentId: contextData?.paymentId,
      paymentIssueId: contextData?.issueId,
      commentId: data?.id,
      comment: {
        message: data.message,
      },
    }).then((res) => {
      setSelectedComment({});
      if (!res.errors) {
        pageContentRefetch();
      }
    });
  };

  const handleDelete = () => {
    deleteComment({
      paymentIssueId: contextData?.id,
      commentId: deleteCommentId,
    }).then((res) => {
      if (!res.errors) {
        setDeleteCommentId(null);
        pageContentRefetch();
      }
    });
  };

  const startDeleting = (commentId) => {
    setDeleteCommentId(commentId);
  };
  const myId = getMeData.me.id;

  useEffect(() => {
    if (commentsData) {
      const newCommentsCount =
        commentsData.length - findLastIndex(commentsData, (comment) => comment.userCreator.id === myId) - 1;
      setNewCommentsCount(newCommentsCount);
    }
  }, [commentsData, myId, setNewCommentsCount]);

  const handleCancel = () => {
    setDeleteCommentId(null);
    setSelectedComment({});
  };
  return (
    <FlexContainer flexDirection="column" width="100%" flex={1} overflow="auto">
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        height="100%"
        maxHeight="calc(100% - 150px)"
        overflow="auto"
        padding="0 16px"
      >
        {commentsData.map((item) => (
          <CommentItem
            deleteComment={startDeleting}
            data={item}
            key={item.id}
            handleSubmit={handleSubmit}
            setSelectedComment={handleSelect}
            selectedComment={selectedComment}
          />
        ))}
      </Box>
      <CommentForm handleSubmit={handleSubmit} />
      <ConfirmationModal
        open={Boolean(deleteCommentId)}
        onConfirm={handleDelete}
        onClose={handleCancel}
        onCancel={handleCancel}
        text={{
          title: 'Are you sure that you want to delete it?',
          description: 'Comments cannot be restored after deleting.',
          submit: 'Delete',
          cancel: 'Cancel',
        }}
      />
    </FlexContainer>
  );
};

export default CommentsDrawerContent;
