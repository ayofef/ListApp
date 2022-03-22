import PropTypes from 'prop-types';
import React from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIosRounded';
import CallMadeIcon from '@material-ui/icons/CallMadeRounded';
import capitalize from '@material-ui/core/utils/capitalize';
import { StyledLinks } from './styled';

const LinkItem = ({ label, link, isActive, newTab }) => {
  return (
    <li>
      <StyledLinks
        to={link}
        activeClassName="flowDetailsNavActive"
        exact
        $newTab={newTab}
        {...(isActive && { isActive })}
        {...(newTab && { target: '_blank' })}
      >
        {capitalize(label || '')}
        {newTab ? <CallMadeIcon /> : <ArrowForwardIosIcon />}
      </StyledLinks>
    </li>
  );
};

LinkItem.propTypes = {
  isActive: PropTypes.func,
  newTab: PropTypes.bool,
  label: PropTypes.string.isRequired,
  link: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]).isRequired,
};

LinkItem.defaultProps = {
  isActive: undefined,
  newTab: false,
};

export default LinkItem;
