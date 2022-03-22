import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { useCopyToClipboard } from 'react-use';
import { NotificationManager } from 'react-notifications';

import { useNotificationManager } from '../../../../hooks/useNotificationManager';
import JsonViewer from '../../../../components/atoms/JsonViewer';
import { StyledJsonBlockWrapper, StyledMetadataWrapper, StyledMetaDataHeader, StyledCopyButton } from './styled';
import CopyIcon from '../../../../assets/icons/Copy';
import THEME from '../../../../constants/theme';

const TITLE = 'Metadata';
const TOAST_TIMEOUT = 5000;
const COPIED_TOAST_MESSAGE = `Copied ${TITLE} to clipboard`;

const Metadata = ({ json }) => {
  const { t } = useTranslation();
  const [clipboardState, copyToClipboard] = useCopyToClipboard();
  useNotificationManager('error', clipboardState?.error, TITLE, TOAST_TIMEOUT);

  const handleCopy = () => {
    copyToClipboard(JSON.stringify(json, null, 2));
    NotificationManager.success(t(COPIED_TOAST_MESSAGE), TITLE, TOAST_TIMEOUT);
  };

  return (
    <Box component="section" mt="54px">
      <StyledMetadataWrapper>
        <StyledMetaDataHeader>
          <p>{t(TITLE)}</p>
          <StyledCopyButton onClick={handleCopy}>
            <CopyIcon fill={THEME.primaryColors.white} />
          </StyledCopyButton>
        </StyledMetaDataHeader>

        <StyledJsonBlockWrapper>
          <JsonViewer name="metadata" json={json} theme="eighties" />
        </StyledJsonBlockWrapper>
      </StyledMetadataWrapper>
    </Box>
  );
};

Metadata.propTypes = {
  json: PropTypes.shape({}),
};
Metadata.defaultProps = {
  json: {},
};
export default Metadata;
