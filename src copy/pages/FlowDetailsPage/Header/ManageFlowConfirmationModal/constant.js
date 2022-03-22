const MODAL_KEYS = {
  delete: 'delete',
  unpublish: 'unpublish',
  discardChanges: 'discardChanges',
};

const ACTION_KEY_MAP = {
  [MODAL_KEYS.delete]: 'delete',
  [MODAL_KEYS.unpublish]: 'unpublish',
  [MODAL_KEYS.discardChanges]: 'discard changes in',
};

export { ACTION_KEY_MAP, MODAL_KEYS };
