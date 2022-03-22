import React from 'react';
import { CopyToClipboard as ReactCopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'styled-components';
import { bool, func, string } from 'prop-types';
import THEME from '../../../constants/theme';

const CopyToClipboardStyled = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const CopyToClipboard = ({ isSecure, className, fill, ...restProps }) => {
  if (!isSecure) {
    return <ReactCopyToClipboard {...restProps} />;
  }

  return (
    <CopyToClipboardStyled className={className}>
      <ReactCopyToClipboard {...restProps} />
    </CopyToClipboardStyled>
  );
};

CopyToClipboard.propTypes = {
  text: string,
  isSecure: bool,
  onCopy: func,
  className: string,
  fill: string,
};
CopyToClipboard.defaultProps = {
  text: '',
  className: '',
  onCopy: undefined,
  isSecure: true,
  fill: THEME.greyColors.grey1,
};
export default CopyToClipboard;
