import React from 'react';
import useSearch from '../../../hooks/useSearch';
import { useGetConnectionDetails } from '../../../hooks/connectionsHooks';
import PageContent from './PageContent';

const ConnectFromPublicSitePage = () => {
  const [{ id }] = useSearch();
  const { connection } = useGetConnectionDetails(id);
  return Object.keys(connection).length > 0 && <PageContent connection={connection} />;
};

export default ConnectFromPublicSitePage;
