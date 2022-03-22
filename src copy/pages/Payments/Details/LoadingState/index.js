import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import { GridSectionLoadingState } from '../../../DataTables/components/Details/LoadingState';
import { StyledDivider, Row, Col } from '../../../DataTables/components/Details/styled';

const generateArr = (n) => Array.from(Array(n).keys());

const LoadingState = () => {
  return (
    <Box p="0 0 24px 8px">
      <Box component="section" mt="24px">
        <Box borderRadius="6px" overflow="hidden" maxHeight="44px" maxWidth="90px">
          <Skeleton variant="rect" animation="wave" height={48} width={250} />
        </Box>

        <Box display="flex">
          {generateArr(3).map((el) => (
            <Box
              key={`summary-header${el}`}
              mt="20px"
              borderRadius="6px"
              overflow="hidden"
              maxHeight="30px"
              maxWidth="110px"
              mr="20px"
            >
              <Skeleton variant="rect" animation="wave" height={48} width={250} />
            </Box>
          ))}
        </Box>

        <StyledDivider />

        <Row>
          {generateArr(3).map((el) => (
            <Col key={`summary-details${el}`}>
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
