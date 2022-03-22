import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Box, capitalize, Grid } from '@material-ui/core';
import { P16B, P14B, P14 } from '../../../atoms';
import { Info } from '../../../../assets/icons';
import { FlexContainer } from '../../../atoms/flex/FlexContainer';

const Specs = {
  'max.size': '2mb',
  format: 'PNG or JPEG',
  'min.resolution': '500x500 pixels',
};

const UploadHeader = ({ title }) => {
  const { t } = useTranslation();
  return (
    <FlexContainer justifyContent="space-between" width="100%" margin="0 0 16px 0">
      {title && (
        <>
          <P16B lineHeight="24px">{t(capitalize(title))}</P16B>

          <Box position="relative">
            <input type="checkbox" />
            <Info />

            <Box
              position="absolute"
              width="270px"
              bgcolor="#fff"
              padding="16px 16px 8px 16px"
              borderRadius="8px"
              boxShadow="0px 0px 0px 2px rgba(155, 159, 171, 0.11)"
              top="30px"
              right="0"
              className="Specs"
              zIndex="200"
            >
              <Box mb="8px">
                <P14B>{t(`${t(capitalize(title))} specs`)}</P14B>
              </Box>

              {Object.keys(Specs).map((key) => (
                <Box mb="6px" key={key}>
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <P14 color="#787F88">{t(capitalize(key))}:</P14>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <P14>{t(Specs[key])}</P14>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Box>
          </Box>
        </>
      )}
    </FlexContainer>
  );
};

UploadHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default UploadHeader;
