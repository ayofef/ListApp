import { useMutation } from '@apollo/client';
import { omit } from 'lodash';
import { SAVE_BRAND } from '../utils/queries/brandCenter/brandCenterMutations';
import { GET_BRAND } from '../utils/queries/brandCenter/brandCenterQueries';

import { useGlobalContext } from '../containers/App/context';

const mutateOptions = {
  refetchQueries: [{ query: GET_BRAND }],
  awaitRefetchQueries: true,
};
const useBrandCenterMutation = () => {
  const [mutateBrand] = useMutation(SAVE_BRAND, mutateOptions);
  const { setGlobalLoading } = useGlobalContext();

  const mutateData = (newObject) => {
    if (newObject) {
      setGlobalLoading('brandCenter', true);
      mutateBrand({ variables: omit(newObject, ['__typename']) }).finally(() => setGlobalLoading('brandCenter', false));
    }
  };

  return { mutateData };
};

export { useBrandCenterMutation };
