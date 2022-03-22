import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GQL_Q_AUTOMATION_DIRECTORY_CONTENTS } from '../../../../utils/queries/grapqhCms/queries';
import { GRAPH_CMS_CLIENT_NAME } from '../../../../client/links/graphCmsLink';

const useGetHeroContent = () => {
  const { data, loading } = useQuery(GQL_Q_AUTOMATION_DIRECTORY_CONTENTS, {
    context: {
      clientName: GRAPH_CMS_CLIENT_NAME,
    },
  });

  const heroContents = useMemo(
    () => data?.automationDirectoryContents?.slice(0, 3)?.sort((a) => (a?.isHeroContent ? -1 : 0)) || [],
    [data?.automationDirectoryContents]
  );

  return {
    heroContents,
    loading,
  };
};

export { useGetHeroContent };
