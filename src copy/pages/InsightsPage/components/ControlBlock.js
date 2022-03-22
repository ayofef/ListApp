import React, { useEffect, useMemo, useState } from 'react';
import { string, func } from 'prop-types';
import { useQuery } from '@apollo/client';
import get from 'lodash/get';
import noop from 'lodash/noop';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Button, P12 } from '../../../components/atoms';
import { StyledAbsoluteBlock } from './styled';
import { useInsightDetailsContext } from '../PaymentInsights/InsightInfo/context';
import { GET_INSIGHTS_DETAILS } from '../../../utils/queries/dashboardInsights/dasboardInsightQueries';
import useSearch from '../../../hooks/useSearch';
import { INTERVAL_TEXT_MAP, handleDetailsDateInterval } from '../constant';
import { isDefined } from '../../../utils/helpers';
import { INTENT_STATUS_VARIABLE_KEY_MAP } from '../PaymentInsights/InsightInfo/constant';
import { FlexContainer } from '../../../components/atoms/flex/FlexContainer';

const ControlBlock = ({ dataKey, onIntervalChange, onLoadingChange, intentStatus }) => {
  const { initialInterval, setData: setChartsData, variables } = useInsightDetailsContext();
  const [newInterval, setNewInterval] = useState(null);

  const [search] = useSearch();

  const subQuery = dataKey.indexOf('byValue.') > -1;
  const query = {
    function: GET_INSIGHTS_DETAILS,
    key: subQuery ? dataKey.replace('byValue.', '') : dataKey,
  };

  const { intervalValues } = handleDetailsDateInterval(search?.filter?.date);

  const { data, error, loading } = useQuery(query.function(query.key), {
    skip: !newInterval,
    variables: {
      ...variables,
      intervalSize: newInterval,
      ...(isDefined(intentStatus) &&
        isDefined(INTENT_STATUS_VARIABLE_KEY_MAP[intentStatus]) && {
          [INTENT_STATUS_VARIABLE_KEY_MAP[intentStatus]]: newInterval,
        }),
    },
  });

  useEffect(() => {
    if (!error && get(data?.getDashboardInsights, dataKey)) {
      setChartsData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, dataKey, error, setChartsData]);

  const currentIndex = useMemo(
    () => intervalValues.findIndex((item) => (newInterval ? item === newInterval : item === initialInterval)),
    [newInterval, initialInterval, intervalValues]
  );

  const hasPrev = currentIndex >= 0;
  const hasNext = currentIndex < intervalValues.length - 1;

  const handleZoom = () => {
    const interval = intervalValues[currentIndex + 1];
    setNewInterval(interval);
  };

  const handleUnZoom = () => {
    const interval = currentIndex === 0 ? initialInterval : intervalValues[currentIndex - 1];
    setNewInterval(interval);
  };

  const intervalNumber = newInterval || initialInterval;

  useEffect(() => {
    onIntervalChange(intervalNumber);
  }, [intervalNumber, onIntervalChange]);

  useEffect(() => {
    onLoadingChange(loading);
  }, [onLoadingChange, loading]);

  return (
    <StyledAbsoluteBlock className="hiddenButton" top="0px" right="60px">
      <FlexContainer className="buttonsCover" justifyContent="flex-end">
        <Button
          small
          transparent
          className="left"
          minHeight="auto"
          height="24px"
          width="24px"
          onClick={handleZoom}
          disabled={!hasNext || loading}
          fontSize="18px"
          color="#787F88"
          $minHeight="unset"
        >
          <FlexContainer className="buttonsInnerCover">
            <AddIcon fontSize="small" color="inherit" />
          </FlexContainer>
        </Button>

        <Button
          small
          className="right"
          transparent
          minHeight="auto"
          height="24px"
          width="24px"
          onClick={handleUnZoom}
          disabled={!hasPrev || loading}
          fontSize="18px"
          color="#787F88"
          $minHeight="unset"
        >
          <FlexContainer className="buttonsInnerCover">
            <RemoveIcon fontSize="small" />
          </FlexContainer>
        </Button>
      </FlexContainer>
      <P12 className="hiddenButton__Interval-text" color="#787F88" margin="8px 0 0 0">
        {INTERVAL_TEXT_MAP[intervalNumber]} interval
      </P12>
    </StyledAbsoluteBlock>
  );
};

ControlBlock.propTypes = {
  dataKey: string.isRequired,
  onIntervalChange: func,
  onLoadingChange: func,
  intentStatus: string,
};

ControlBlock.defaultProps = {
  onIntervalChange: noop,
  onLoadingChange: noop,
  intentStatus: undefined,
};

export default ControlBlock;
