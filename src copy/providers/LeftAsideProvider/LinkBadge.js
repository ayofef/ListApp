import React from 'react';
import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
import { useHasNotification } from './index';

const LinkBadge = ({ children, pathname, options }) => {
  const count = useHasNotification({ pathname, options });
  return (
    <Badge badgeContent={count} color="secondary">
      {children}
    </Badge>
  );
};

LinkBadge.propTypes = {
  pathname: PropTypes.string.isRequired,
  options: PropTypes.shape({
    exact: PropTypes.bool,
    sensitive: PropTypes.bool,
    strict: PropTypes.bool,
  }),
};

LinkBadge.defaultProps = {
  options: null,
};

export default LinkBadge;
