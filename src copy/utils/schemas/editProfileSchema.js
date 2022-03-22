import * as Yup from 'yup';
import buildValidator from '../validators/buildValidator';
import { editSecurityDataValidator } from '../validators/editProfileValidator';

const passwordInitialValues = {
  currentPassword: '',
  newPassword: '',
};

const editProfileFieldNames = {
  name: 'name',
  email: 'email',
  currentPassword: 'currentPassword',
  newPassword: 'newPassword',
  role: 'role',
  phoneNumber: 'phoneNumber',
};

const NAME_VALIDATOR = Yup.string()
  .trim()
  .matches(/^[a-zA-Z\s]*$/, 'No special characters or numbers allowed')
  .required('Full name is required');

const validationSchema = buildValidator(
  Yup.lazy(() =>
    Yup.object().shape({
      [editProfileFieldNames.name]: NAME_VALIDATOR,
    })
  )
);

const passwordValidationSchema = buildValidator(Yup.lazy(() => editSecurityDataValidator));

export const profileTabFields = [
  { field: editProfileFieldNames.name, type: 'text', label: 'Full name' },
  // Hide for now as we might need email field back
  // { field: editProfileFieldNames.email, type: 'email', label: 'Email', disabled: true },
];

export const securityTabFields = [
  { field: editProfileFieldNames.currentPassword, type: 'password', label: 'Current password' },
  { field: editProfileFieldNames.newPassword, type: 'password', label: 'New password' },
];

const editSecurityDataSchema = {
  mapPropsToValues: () => ({
    [editProfileFieldNames.currentPassword]: '',
    [editProfileFieldNames.newPassword]: '',
  }),
  validationSchema: editSecurityDataValidator,
  displayName: 'editSecurityDataForm',
};

export { editSecurityDataSchema, validationSchema, passwordValidationSchema, passwordInitialValues };
