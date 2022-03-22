import React, { useState } from 'react';
import { shape, func, string } from 'prop-types';
import THEME from '../../../constants/theme';

import { Button, Tag } from '../../../components/atoms';
import { useHandleConnectionConnect } from '../../../hooks/connectionsHooks';

const GET_STATUS = {
  CONNECTED: {
    text: 'Connected',
    color: THEME.statusColors.succeeded,
  },
  BROKEN: {
    text: 'Broken',
    color: THEME.statusColors.failed,
  },
  NOT_CONNECTED: {
    text: 'Not connected',
    color: THEME.greyColors.grey8,
  },
  RECONNECT: {
    text: 'Reconnect',
    color: THEME.statusColors.purple,
  },
  ARCHIVED: {
    text: 'Disconnected',
    color: THEME.statusColors.failed,
  },
};

const redStatus = 'ARCHIVED';

const TagButton = ({ connection, refetch }) => {
  const { handleReconnect, renderConnectionForm } = useHandleConnectionConnect({ connection, callback: refetch });
  const [isHovered, setHovered] = useState(false);

  const handleHover = () => {
    setHovered(!isHovered);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (connection.status === redStatus) {
      handleReconnect();
    }
  };

  return (
    <Button transparent link onClick={handleClick} cursor={connection.status === redStatus ? 'pointer' : 'normal'}>
      <Tag
        backgroundColor={
          isHovered && connection.status === redStatus
            ? GET_STATUS.RECONNECT.color
            : GET_STATUS[connection.status]?.color
        }
        color="white"
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        {...(connection?.status === 'ARCHIVED' && { width: '94px' })}
      >
        {isHovered && connection.status === redStatus ? GET_STATUS.RECONNECT.text : GET_STATUS[connection.status]?.text}
      </Tag>
      {renderConnectionForm()}
    </Button>
  );
};

TagButton.propTypes = {
  connection: shape({
    status: string,
  }).isRequired,
  refetch: func.isRequired,
};

export default TagButton;
