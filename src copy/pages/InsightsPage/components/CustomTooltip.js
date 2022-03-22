import React, { useMemo } from 'react';
import { arrayOf, shape, bool, string, oneOfType, number } from 'prop-types';
import moment from 'moment';
import { BlockWrap, P } from '../../../components/atoms';
import THEME from '../../../constants/theme';
import { DISPLAY_DATE_AND_TIME_KEY } from '../constant';

const getLabelFormat = ({ showTime }) => {
  if (showTime) {
    return 'D MMM, YYYY - HH:mm';
  }

  return 'D MMM, YYYY';
};

const CustomTooltip = ({ payload, label, active, dataKey, showTime }) => {
  const payloadRef = payload?.[0]?.payload;
  const intervalEnd = payloadRef?.interval?.[DISPLAY_DATE_AND_TIME_KEY];
  const dateLabel = useMemo(
    () =>
      intervalEnd
        ? moment(intervalEnd)
            .local()
            .format(getLabelFormat({ showTime }))
        : label,
    [intervalEnd, label, showTime]
  );

  if (!active) {
    return null;
  }

  return (
    <BlockWrap
      textAlign="center"
      border="1px solid rgba(0, 0, 0, 0.07)"
      box-shadow=" 0px 2px 4px rgba(155, 159, 171, 0.11)"
      borderRadius="12px"
      padding="5px 20px 9px"
      backgroundColor="white"
    >
      <P fontSize="12px" fontWeight={400} color={THEME.greyColors.grey9} margin="0 0 4px 0">
        {dataKey === 'count' ? 'Total count' : dateLabel}
      </P>
      <P fontSize="16px" fontWeight={600} color={THEME.secondaryColors.black2}>
        {`${dataKey === 'count' ? payloadRef?.count : payloadRef?.total?.formattedAmount || payloadRef?.value}`}
      </P>
    </BlockWrap>
  );
};

CustomTooltip.propTypes = {
  payload: arrayOf(
    shape({
      value: oneOfType([string, number]),
    })
  ),
  label: string,
  dataKey: string.isRequired,
  active: bool,
  showTime: bool,
};

CustomTooltip.defaultProps = {
  label: '',
  active: undefined,
  payload: [],
  showTime: false,
};

export default CustomTooltip;
