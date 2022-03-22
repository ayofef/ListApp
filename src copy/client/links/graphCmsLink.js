import { HttpLink } from '@apollo/client';

export const GRAPH_CMS_CLIENT_NAME = 'graph-cms';

export const graphCmsLink = new HttpLink({
  uri: process.env.REACT_APP_CMS_URL,
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_CMS_TOKEN}`,
  },
});

/** GRAPH CMS QUERY EXAMPLE
 const { data } = useQuery(GRAPH_CMS_AUTOMATION_TEMPLATE, {
    variables: { template: 'template.freeform-automation' },
    context: { clientName: GRAPH_CMS_CLIENT_NAME },
  });
 **/
