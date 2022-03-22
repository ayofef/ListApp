const defaultOptions = {
  mutate: {
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  },
  watchQuery: {
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  },
  query: {
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  },
};

export default defaultOptions;
