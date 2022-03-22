import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uniqueID } from 'uuid';
import { Grid, Box } from '@material-ui/core';

import UploadBox from './UploadBox';

const GraphicTitleMap = ['logo', 'favicon'];

const Graphics = ({ handleGraphics, brandImages }) => {
  return (
    <Box>
      <Grid container spacing={6}>
        {GraphicTitleMap.map((el) => (
          <Grid item key={uniqueID()}>
            <UploadBox title={el} handleGraphics={handleGraphics} graphics={brandImages[el]} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

Graphics.propTypes = {
  handleGraphics: PropTypes.func.isRequired,
  brandImages: PropTypes.shape({
    logo: PropTypes.string,
    favicon: PropTypes.string,
  }).isRequired,
};

export default Graphics;
