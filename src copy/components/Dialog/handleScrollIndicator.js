export const handleScrollIndicator = (e, state, toggleState, offset = 0) => {
  const getBottom = e.target.scrollHeight - e.target.scrollTop - offset;
  /** -5 = calculation was wrong on mozilla - windows */
  const bottom = getBottom - 5 <= e.target.clientHeight;

  if (bottom && state) {
    toggleState();
    return;
  }
  if (!bottom && !state) {
    toggleState();
  }
};
