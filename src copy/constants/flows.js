const ACTIONS = {
  Pause: 'Pause',
  Unpause: 'Unpause',
  Archive: 'Archive',
  UnArchive: 'Un archive',
  Duplicate: 'Duplicate',
};

const STATUSES = {
  NEVER_PUBLISHED: 'NEVER_PUBLISHED',
  NEEDS_CONFIG: 'NEEDS_CONFIG',
  ACTIVE: 'ACTIVE',
  DISABLED: 'DISABLED',
  ARCHIVED: 'ARCHIVED',
};

const OMIT_KEYS = {
  [STATUSES.NEVER_PUBLISHED]: [ACTIONS.Unpause, ACTIONS.UnArchive],
  [STATUSES.NEEDS_CONFIG]: [ACTIONS.Unpause, ACTIONS.UnArchive],
  [STATUSES.ACTIVE]: [ACTIONS.Unpause, ACTIONS.UnArchive],
  [STATUSES.DISABLED]: [ACTIONS.Pause, ACTIONS.UnArchive],
  [STATUSES.ARCHIVED]: [ACTIONS.Unpause, ACTIONS.Archive],
};

export { ACTIONS, OMIT_KEYS, STATUSES };
