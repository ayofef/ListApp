import React from 'react';
import { string } from 'prop-types';
import Box from '@material-ui/core/Box';
import CallMadeIcon from '@material-ui/icons/CallMade';
import { P } from '../../../components/atoms';
import LineChartComponent from '../components/LineChartComponent';
import BarChartComponent from '../components/BarChartComponent';
import { StyledLink } from './styled';
import { FlexContainer } from '../../../components/atoms/flex/FlexContainer';

const ChartBlock = ({ pageLabel, redirectLink, redirectLabel }) => {
  return (
    <FlexContainer flexDirection="column" margin="-1px 0 0 0">
      <FlexContainer justifyContent="space-between" width="100%" borderBottom="1px solid #E6E9EC" padding="0 0 16px 0">
        <P fontWeight={600} fontSize="20px">
          {pageLabel}
        </P>

        <StyledLink to={redirectLink}>
          <Box component="span" fontWeight="500" color="#3023C8" display="flex">
            {redirectLabel}
            <Box mt="3px" ml="6px">
              <CallMadeIcon fontSize="inherit" />
            </Box>
          </Box>
        </StyledLink>
      </FlexContainer>
      <FlexContainer width="100%" borderBottom="1px solid #E6E9EC">
        <FlexContainer width="calc(50% - 1px)" borderRight="1px solid #E6E9EC" height="370px">
          <LineChartComponent
            config={{
              left: true,
              key: 'successful',
            }}
            dataKey="total.rawAmount"
          />
        </FlexContainer>
        <FlexContainer height="370px" width="50%" justifyContent="center">
          <LineChartComponent
            config={{
              right: true,
              key: 'failed',
              header: {
                label: 'Failed transactions',
                value: '$1,254.58',
              },
            }}
            dataKey="total.rawAmount"
          />
        </FlexContainer>
      </FlexContainer>
      <FlexContainer width="100%" borderBottom="1px solid #E6E9EC" height="350px">
        <FlexContainer width="calc(33% - 1px)" height="300px">
          <BarChartComponent
            config={{
              left: true,
              key: 'processorsStats',
            }}
          />
        </FlexContainer>
        <Box width="1px" height="350px" bgcolor="#E6E9EC" />
        <FlexContainer width="calc(33% - 1px)" height="300px">
          <BarChartComponent
            config={{
              key: 'methodsStats',
            }}
          />
        </FlexContainer>
        <Box width="1px" height="350px" bgcolor="#E6E9EC" />
        <FlexContainer width="34%" height="300px">
          <BarChartComponent
            config={{
              right: true,
              key: 'countryStats',
            }}
          />
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  );
};

ChartBlock.propTypes = {
  pageLabel: string.isRequired,
  redirectLink: string.isRequired,
  redirectLabel: string.isRequired,
};

export default ChartBlock;
