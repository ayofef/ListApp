import React from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis';
import CallMadeIcon from '@material-ui/icons/CallMadeRounded';
import Box from '@material-ui/core/Box';
import { NavSubLink } from './StyledAside';
import { generateUserPilotAttribute } from '../../../constants/generateUserPilotLabel';
import { USER_PILOT_SECTION_ID } from './constant';

// import LinkBadge from '../../../providers/LeftAsideProvider/LinkBadge';

// const OPTIONS = { exact: true };

const SubLink = ({ title, to, exact, isActive, disabled, target, href }) => {
  if (disabled) {
    return (
      <NavSubLink as="span" title={title}>
        <LinesEllipsis text={title} maxLine="1" ellipsis=".." trimRight basedOn="letters" />
      </NavSubLink>
    );
  }

  return (
    <NavSubLink
      {...(href ? { as: 'a', href } : { to, exact, isActive })}
      {...(target && { target, rel: 'noopener noreferrer' })}
      {...generateUserPilotAttribute(USER_PILOT_SECTION_ID, 'sublink', title)}
    >
      <Box display="flex" flex="1" component="span" alignItems="center">
        <Box component="span" flex="1">
          {title}
        </Box>

        {/* <LinkBadge pathname={to} options={OPTIONS} /> */}

        {target && (
          <div className="external-icon">
            <CallMadeIcon />
          </div>
        )}
      </Box>
    </NavSubLink>
  );
};

SubLink.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.shape({})]).isRequired,
  exact: PropTypes.bool,
  isActive: PropTypes.func,
  disabled: PropTypes.bool,
  target: PropTypes.oneOf(['_self', '_blank', '_parent', '_top']),
  href: PropTypes.string,
};

SubLink.defaultProps = {
  exact: undefined,
  href: null,
  isActive: undefined,
  disabled: false,
  target: undefined,
};

export default SubLink;
