import StatusObject from './StatusObject';
import StatusString from './StatusString';

const STATUS_DICTIONARY = {
  string: StatusString,
  object: StatusObject,
};

const getStatusContent = (data) => STATUS_DICTIONARY[typeof data];

export default getStatusContent;
