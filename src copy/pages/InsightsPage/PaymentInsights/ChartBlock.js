import React from 'react';
import { string } from 'prop-types';
import LineChartComponent from '../components/LineChartComponent';
import { FlexContainer } from '../../../components/atoms/flex/FlexContainer';

const rowsStructure = [
  [
    {
      left: true,
      key: 'byValue.intents',
      isIntent: true,
      status: 'intents',
    },
    {
      right: true,
      key: 'byValue.successful',
      status: 'successful',
    },
  ],
  [
    {
      left: true,
      key: 'byValue.canceled',
      status: 'canceled',
    },
    {
      key: 'byValue.declined',
      right: true,
      status: 'declined',
    },
    // {
    //   right: true,
    //   key: 'byValue.issues',
    // },
  ],
  [
    {
      left: true,
      key: 'byValue.disputed',
      status: 'disputed',
    },
    {
      key: 'byValue.refunded',
      right: true,
      status: 'refunded',
    },
  ],
  [
    {
      fullWidth: true,
      key: 'failed',
      status: 'failed',
    },
  ],
].map((chartsArray) => ({ id: chartsArray[0].key, chartsArray }));

const getBorder = (value) => (value ? 'none' : '1px solid #E6E9EC');

const HANDLERS = {
  1: () => ({
    width: '100%',
    borderRight: 'none',
  }),
  2: (index) => ({
    width: 'calc(50% - 1px)',
    borderRight: getBorder(index === 1),
  }),
  3: (index) => ({
    width: index === 2 ? '34%' : 'calc(33% - 1px)',
    borderRight: getBorder(index === 2),
  }),
};

const handleWidth = (count, index) => HANDLERS[count]?.(index) ?? {};

const ChartBlock = ({ dataKey }) => (
  <FlexContainer flexDirection="column" margin="-17px 0 0 0">
    {rowsStructure.map(({ id, chartsArray }) => (
      <FlexContainer width="100%" key={id} borderBottom="1px solid #E6E9EC">
        {chartsArray.map((config, index) => (
          <FlexContainer
            key={config.key}
            height="304px"
            {...handleWidth(chartsArray.length, index)}
            padding="24px 0 30px 0"
          >
            <LineChartComponent dataKey={dataKey} config={config} />
          </FlexContainer>
        ))}
      </FlexContainer>
    ))}
  </FlexContainer>
);

ChartBlock.propTypes = {
  dataKey: string.isRequired,
};

export default ChartBlock;
