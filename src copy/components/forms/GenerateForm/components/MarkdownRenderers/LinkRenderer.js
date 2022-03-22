import PropTypes from 'prop-types';
import React from 'react';

const LinkRenderer = ({ href: _href, children }) => (
  <a href={_href} target="_blank" rel="noreferrer noopener">
    {children}
  </a>
);

LinkRenderer.propTypes = {
  href: PropTypes.string.isRequired,
};

export default LinkRenderer;
