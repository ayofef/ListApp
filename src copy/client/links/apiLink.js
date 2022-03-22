import { HttpLink } from '@apollo/client';
import { API_URL } from '../../constants/api';

const apiLink = new HttpLink({
  uri: API_URL,
  credentials: 'same-origin',
});

export default apiLink;
