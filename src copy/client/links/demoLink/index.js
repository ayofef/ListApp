import { ApolloLink } from '@apollo/client';
import { DEMO_HEADER, IGNORE_DEMO_HEADER } from './constants';
import { getStorageValue } from './storage';

const demoLink = new ApolloLink((operation, forward) => {
  if (!getStorageValue() || operation.getContext()[IGNORE_DEMO_HEADER]) {
    return forward(operation);
  }

  operation.setContext(({ headers, ...rest }) => ({
    ...rest,
    headers: {
      ...headers,
      [DEMO_HEADER]: 'true',
    },
  }));

  return forward(operation);
});

export default demoLink;
