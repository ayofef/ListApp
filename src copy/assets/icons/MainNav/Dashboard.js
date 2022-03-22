import React from 'react';
import PropTypes from 'prop-types';

const Dashboard = ({ fill }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.3 19H12.7C10.6 19 9 17.4 9 15.3V12.7C9 10.6 10.6 9 12.7 9H15.4C17.4 9 19.1 10.6 19.1 12.7V15.4C19 17.4 17.4 19 15.3 19ZM12.7 11C11.7 11 11 11.7 11 12.7V15.4C11 16.3 11.7 17 12.7 17H15.4C16.3 17 17 16.3 17 15.3V12.7C17 11.7 16.3 11 15.3 11H12.7Z"
      fill={fill}
    />
    <path
      d="M27.2999 19H24.5999C22.5999 19 20.8999 17.4 20.8999 15.3V12.7C20.8999 10.7 22.4999 9 24.5999 9H27.2999C29.2999 9 30.9999 10.6 30.9999 12.7V15.4C30.9999 17.4 29.3999 19 27.2999 19ZM24.6999 11C23.6999 11 22.9999 11.7 22.9999 12.7V15.4C22.9999 16.3 23.6999 17 24.6999 17H27.3999C28.2999 17 28.9999 16.3 28.9999 15.3V12.7C28.9999 11.7 28.2999 11 27.2999 11H24.6999Z"
      fill={fill}
    />
    <path
      d="M15.3 31H12.7C10.7 31 9 29.4 9 27.3V24.6C9 22.6 10.6 20.9 12.7 20.9H15.4C17.4 20.9 19.1 22.5 19.1 24.6V27.3C19 29.4 17.4 31 15.3 31ZM12.7 23C11.7 23 11 23.7 11 24.7V27.4C11 28.3 11.7 29 12.7 29H15.4C16.3 29 17 28.3 17 27.3V24.6C17 23.7 16.3 23 15.3 23H12.7Z"
      fill={fill}
    />
    <path
      d="M27.2999 31H24.5999C22.5999 31 20.8999 29.4 20.8999 27.3V24.6C20.8999 22.6 22.4999 20.9 24.5999 20.9H27.2999C29.2999 20.9 30.9999 22.5 30.9999 24.6V27.3C30.9999 29.4 29.3999 31 27.2999 31ZM24.6999 23C23.7999 23 22.9999 23.7 22.9999 24.7V27.4C22.9999 28.3 23.6999 29.1 24.6999 29.1H27.3999C28.2999 29.1 29.0999 28.4 29.0999 27.4V24.7C29.0999 23.8 28.3999 23 27.3999 23H24.6999Z"
      fill={fill}
    />
  </svg>
);
Dashboard.propTypes = {
  fill: PropTypes.string,
};
Dashboard.defaultProps = {
  fill: '#787F88',
};
export default Dashboard;