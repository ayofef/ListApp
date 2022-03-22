import { useEffect } from 'react';
import { Userpilot } from 'userpilot';
import omit from 'lodash/omit';
import { useLocation } from 'react-router-dom';
import useSearch from '../useSearch';
import { USER_PILOT_TOUR_SEARCH_KEY } from './constant';
import { useUserSelector } from '../../providers/User/UserContext';
import { selectIsDemo } from '../../providers/User/state/selectors';
import { useGlobalContext } from '../../containers/App/context';

const SHOULD_REPLACE = true;

const useUserPilotTour = () => {
  const isDemo = useUserSelector(selectIsDemo);
  const { getMeLoading, getMeData } = useGlobalContext();
  const { pathname, search } = useLocation();

  const [searchParams, setSearchParams] = useSearch();

  useEffect(() => {
    if (getMeData?.me) {
      const {
        id: userId,
        name,
        email: { address },
      } = getMeData?.me;

      Userpilot.identify(userId, {
        name: name,
        email: address,
        createdAt: new Date().toISOString().split('T')[0],
      });
    }
  }, [getMeData?.me]);

  useEffect(() => {
    if (isDemo && search?.includes(USER_PILOT_TOUR_SEARCH_KEY)) {
      Userpilot.reload();
    }
  }, [isDemo, search, pathname, getMeLoading]);

  useEffect(() => {
    // add search key ${USER_PILOT_TOUR_SEARCH_KEY}=true across the app if session storage value is true
    if (isDemo && !searchParams[USER_PILOT_TOUR_SEARCH_KEY]) {
      setSearchParams(
        (prevSearchParams) => ({ ...prevSearchParams, [USER_PILOT_TOUR_SEARCH_KEY]: true }),
        SHOULD_REPLACE
      );
    }

    // remove the search key when the user is not in demo mode
    if (!isDemo && searchParams[USER_PILOT_TOUR_SEARCH_KEY]) {
      setSearchParams((prevSearchParams) => omit(prevSearchParams, USER_PILOT_TOUR_SEARCH_KEY));
    }
  }, [searchParams, setSearchParams, pathname, isDemo]);

  return null;
};

export { useUserPilotTour };
