import React, { useEffect, useState } from 'react';

import { string, func, shape } from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import Create from '@material-ui/icons/CreateOutlined';
import Clear from '@material-ui/icons/ClearOutlined';
import DoneOutline from '@material-ui/icons/Done';
import RemoveOutlined from '@material-ui/icons/RemoveOutlined';
import Box from '@material-ui/core/Box';
import { Collapse } from '@material-ui/core';
import { IconButton } from '../styled';
import { P, BlockWrap, InputField } from '../../../components/atoms';
import { useGlobalContext } from '../../../containers/App/context';
import { StyledCommentFormWrap } from './CommentForm';

const StyledItemCover = styled(BlockWrap)`
  width: 100%;
  .editLabel {
    transition: 1s;
    text-align: right;
  }
  position: relative;
`;

const CommentItem = ({ data, setSelectedComment, deleteComment, handleSubmit, selectedComment }) => {
  const { getMeData } = useGlobalContext();
  const [hovered, setHovered] = useState(false);
  const [formData, setFormData] = useState({});
  useEffect(() => {
    if (selectedComment.id) {
      setFormData(selectedComment);
    }
  }, [selectedComment]);

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      message: e.target.value,
    });
  };

  const myId = getMeData.me.id;
  const handleCancel = () => {
    setSelectedComment({});
    setHovered(false);
  };
  const canEdit = data.userCreator?.id === myId;
  const isEditing = selectedComment.id === data?.id;
  return (
    <StyledItemCover onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} margin="34px 0 0">
      <Box display="flex" justifyContent="space-between">
        <P width="50%" fontSize="12px" color="737A82">
          {data.userCreator?.name}
        </P>
        <P fontSize="12px" color="737A82" />
        <P fontSize="12px" color="737A82">
          | {moment(data.systemUpdated ? data.systemUpdated : data.systemCreated).calendar('DD/MM/YYYY H:mm')}
        </P>
      </Box>
      {selectedComment.id && selectedComment.id === data.id ? (
        <StyledCommentFormWrap width="100%" margin="8px 0 8px">
          <InputField
            autoFocus
            innerPaddingLeft="6px"
            noBorder
            margin="0"
            placeholder="Add comment"
            variant="outlined"
            type="text"
            multiline={true}
            rows={3}
            padding="9px 16px 9px 16px"
            value={formData.message || ''}
            onChange={(e) => changeHandler(e)}
          />
        </StyledCommentFormWrap>
      ) : (
        <P margin="8px 0 0" fontSize="14px" color="737A82">
          {data.message}
        </P>
      )}

      {canEdit && (
        <Collapse in={hovered || isEditing}>
          <Box display="flex" justifyContent="flex-end" className="editLabel">
            <Box pl={2}>
              <IconButton
                color={!selectedComment.id ? 'red' : '#787F88'}
                type="button"
                p="4px"
                onClick={() => (isEditing ? handleCancel() : deleteComment(data.id))}
              >
                {isEditing ? <Clear color="inherit" /> : <RemoveOutlined color="inherit" />}
              </IconButton>
            </Box>

            <Box pl={2}>
              <IconButton
                type="button"
                p="4px"
                onClick={() => (isEditing ? handleSubmit({ ...data, ...formData }) : setSelectedComment(data))}
                color={isEditing ? 'rgb(105, 68, 255)' : '#787F88'}
              >
                {isEditing ? <DoneOutline color="inherit" /> : <Create color="inherit" />}
              </IconButton>
            </Box>
          </Box>
        </Collapse>
      )}
    </StyledItemCover>
  );
};

CommentItem.propTypes = {
  setSelectedComment: func.isRequired,
  deleteComment: func.isRequired,
  handleSubmit: func.isRequired,
  data: shape({
    sender: string,
    date: string,
    text: string,
  }).isRequired,
  selectedComment: shape({
    sender: string,
    date: string,
    text: string,
  }).isRequired,
};

export default CommentItem;
