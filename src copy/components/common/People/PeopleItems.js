import React from 'react';
import { string, shape } from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import IconButton from '@material-ui/core/IconButton';
import More from '../../../assets/icons/More';
import { Tag, P14, P14M } from '../../atoms';
import CircleImage from '../../table/CircleImage';
import THEME from '../../../constants/theme';
import DropDownMenu from '../../menus/DropDownMenu';
import { USER_ROLES_MAP } from '../../../pages/People/constant';
import { FlexContainer } from '../../atoms/flex/FlexContainer';

const GET_STATUS = {
  INVITED: {
    text: 'Invited',
    color: 'rgba(94, 19, 68, 0.15)',
  },
  INACTIVE: {
    text: 'Inactive',
    color: THEME.greyColors.grey4,
  },
  ACTIVE: {
    text: 'Active',
    color: 'rgba(5, 20, 156, 0.1)',
  },
};

const STATUS_COLOR_MAP = {
  ACTIVE: THEME.secondaryColors.greenDark,
  INVITED: THEME.secondaryColors.blue,
  DEFAULT: THEME.greyColors.grey1,
};

const STATUS_ACTION_NAME_MAP = {
  INVITED: 'Deactivate',
  ACTIVE: 'Deactivate',
  INACTIVE: 'Reactivate',
};

export const ItemName = ({ avatar, name }) => {
  return (
    <FlexContainer justifyContent="flex-start">
      <CircleImage
        logo={avatar}
        text={name}
        size="40px"
        textOnly={isEmpty(avatar)}
        bgColor={THEME.greyColors.grey5}
        color={THEME.secondaryColors.black2}
      />
      <P14M margin="0 0 0 16px">{name}</P14M>
    </FlexContainer>
  );
};

export const ItemEmail = ({ email }) => {
  return <P14 color={THEME.greyColors.grey1}>{email}</P14>;
};

export const ItemRole = ({ role }) => {
  return <P14 color={THEME.greyColors.grey1}>{USER_ROLES_MAP[role]}</P14>;
};

export const ItemStatus = ({ status }) => {
  return (
    <Tag backgroundColor="transparent" color={STATUS_COLOR_MAP[status] || STATUS_COLOR_MAP.DEFAULT}>
      {GET_STATUS[status].text}
    </Tag>
  );
};

export const ItemButtons = ({ status, id, buttonActions, ...rest }) => {
  const dataMeId = `customer:${buttonActions.meData}`;

  const options = [
    {
      'Change Role': () => buttonActions.changeRole(id),
      [STATUS_ACTION_NAME_MAP[status]]: () => buttonActions.statusActions(status, { id, ...rest }),
    },
  ];

  if (dataMeId === id) {
    return null;
  }

  return (
    <DropDownMenu
      options={options}
      button={
        <IconButton>
          <More />
        </IconButton>
      }
      id={id}
    />
  );
};

ItemName.propTypes = {
  avatar: string,
  name: string.isRequired,
};

ItemName.defaultProps = {
  avatar: '',
};

ItemEmail.propTypes = {
  email: string.isRequired,
};

ItemRole.propTypes = {
  role: string.isRequired,
};

ItemStatus.propTypes = {
  status: string.isRequired,
};

ItemButtons.propTypes = {
  id: string.isRequired,
  status: string.isRequired,
  buttonActions: shape({
    meData: string,
    edit: string,
    deactivate: string,
  }).isRequired,
};
