import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import noop from 'lodash/noop';

import PlusButton from '../../../atoms/IconButton';
import { CheckboxInput } from '../../../atoms/CheckboxInput';

import {
  StyledEditableField,
  StyledEditableFieldWrapper,
  StyledEditableCheckBoxWrapper,
  StyledCheckboxWrapper,
} from './styled';

function EditableField({
  content,
  id,
  handleContentUpdate,
  fontSize,
  fontWeight,
  showNewSubtaskButton,
  showMarkAsCompleteInput,
  handleAddSubTask,
  handleMarkAsComplete,
}) {
  const [textContent, setTexContent] = useState('');

  useEffect(() => {
    setTexContent(content);
  }, [content]);

  const handleUpdate = (e) => {
    const newContent = e.target.value;

    setTexContent(newContent);
    handleContentUpdate({ newContent, id });
  };

  const handleCompleteTask = () => {
    handleMarkAsComplete({ id });
  };

  return (
    <StyledEditableFieldWrapper>
      <StyledEditableCheckBoxWrapper $addRightMargin={showNewSubtaskButton}>
        {showMarkAsCompleteInput && (
          <StyledCheckboxWrapper>
            <CheckboxInput onChange={handleCompleteTask} />
          </StyledCheckboxWrapper>
        )}
        <StyledEditableField
          value={textContent}
          onChange={handleUpdate}
          fullWidth
          multiline
          $fontSize={fontSize}
          $fontWeight={showNewSubtaskButton ? '600' : fontWeight}
        />
      </StyledEditableCheckBoxWrapper>
      {showNewSubtaskButton && <PlusButton onClick={handleAddSubTask} taskId={id} />}
    </StyledEditableFieldWrapper>
  );
}

EditableField.propTypes = {
  content: PropTypes.string,
  handleContentUpdate: PropTypes.func.isRequired,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  id: PropTypes.string,
  showNewSubtaskButton: PropTypes.bool,
  handleAddSubTask: PropTypes.func,
  handleMarkAsComplete: PropTypes.func,
  showMarkAsCompleteInput: PropTypes.bool,
};

EditableField.defaultProps = {
  content: '',
  fontSize: '16px',
  fontWeight: '400',
  id: undefined,
  handleAddSubTask: noop,
  handleMarkAsComplete: noop,
  showNewSubtaskButton: false,
  showMarkAsCompleteInput: true,
};

export default EditableField;
