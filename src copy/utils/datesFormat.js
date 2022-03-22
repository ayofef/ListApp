import moment from 'moment';

export const longFormat = (date) => (date ? moment(date).format('HH:MM · DD MMMM, YYYY') : '');
