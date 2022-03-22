import { GET_FLOWS } from '../../../utils/queries/flows/queries';

const updateCache = (getNewFlow) => (cache, { data }) => {
  const newFlow = getNewFlow(data);

  if (!newFlow) return;

  const existingFlows = cache.readQuery({ query: GET_FLOWS });
  const getFlows = existingFlows?.getFlows ?? [];

  cache.writeQuery({
    query: GET_FLOWS,
    data: {
      getFlows: [...getFlows, newFlow],
    },
  });
};

export { updateCache };
