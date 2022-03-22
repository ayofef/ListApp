import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { LDProvider } from 'launchdarkly-react-client-sdk';
import { GET_ME_AND_WE } from '../../utils/queries/public/publicQueries';
import { isDefined } from '../../utils/helpers';

/**
 * Launch darkly Docs
 * https://docs.launchdarkly.com/sdk/client-side/react/react-webs
 */

const FeatureContextComponent = ({ children }) => {
  //Note Reading directly from cache
  const { data } = useQuery(GET_ME_AND_WE);
  const user = useMemo(
    () =>
      isDefined(data?.me?.id)
        ? {
            key: data?.me?.id,
            name: data?.me?.name,
            custom: {
              id: data?.me?.id,
              teamId: data?.we?.id,
            },
          }
        : undefined,
    [data?.me?.id, data?.me?.name, data?.we?.id]
  );

  return (
    //deferInitialization prop prevents initialization of LaunchDarkly SDK until user prop is defined
    <LDProvider clientSideID={process.env.REACT_APP_LAUNCH_DARKLY_ID} user={user} deferInitialization>
      {children}
    </LDProvider>
  );
};

export default FeatureContextComponent;
