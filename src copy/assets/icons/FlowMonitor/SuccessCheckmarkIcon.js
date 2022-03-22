import React from 'react';

const SuccessCheckmarkIcon = (props) => {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width={20} height={20} rx={10} fill="#14B95C" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.3233 6.76765C14.6357 7.08007 14.6357 7.5866 14.3233 7.89902L8.98997 13.2324C8.67755 13.5448 8.17102 13.5448 7.8586 13.2324L5.43436 10.8081C5.12194 10.4957 5.12194 9.98916 5.43436 9.67674C5.74678 9.36432 6.25331 9.36432 6.56573 9.67674L8.42429 11.5353L13.1919 6.76765C13.5044 6.45523 14.0109 6.45523 14.3233 6.76765Z"
        fill="white"
      />
    </svg>
  );
};
export default SuccessCheckmarkIcon;
