import { useRef, useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

export const useUnload = (fn) => {
  const cb = useRef(fn);

  useEffect(() => {
    const onUnload = cb.current;

    window.addEventListener('beforeunload', onUnload);

    return () => window.removeEventListener('beforeunload', onUnload);
  }, [cb]);
};

export const usePrompt = (message, when) => {
  const history = useHistory();
  const unblock = useRef(null);

  useEffect(() => {
    if (when) {
      unblock.current = history.block(message);
    } else {
      unblock.current = null;
    }
    return () => {
      if (unblock.current) {
        unblock.current();
      }
    };
  }, [when, history, message]);
};

export const useCallbackPrompt = (when) => {
  const history = useHistory();
  const [showPrompt, setShowPrompt] = useState(false);
  const [lastLocation, setLastLocation] = useState(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);

  const cancelNavigation = useCallback(() => {
    setShowPrompt(false);
  }, []);

  const handleBlockedNavigation = useCallback(
    (nextLocation) => {
      if (!confirmedNavigation) {
        setShowPrompt(true);
        setLastLocation(nextLocation);
        return false;
      }
      return true;
    },
    [confirmedNavigation]
  );

  const confirmNavigation = useCallback(() => {
    setShowPrompt(false);
    setConfirmedNavigation(true);
  }, []);

  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      history.push(lastLocation.pathname);
    }
  }, [confirmedNavigation, lastLocation, history]);

  usePrompt(handleBlockedNavigation, when);

  return [showPrompt, confirmNavigation, cancelNavigation];
};
