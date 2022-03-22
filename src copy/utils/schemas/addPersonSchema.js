import addPersonValidator from '../validators/addPersonValidator';
import { USER_ROLES, USER_ROLES_MAP } from '../../pages/People/constant';

const addPersonFieldsNames = {
  name: 'name',
  email: 'email',
  companyRole: 'companyRole',
};

export const addPersonFields = [
  { field: addPersonFieldsNames.name, label: 'Name' },
  { field: addPersonFieldsNames.email, label: 'Email address' },
  { field: addPersonFieldsNames.companyRole, label: 'Role' },
];

export const addPersonOptions = [
  { value: USER_ROLES.owner, text: { text: USER_ROLES_MAP[USER_ROLES.owner] } },
  { value: USER_ROLES.admin, text: { text: USER_ROLES_MAP[USER_ROLES.admin] } },
  { value: USER_ROLES.developer, text: { text: USER_ROLES_MAP[USER_ROLES.developer] } },
  { value: USER_ROLES.operator, text: { text: USER_ROLES_MAP[USER_ROLES.operator] } },
];

const addPersonSchema = {
  mapPropsToValues: () => ({
    [addPersonFieldsNames.name]: '',
    [addPersonFieldsNames.email]: '',
    [addPersonFieldsNames.companyRole]: '',
  }),
  validationSchema: addPersonValidator,
  displayName: 'addPersonForm',
};

export default addPersonSchema;
