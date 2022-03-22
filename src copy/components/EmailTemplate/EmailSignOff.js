import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import PropertyTextEditor from '../PropertyTextEditor';

import EmailSection from './EmailSection';

const InitialSignOff = (we) => `<p>Kind Regards,</p><p>${we}.</p>`;

const EmailSignOff = ({ defaultTab, signOffContent, isBrandCenter, we, handleSaveSignOffContent, preview }) => {
  return (
    <EmailSection title="signOff" tab={3} defaultTab={defaultTab} preview={preview}>
      {!isBrandCenter || preview ? (
        <Box padding="0 16px" dangerouslySetInnerHTML={{ __html: signOffContent || InitialSignOff(we) }} mb="64px" />
      ) : (
        <Box m=" 16px">
          <PropertyTextEditor
            showToolbar
            initialEditorText={signOffContent || InitialSignOff(we)}
            handleSave={handleSaveSignOffContent}
            properties={[]}
            minHeight="100px"
          />
        </Box>
      )}
    </EmailSection>
  );
};

EmailSignOff.propTypes = {
  defaultTab: PropTypes.bool,
  preview: PropTypes.bool.isRequired,
  we: PropTypes.string.isRequired,
  signOffContent: PropTypes.string,
  isBrandCenter: PropTypes.bool,
  handleSaveSignOffContent: PropTypes.func.isRequired,
};
EmailSignOff.defaultProps = {
  defaultTab: false,
  isBrandCenter: false,
  signOffContent: '',
};

export default EmailSignOff;
