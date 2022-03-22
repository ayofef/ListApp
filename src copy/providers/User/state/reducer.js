import { SET_IS_DEMO, SET_IS_GREET, PATCH, SET_IS_SWITCHING } from './types';
import { mergeDeep } from '../../../utils/mergeDeep';

const SLICES = {
  [SET_IS_DEMO]: (state, { payload }) => ({ ...state, isDemo: payload }),
  [SET_IS_GREET]: (state, { payload }) => ({ ...state, isGreeted: payload }),
  [SET_IS_SWITCHING]: (state, { payload }) => ({ ...state, isSwitching: payload }),
  [PATCH]: (state, { payload }) => mergeDeep(state, payload),
};

const reducer = (state, action) => {
  const slice = SLICES[action.type];

  if (slice === undefined) {
    return state;
  }

  return slice(state, action);
};

export { reducer };
