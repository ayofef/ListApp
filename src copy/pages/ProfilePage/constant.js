import { shape, string, bool } from 'prop-types';
import { GET_ME_AND_WE } from '../../utils/queries/public/publicQueries';

/* TODO : Specify reset of the me object  */
const userPropType = shape({
  id: string.isRequired,
  name: string.isRequired,
  email: shape({
    address: string.isRequired,
    confirmed: bool.isRequired,
  }).isRequired,
  avatar: string,
  role: string,
  mfaType: string,
});

const MUTATE_OPTIONS = {
  refetchQueries: [{ query: GET_ME_AND_WE }],
  awaitRefetchQueries: true,
};

export { userPropType, MUTATE_OPTIONS };
