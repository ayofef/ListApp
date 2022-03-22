import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'qs';

const keywords = {
  true: true,
  false: false,
  null: null,
  undefined,
};

const decoder = (str, _ /*decoder*/, charset) => {
  const strWithoutPlus = str.replace(/\+/g, ' ');
  if (charset === 'iso-8859-1') {
    // unescape never throws, no try...catch needed:
    return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
  }

  if (/^(\d+|\d*\.\d+)$/.test(str)) {
    return parseFloat(str);
  }

  if (str in keywords) {
    return keywords[str];
  }

  // utf-8
  try {
    return decodeURIComponent(strWithoutPlus);
  } catch (e) {
    return strWithoutPlus;
  }
};
/** @type IParseOptions */
const PARSE_OPTIONS = { decoder, ignoreQueryPrefix: true };
/** @type IStringifyOptions */
const STRINGIFY_OPTIONS = { encode: false };

const useSearch = () => {
  const history = useHistory();
  const { search } = useLocation();
  const searchParams = useMemo(() => qs.parse(search, PARSE_OPTIONS), [search]);
  const searchParamsRef = useRef({});

  useEffect(() => {
    searchParamsRef.current = searchParams;
  }, [searchParams]);

  const setSearchParams = useCallback(
    (updater, shouldReplace) => {
      const params = typeof updater === 'function' ? updater(searchParamsRef.current) : updater;
      const updateFn = shouldReplace ? history.replace : history.push;
      updateFn({ ...history.location, search: qs.stringify(params, STRINGIFY_OPTIONS) });
    },
    [history]
  );

  return [searchParams, setSearchParams];
};

export default useSearch;
export { PARSE_OPTIONS, STRINGIFY_OPTIONS };
