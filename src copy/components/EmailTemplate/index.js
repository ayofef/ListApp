import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { v4 as uniqueID } from 'uuid';
import { useLocation } from 'react-router-dom';
import { UI_ROUTES } from '../../constants/routes';

import Email from './Email';
import EmailOption from './EmailOption';
import EmailControls from './EmailControls';
import EmailSkeleton from './EmailSkeleton';

const checkExistence = (data, identifier) => {
  return data.filter((el) => el.title === identifier)?.length > 0;
};

const EmailTemplate = ({ brandInfo, emailOptions, editorContent, editorProperties, we }) => {
  const [emailHeader, setEmailHeaders] = useState(emailOptions);
  const [controlForm, setControlForm] = useState({
    bcc: checkExistence(emailHeader, 'bcc'),
    cc: checkExistence(emailHeader, 'cc'),
  });
  const { pathname } = useLocation();

  const isBrandCenter = pathname === UI_ROUTES.brandCenter;

  const handleEmailContentSave = () => {};

  const SubjectAndTo = emailHeader.filter((el) => el.title === 'subject' || el.title === 'to').reverse();
  const removedSubject = emailHeader.filter((el) => el.title !== 'subject' && el.title !== 'to');

  const addEmailOption = (title, checked) => {
    if (checked) {
      setEmailHeaders([...emailHeader, { id: uniqueID(), title: title, initValue: [] }]);
    } else {
      const removeCurrent = emailHeader.filter((el) => el.title !== title);
      setEmailHeaders(removeCurrent);
    }
  };

  return (
    <Box margin={isBrandCenter ? '0' : '64px auto'} display="flex" justifyContent="center" alignItems="flex-start">
      {!isBrandCenter && editorProperties?.length < 1 ? (
        <EmailSkeleton />
      ) : (
        <Box width="700px">
          {!isBrandCenter &&
            SubjectAndTo &&
            SubjectAndTo.map(({ id, initValue, title }) => (
              <EmailOption key={id} initValue={initValue} title={title} />
            ))}
          {!isBrandCenter &&
            removedSubject &&
            removedSubject.map(
              ({ id, initValue, title }) =>
                controlForm[title] && <EmailOption key={id} initValue={initValue} title={title} />
            )}
          <Email
            brandInfo={brandInfo}
            we={we}
            editorContent={editorContent}
            handleEmailContentSave={handleEmailContentSave}
            editorProperties={editorProperties}
            editorMinHeight="200px"
          />
        </Box>
      )}
      {!isBrandCenter && (
        <EmailControls
          handleAdd={addEmailOption}
          emailHeader={emailHeader}
          controlForm={controlForm}
          setControlForm={setControlForm}
        />
      )}
    </Box>
  );
};

EmailTemplate.propTypes = {
  we: PropTypes.string,
  emailOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      initValue: PropTypes.string.isRequired,
    })
  ),
  editorContent: PropTypes.string.isRequired,

  brandInfo: PropTypes.shape({
    accentColor: PropTypes.string,
    actionButton: PropTypes.string,
    socialNetworks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        iconUrl: PropTypes.string,
        linkUrl: PropTypes.string,
      })
    ),
    logoUrl: PropTypes.string,
    faviconUrl: PropTypes.string,
    templateConfig: PropTypes.shape({
      signOffContent: PropTypes.string,
      footerText: PropTypes.string,
      logoType: PropTypes.string,
      logoPosition: PropTypes.string,
      logoSize: PropTypes.string,
    }),
  }).isRequired,
  editorProperties: PropTypes.arrayOf(
    PropTypes.shape({
      group: PropTypes.string,
      properties: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
        })
      ),
    })
  ),
};

EmailTemplate.defaultProps = {
  we: 'Admin',
  emailOptions: [
    { id: uniqueID(), title: 'subject', initValue: '' },
    { id: uniqueID(), title: 'to', initValue: '' },
  ],
  editorProperties: [],
};

export default EmailTemplate;
