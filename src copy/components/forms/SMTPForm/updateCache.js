import { GET_ME_AND_WE } from '../../../utils/queries/public/publicQueries';

const updateCache = (cache, { data }) => {
  const smtpSettings = data?.saveOrUpdateSmtpSettings;

  if (!smtpSettings) {
    return;
  }

  const existingSettings = cache.readQuery({ query: GET_ME_AND_WE });

  cache.writeQuery({
    query: GET_ME_AND_WE,
    data: {
      ...existingSettings,
      we: {
        ...existingSettings?.we,
        smtpSettings,
      },
    },
  });
};

export { updateCache };
