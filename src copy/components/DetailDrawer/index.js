import React from 'react';
import { arrayOf, oneOfType, string, node, func, bool } from 'prop-types';
import Box from '@material-ui/core/Box';
import capitalize from '@material-ui/core/utils/capitalize';
import { StyledDetailsTitle } from './styled';
import CloseButton from '../Dialog/CloseButton';

const DetailDrawer = ({ title, content, footer, m, header, hideClose, onClose }) => (
  <>
    <Box display="flex" justifyContent="space-between" alignItems="center" mt={header ? 0 : '26px'}>
      {header || (
        <StyledDetailsTitle component="span" ml="28px" fontSize="18px" fontWeight="600" lineHeight="1.3">
          {header ? '' : capitalize(title?.toLowerCase() ?? '')}
        </StyledDetailsTitle>
      )}
      {!hideClose && <CloseButton onClick={onClose} top="17px" />}
    </Box>
    <Box flexGrow="1" m={m} overflow="hidden">
      <Box height="100%" overflow="hidden auto">
        {content}
      </Box>
    </Box>
    {footer && <Box m="0 28px 20px">{footer}</Box>}
  </>
);

DetailDrawer.propTypes = {
  title: oneOfType([node, arrayOf(node)]),
  content: oneOfType([node, arrayOf(node)]),
  footer: oneOfType([node, arrayOf(node)]),
  header: oneOfType([node, arrayOf(node)]),
  hideClose: bool,
  m: string,
  onClose: func,
};

DetailDrawer.defaultProps = {
  title: null,
  content: null,
  footer: null,
  header: null,
  hideClose: false,
  m: '16px 16px 12px 28px',
  onClose: () => {},
};

export { DetailDrawer };
