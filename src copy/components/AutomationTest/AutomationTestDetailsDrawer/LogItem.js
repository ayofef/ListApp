import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import capitalize from '@material-ui/core/utils/capitalize';
import { P14Condensed, P12 } from '../../atoms';
import { StyledLogItemText, StyledLogItemIndicator, StyledLogItemWrapper } from './styled';

const LogItem = ({ message, ts }) => {
  return (
    <StyledLogItemWrapper>
      <StyledLogItemIndicator>&nbsp;</StyledLogItemIndicator>

      <StyledLogItemText>
        <P14Condensed color="#000000">{capitalize(message ?? '')}</P14Condensed>
        {ts && (
          <P12 color="#C1C3C6" fontWeight="500">
            {moment(ts).format('h:mm A')}
          </P12>
        )}
      </StyledLogItemText>
    </StyledLogItemWrapper>
  );
};

LogItem.propTypes = {
  message: PropTypes.string.isRequired,
  ts: PropTypes.string.isRequired,
};

export default LogItem;
