import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const KEY = 'IS_HISTORY_LISTEN_ON';
/* eslint-disable no-console */
const logger = (group) => (location, action) => {
  console.group(group);
  console.log('action:', action);
  console.group('location');
  console.log(location);
  console.groupEnd();
  console.groupEnd();
};
/* eslint-enable */

const useHistoryListen = () => {
  const history = useHistory();

  useEffect(() => {
    if (process.env.NODE_ENV === 'production' || localStorage.getItem(KEY) === null) return;

    logger('initial history')(history.location, history.action);

    history.listen(logger('listen'));
  }, [history]);
};

export default useHistoryListen;
