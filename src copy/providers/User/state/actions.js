import { PATCH, SET_IS_DEMO, SET_IS_GREET, SET_IS_SWITCHING } from './types';

const buildAction = (type) => (payload) => ({ type, payload });

const setIsDemo = buildAction(SET_IS_DEMO);
const setIsGreet = buildAction(SET_IS_GREET);
const patch = buildAction(PATCH);
const setIsSwitching = buildAction(SET_IS_SWITCHING);

export { setIsDemo, setIsGreet, setIsSwitching, patch };
