import React from 'react';

const Card = (props) => (
  <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 5H4C2.89543 5 2 5.89543 2 7V17C2 18.1046 2.89543 19 4 19H20C21.1046 19 22 18.1046 22 17V7C22 5.89543 21.1046 5 20 5Z"
      fill="black"
    />
    <path d="M22 8H2V11H22V8Z" fill="#ADDDD7" />
    <path
      d="M19 14H17C16.4477 14 16 14.4477 16 15C16 15.5523 16.4477 16 17 16H19C19.5523 16 20 15.5523 20 15C20 14.4477 19.5523 14 19 14Z"
      fill="#ADDDD7"
    />
  </svg>
);

export default Card;