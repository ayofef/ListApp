import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import { StyledDivider, Row, Col } from '../styled';

const generateArr = (n) => Array.from(Array(n).keys());

const GridSectionLoadingState = () => {
  return (
    <Box mb="64px">
      <Box mt="54px" borderRadius="6px" overflow="hidden" maxHeight="32px" maxWidth="245px">
        <Skeleton variant="rect" animation="wave" height={48} width={250} />
      </Box>

      <StyledDivider />

      <Grid container spacing={2} alignItems="flex-start">
        {generateArr(6).map((el) => (
          <Grid key={`grid-item${el}`} container item xs={6}>
            <Grid item xs={4}>
              <Box borderRadius="6px" overflow="hidden" maxHeight="32px" maxWidth="150px">
                <Skeleton variant="rect" animation="wave" height={48} width={250} />
              </Box>
            </Grid>

            <Grid item xs zeroMinWidth>
              <Box width="100%" overflow="hidden" display="flex" alignItems="center" textOverflow="ellipsis">
                <Box borderRadius="6px" overflow="hidden" maxHeight="32px" maxWidth="245px">
                  <Skeleton variant="rect" animation="wave" height={48} width={250} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const LoadingState = () => {
  return (
    <Box p="0 0 24px 8px">
      <Box component="section" mt="24px">
        <Box borderRadius="6px" overflow="hidden" maxHeight="44px" maxWidth="245px">
          <Skeleton variant="rect" animation="wave" height={48} width={250} />
        </Box>
        <Box mt="20px" borderRadius="6px" overflow="hidden" maxHeight="20px" maxWidth="245px">
          <Skeleton variant="rect" animation="wave" height={48} width={250} />
        </Box>
        <StyledDivider />

        <Row>
          {generateArr(3).map((el) => (
            <Col key={`detail-header${el}`}>
              <Box mt="5px" maxHeight="44px" borderRadius="6px" overflow="hidden">
                <Skeleton variant="rect" animation="wave" height={48} width={100} />
              </Box>
            </Col>
          ))}
        </Row>

        {generateArr(2).map((el) => (
          <GridSectionLoadingState key={`grid-section${el}`} />
        ))}
      </Box>
    </Box>
  );
};

export default LoadingState;
export { GridSectionLoadingState };
