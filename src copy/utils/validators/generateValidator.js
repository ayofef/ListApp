import * as Yup from 'yup';
import moment from 'moment';
import { typeHandler } from '../fieldsConsts';

const generateValidator = (dataValid) => {
  const objShape = {};
  const variants = {
    email: (item) =>
      item.optional === true
        ? Yup.string()
        : Yup.string()
            .email('incorrect email!')
            .required(`${item.label.text} is required`),
    simple: (item) =>
      item.optional === true
        ? Yup.string()
        : Yup.string().required(
            item.label?.validationMessage ? `${item.label?.validationMessage}` : `${item.label?.text} is required`
          ),
  };
  dataValid.forEach((item) => {
    objShape[item.block_id] = variants[item.block_id] ? variants[item.block_id](item) : variants.simple(item);
  });

  return Yup.object().shape(objShape);
};

export const updatedGenerateValidator = (dataValid) => {
  const objShape = {};
  const variants = {
    URL: (item) =>
      item.optional === true
        ? Yup.string()
        : Yup.string()
            .url('incorrect url!')
            .required(`${item.label.text} is required`),
    DATE: (item) => {
      let validation = Yup.date();

      switch (item.element['x-subtype']) {
        case 'future-only':
          validation = validation.test('is-greater', 'Time is not  valid', (value) => {
            if (item.optional) {
              if (value) {
                return moment().diff(value) < 0;
              }
              return true;
            }
            if (value) {
              return moment().diff(value) < 0;
            }
            return true;
          });
          break;
        case 'future-today-only':
          validation = validation.test('is-greater', 'Time is not  valid', (value) => {
            if (item.optional) {
              if (value) {
                return moment().diff(value) <= 0;
              }
              return true;
            }
            if (value) {
              return moment().diff(value) <= 0;
            }
            return true;
          });
          break;
        case 'past-only':
          validation = validation.test('is-greater', 'Time is not  valid', (value) => {
            if (item.optional) {
              if (value) {
                return moment().diff(value) > 0;
              }
              return true;
            }
            if (value) {
              return moment().diff(value) > 0;
            }
            return true;
          });
          break;
        default:
          break;
      }
      if (!item.optional) {
        validation = validation.required(`${item.label.text} is required`);
      }
      return validation;
    },
    simple: (item) =>
      item.optional === true
        ? Yup.string()
        : Yup.string().required(
            item.label?.validationMessage ? `${item.label?.validationMessage}` : `${item.label?.text} is required`
          ),
  };
  dataValid.forEach((item) => {
    objShape[item.block_id] = variants[typeHandler(item)] ? variants[typeHandler(item)](item) : variants.simple(item);
  });

  return Yup.object().shape(objShape);
};

export default generateValidator;
