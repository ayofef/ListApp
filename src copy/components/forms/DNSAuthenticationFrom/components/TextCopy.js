import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { useCopyToClipboard } from 'react-use';
import capitalize from '@material-ui/core/utils/capitalize';
import { useTranslation } from 'react-i18next';
import { StyledButton } from '../styled';
import { StyledText } from '../../../atoms/Typography/StyledText';
import { useNotificationManager } from '../../../../hooks/useNotificationManager';

const TextCopy = ({ children, name }) => {
  const { t } = useTranslation();
  const [{ value, error }, copyToClipboard] = useCopyToClipboard();
  const handleCopy = useCallback(({ currentTarget }) => copyToClipboard(currentTarget.value), [copyToClipboard]);
  useNotificationManager(
    'success',
    value && capitalize(`copied ${name ?? 'text'} to clipboard.`),
    capitalize(`copy ${name ?? 'text'}`)
  );
  useNotificationManager('error', error?.message, 'copy text');

  return (
    <Grid container spacing={1} alignItems="center" wrap="nowrap">
      <Grid item>
        <Box maxWidth="240px" overflow="hidden" textOverflow="ellipsis">
          <StyledText>{children}</StyledText>
        </Box>
      </Grid>

      <Grid item>
        <StyledButton
          type="button"
          variant="outlined"
          color="primary"
          size="small"
          value={children}
          onClick={handleCopy}
        >
          {t('copy')}
        </StyledButton>
      </Grid>
    </Grid>
  );
};

TextCopy.propTypes = {
  children: PropTypes.string,
  name: PropTypes.string.isRequired,
};

TextCopy.defaultProps = {
  children: '',
};

export default TextCopy;
