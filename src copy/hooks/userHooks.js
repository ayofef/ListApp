import { useMutation } from '@apollo/client';
import { INVITE_USER } from '../utils/queries/users/usersMutations';

export const useInviteUser = () => {
  const [mutate, { data, loading, error }] = useMutation(INVITE_USER);

  return [mutate, { data, loading, error }];
};
