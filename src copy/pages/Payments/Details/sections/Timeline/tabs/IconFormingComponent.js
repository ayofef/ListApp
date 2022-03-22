import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TIMELINE_STATUS_MAP, getIconOptions, getStatusColor } from './constant';

const IconCover = styled.div`
  position: absolute;
  left: 16px;
  width: 9px;
  height: 9px;
  box-sizing: content-box;
  border: 4px solid white;
  background: white;
  border-radius: 50%;
  top: calc(50% - 8px);
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ status }) =>
    status === TIMELINE_STATUS_MAP.IN_PROGRESS &&
    `
    border-color: #14B95C;
  `}
`;

const IconFormingComponent = ({ status, icon, time, date }) => {
  const iconObject = getIconOptions(icon);
  const Icon = iconObject.icon;
  const size = iconObject.iconSize;

  return (
    <IconCover iconSize={size} status={status}>
      <Icon stroke="white" size={16} fill={getStatusColor(status, time || date)} />
    </IconCover>
  );
};

IconFormingComponent.propTypes = {
  status: PropTypes.string,
  icon: PropTypes.string,
  time: PropTypes.string,
  date: PropTypes.string,
};
IconFormingComponent.defaultProps = {
  status: '',
  time: null,
  date: null,
  icon: undefined,
};

export default IconFormingComponent;
