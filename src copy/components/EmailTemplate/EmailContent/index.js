import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

import MasterContent from './MasterTemplateContent';
import PropertyEditor from '../../PropertyTextEditor';
import EmailSection from '../EmailSection';

const EmailContent = ({
  handleSave,
  properties,
  defaultTab,
  initialEditorText,
  isBrandCenter,
  preview,
  editorMinHeight,
  previewModal,
}) => {
  if (!isBrandCenter) {
    return (
      <EmailSection title="sign-off" tab={2} defaultTab={defaultTab} preview={preview}>
        {previewModal || preview ? (
          <Box
            dangerouslySetInnerHTML={{ __html: initialEditorText }}
            pl="14px"
            maxHeight={preview && !previewModal ? '150px' : '100%'}
            overflow="hidden"
          />
        ) : (
          <Box margin="40px 0 0 0" padding="0 16px">
            <PropertyEditor
              showToolbar
              initialEditorText={initialEditorText}
              handleSave={handleSave}
              properties={properties}
              readOnly={preview}
              minHeight={editorMinHeight}
            />
          </Box>
        )}
      </EmailSection>
    );
  }

  return <MasterContent />;
};

EmailContent.propTypes = {
  isBrandCenter: PropTypes.bool.isRequired,
  handleSave: PropTypes.func.isRequired,
  defaultTab: PropTypes.bool.isRequired,
  editorMinHeight: PropTypes.string,
  previewModal: PropTypes.bool,
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      group: PropTypes.string,
      properties: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  initialEditorText: PropTypes.string.isRequired,
  preview: PropTypes.bool.isRequired,
};
EmailContent.defaultProps = {
  editorMinHeight: '100px',
  previewModal: false,
};

export default EmailContent;
