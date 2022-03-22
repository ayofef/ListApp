import { bool, func, string } from 'prop-types';
import React from 'react';
import { Button, CircularLoader, BlockWrap } from '../../atoms';

const PlaidLink = ({ handleConnect, loading, text }) => {
  return (
    <Button borderRadius="20px" $background="#3023C8" onClick={handleConnect} className="blue">
      {loading && (
        <BlockWrap margin="0 8px 0 0" display="inline">
          <CircularLoader size={24} />
        </BlockWrap>
      )}
      {text}
    </Button>
  );
};

PlaidLink.propTypes = {
  text: string.isRequired,
  loading: bool,
  handleConnect: func.isRequired,
};

PlaidLink.defaultProps = {
  loading: false,
};

export default PlaidLink;
