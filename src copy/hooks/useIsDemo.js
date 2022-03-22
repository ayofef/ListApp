import { useUserSelector } from '../providers/User/UserContext';

import { selectIsDemo } from '../providers/User/state/selectors';

/**
 * Check if is Demo user
 *
 * returns Boolean
 */

const useIsDemo = () => useUserSelector(selectIsDemo);

export default useIsDemo;
