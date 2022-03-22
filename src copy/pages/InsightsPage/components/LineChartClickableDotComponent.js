import React from 'react';
import { string, number, func, bool, shape, arrayOf } from 'prop-types';
import { useHistory } from 'react-router-dom';
import qs from 'qs';

import useSearch, { STRINGIFY_OPTIONS } from '../../../hooks/useSearch';
import { UI_ROUTES } from '../../../constants/routes';
import { isDefined } from '../../../utils/helpers';
import { INTENT_STATUS_PAYMENTS_FILTER_MAP, INTENT_STATUS_MAP } from '../PaymentInsights/InsightInfo/constant';

const FILTER_MAP = {
  successful: { 0: 'succeeded', 1: 'authorised' },
  canceled: { 0: 'cancelled' },
};

export const LabelAsPoint = ({ index, x, y, setHover, isIntent, status, renderData, intentStatus }) => {
  const [searchParams] = useSearch();
  const history = useHistory();

  const onClick = () => {
    const clickedItem = renderData[index];

    const clearedParams = searchParams?.filter;

    delete clearedParams.date;
    delete clearedParams.rangeType;

    const params = {
      filter: {
        date: {
          gt: clickedItem?.interval?.start,
          lt: clickedItem?.interval?.end,
        },
        ...(!isIntent && {
          paymentStatus: {
            ...(FILTER_MAP[status] ?? { 0: status }),
          },
        }),
        ...(isDefined(intentStatus) &&
          isDefined(INTENT_STATUS_PAYMENTS_FILTER_MAP[intentStatus]) && {
            paymentStatus: INTENT_STATUS_PAYMENTS_FILTER_MAP[intentStatus],
          }),
        // From /insights - intent status is not available
        ...(isIntent &&
          !isDefined(intentStatus) && {
            paymentStatus: [INTENT_STATUS_MAP.active, INTENT_STATUS_MAP.inactive],
          }),
        ...clearedParams,
      },
    };
    history.push({
      pathname: UI_ROUTES.payments,
      search: qs.stringify(params, STRINGIFY_OPTIONS),
    });
  };

  return (
    <circle
      className="customDot"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      cx={x}
      cy={y}
      r={4}
      strokeWidth="10"
      stroke="transparent"
      fill="transparent"
    />
  );
};

LabelAsPoint.propTypes = {
  renderData: arrayOf(
    shape({
      interval: shape({ start: string, end: string }),
    })
  ),
  index: number,
  x: number,
  y: number,
  setHover: func.isRequired,
  isIntent: bool,
  status: string.isRequired,
  intentStatus: string,
};

LabelAsPoint.defaultProps = {
  x: null,
  y: null,
  index: null,
  isIntent: false,
  renderData: [],
  intentStatus: undefined,
};
