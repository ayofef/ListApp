import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import capitalize from '@material-ui/core/utils/capitalize';
import { P16B } from '../../../../components/atoms';

import { StyledDivider } from './styled';

const GridSection = ({ header, data, dataKey, containerXs, titleXs, mt }) => {
  const { t } = useTranslation();

  return (
    <Box mb="64px" mt={mt}>
      <Box component="section">
        <P16B>{t(header)}</P16B>
        <StyledDivider />

        <Grid container spacing={2} alignItems="flex-start">
          {dataKey.map((key) => (
            <Grid key={key} container item xs={containerXs}>
              <Grid item xs={titleXs}>
                <Box color="#787F88">{capitalize(key)}</Box>
              </Grid>

              <Grid item xs zeroMinWidth>
                <Box width="100%" overflow="hidden" display="flex" alignItems="center" textOverflow="ellipsis">
                  {data[key] ? (
                    data[key]
                  ) : (
                    <Box component="div" display="inline">
                      <span>N/A</span>
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

GridSection.propTypes = {
  header: PropTypes.string.isRequired,
  dataKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.shape({}).isRequired,
  containerXs: PropTypes.number,
  titleXs: PropTypes.number,
  mt: PropTypes.string,
};
GridSection.defaultProps = {
  containerXs: 6,
  titleXs: 4,
  mt: '54px',
};
export default GridSection;
