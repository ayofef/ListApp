import editPersonValidator from '../validators/editPersonValidator';
import { USER_ROLES, USER_ROLES_MAP } from '../../pages/People/constant';

const editPersonFieldsNames = {
  name: 'name',
  email: 'email',
  companyRole: 'companyRole',
};

export const editPersonFields = [
  // { field: editPersonFieldsNames.name, label: 'Name' }, // hide for now
  // { field: editPersonFieldsNames.email, label: 'Email editress' }, // hide for now
  { field: editPersonFieldsNames.companyRole, label: 'Role' },
];

export const editPersonOptions = [
  { value: USER_ROLES.owner, text: { text: USER_ROLES_MAP[USER_ROLES.owner] } },
  { value: USER_ROLES.admin, text: { text: USER_ROLES_MAP[USER_ROLES.admin] } },
  { value: USER_ROLES.developer, text: { text: USER_ROLES_MAP[USER_ROLES.developer] } },
  { value: USER_ROLES.operator, text: { text: USER_ROLES_MAP[USER_ROLES.operator] } },
];

const editPersonSchema = {
  mapPropsToValues: (props) => {
    const { name, email, role: companyRole } = props.initialValues;
    return {
      [editPersonFieldsNames.name]: name || '',
      [editPersonFieldsNames.email]: email || '',
      [editPersonFieldsNames.companyRole]: companyRole || '',
    };
  },
  validationSchema: editPersonValidator,
  displayName: 'editPersonForm',
};

export default editPersonSchema;
