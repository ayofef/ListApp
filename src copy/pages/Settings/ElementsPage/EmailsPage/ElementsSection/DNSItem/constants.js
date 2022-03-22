const SETTINGS = new Map([
  [true, { buttonTitle: 'Disable authentication', status: 'Authenticated', variant: 'fulfilled' }],
  [false, { buttonTitle: 'Authenticate', status: 'Unauthenticated', variant: 'pending' }],
  [undefined, { buttonTitle: 'Add new domain' }],
]);

const getSettings = (status) => SETTINGS.get(status);

export { getSettings };
