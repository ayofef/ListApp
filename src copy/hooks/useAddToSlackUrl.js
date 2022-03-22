import { useQuery } from '@apollo/client';

import { GET_ADD_TO_SLACK } from '../utils/queries/public/publicQueries';

const useAddToSlackUrl = () => {
  const { data } = useQuery(GET_ADD_TO_SLACK);

  return data?.getAddToSlack?.url;
};

export default useAddToSlackUrl;
