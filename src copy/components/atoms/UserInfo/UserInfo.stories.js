import React from 'react';
import UserInfoComponent from './UserInfo';
import { BlockWrap } from '../temp-before-delete/BlockWrap';

export const UserInfo = (args) => (
  <BlockWrap width="50px" position="relative">
    label
    <UserInfoComponent {...args} />
  </BlockWrap>
);

UserInfo.args = {
  email: 'email',
  name: 'name',
};

export default {
  title: 'Atoms/UserInfo',
  component: UserInfoComponent,
};
