import React from 'react';
import { string } from 'prop-types';

const IssueIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="8" fill="#4E40EF" />
    <path
      d="M11 7.72573V8.00173C10.9996 8.64864 10.7901 9.2781 10.4028 9.79626C10.0155 10.3144 9.47098 10.6934 8.85061 10.8769C8.23021 11.0603 7.56719 11.0383 6.96034 10.8141C6.3535 10.5899 5.83539 10.1756 5.48329 9.63282C5.13118 9.09012 4.96394 8.44812 5.0065 7.80262C5.04907 7.15709 5.29916 6.54261 5.71948 6.05084C6.1398 5.55906 6.70783 5.21633 7.33885 5.07376C7.96988 4.93119 8.63008 4.99642 9.22099 5.25972M11 5.60172L8 8.60472L7.1 7.70473"
      stroke="white"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

IssueIcon.propTypes = {
  size: string,
};

IssueIcon.defaultProps = {
  size: '16',
};

export default IssueIcon;
