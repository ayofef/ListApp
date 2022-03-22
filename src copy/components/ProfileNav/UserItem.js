import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import capitalize from '@material-ui/core/utils/capitalize';
import CircleImage from '../table/CircleImage';

const UserItem = ({ fullName, initial, info, bgColor, bgImage, color, border }) => (
  <Grid container spacing={2} alignItems="center">
    <Grid item>
      <CircleImage
        text={(initial || fullName).toUpperCase()}
        size={40}
        bgColor={bgColor}
        borderRadius="8px"
        matchRadius
        {...(bgImage && {
          bgImage,
        })}
        {...(color && {
          color,
        })}
        {...(border && {
          border: '1px solid #D8D8D8',
        })}
      />
    </Grid>

    <Grid item>
      <Box component="p" m="0" fontWeight="600">
        {capitalize(fullName)}
      </Box>

      <Box component="p" m="0" fontSize="12px" color="#787F88">
        {info}
      </Box>
    </Grid>
  </Grid>
);

UserItem.propTypes = {
  fullName: PropTypes.string.isRequired,
  initial: PropTypes.string,
  info: PropTypes.string,
  bgColor: PropTypes.string,
  bgImage: PropTypes.string,
  color: PropTypes.string,
  border: PropTypes.bool,
};

UserItem.defaultProps = {
  initial: '',
  info: '',
  bgColor: '#c4cbd2',
  bgImage: '',
  color: '',
  border: false,
};

export default UserItem;
