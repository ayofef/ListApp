import { ApolloClient, ApolloLink } from '@apollo/client';
import cache from './cache';
import defaultOptions from './defaultOptions';
import requestLink from './links/requestLink';
import ErrorLink from './links/errorLink';
import demoLink from './links/demoLink';
import apiLink from './links/apiLink';
import { GRAPH_CMS_CLIENT_NAME, graphCmsLink } from './links/graphCmsLink';

const { errorLink, setClient } = ErrorLink();

const client = new ApolloClient({
  link: ApolloLink.split(
    ({ getContext }) => getContext().clientName === GRAPH_CMS_CLIENT_NAME,
    graphCmsLink,
    ApolloLink.from([errorLink, requestLink, demoLink, apiLink])
  ),
  cache,
  defaultOptions,
});

setClient(client);

export default client;
