import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';
import THEME from '../../../constants/theme';
import { P14 } from '../Typography/P14';

const UserWrap = styled.div`
  position: absolute;
  top: calc(100% + 18px);
  left: 0;
  padding: 5px;
  border-radius: 8px;
  background: ${THEME.greyColors.grey4};
  //visibility: hidden;
  //opacity: 1;
  p {
    color: ${THEME.greyColors.grey1};
  }
`;

const UserInfo = ({ name, email, ...restProps }) => {
  return (
    <UserWrap {...restProps}>
      <P14>{name}</P14>
      <P14>{email}</P14>
    </UserWrap>
  );
};

UserInfo.propTypes = {
  name: string.isRequired,
  email: string.isRequired,
};

export default UserInfo;
