import React, { useState } from 'react';
import styled from 'styled-components';
import { func } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { ButtonRounded, BlockWrap, InputField } from '../../../components/atoms';

export const StyledCommentFormWrap = styled(BlockWrap)`
  textarea {
    background-color: white !important;
  }
`;

const CommentForm = ({ handleSubmit }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({});

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      message: e.target.value,
    });
  };
  const handleCancel = () => {
    setFormData({});
  };

  const handleSend = () => {
    handleSubmit(formData);
    handleCancel();
  };
  const disabled = !formData.message;
  return (
    <StyledCommentFormWrap width="100%" margin="27px 0" padding="0 16px">
      <InputField
        autoFocus
        innerPaddingLeft="6px"
        placeholder="Add comment"
        type="text"
        customLabel
        variant="outlined"
        padding="9px 16px 9px 16px"
        value={formData.message || ''}
        onChange={(e) => changeHandler(e)}
      />
      <BlockWrap margin="16px 0 0">
        <ButtonRounded
          type="button"
          variant="contained"
          color={disabled ? 'secondary' : 'primary'}
          disabled={disabled}
          onClick={handleSend}
        >
          {t('Send')}
        </ButtonRounded>
      </BlockWrap>
    </StyledCommentFormWrap>
  );
};

CommentForm.propTypes = {
  handleSubmit: func.isRequired,
};

export default CommentForm;
