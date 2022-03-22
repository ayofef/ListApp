import * as Yup from 'yup';
import { MESSAGES, MIN } from './passwordValidator';

const editProfileDataValidator = Yup.object().shape({
  name: Yup.string().required('Full name is required'),
  email: Yup.string()
    .email('Email is not valid')
    .required('Email is required'),
});

const editSecurityDataValidator = Yup.object().shape({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .min(MIN, MESSAGES.min)
    .matches(/[A-Z]/, MESSAGES.uppercase)
    .matches(/[a-z]/, MESSAGES.lowercase)
    .matches(/[0-9]/, MESSAGES.digit)
    .matches(/[!@#$%^&*]/, MESSAGES.special)
    .required(MESSAGES.required),
});

export { editProfileDataValidator, editSecurityDataValidator };
