import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import capitalize from '@material-ui/core/utils/capitalize';

import CircleImage from '../../../../components/table/CircleImage';
import { P, P14 } from '../../../../components/atoms';

const ConnectionItem = ({
  connectionName,
  connectionIcon,
  subText,
  subTextProps,
  titleFontWeight,
  iconSize,
  textWrapperProps,
}) => {
  return (
    <Box display="flex" alignItems="center">
      <Box mr="12px">
        <CircleImage text={connectionName} logo={connectionIcon} size={iconSize} />
      </Box>
      <Box textAlign="left" {...(textWrapperProps && { ...textWrapperProps })}>
        <P14 fontWeight={titleFontWeight}>{capitalize(connectionName || '')}</P14>
        {subText && <P {...(subTextProps && { ...subTextProps })}>{capitalize(subText || '')}</P>}
      </Box>
    </Box>
  );
};

ConnectionItem.propTypes = {
  connectionIcon: PropTypes.string.isRequired,
  connectionName: PropTypes.string.isRequired,
  titleFontWeight: PropTypes.string,
  subText: PropTypes.string,
  subTextProps: PropTypes.shape({}),
  iconSize: PropTypes.number,
  textWrapperProps: PropTypes.shape({}),
};
ConnectionItem.defaultProps = {
  titleFontWeight: '600',
  subText: undefined,
  subTextProps: {},
  iconSize: 47,
  textWrapperProps: {},
};

export default ConnectionItem;
