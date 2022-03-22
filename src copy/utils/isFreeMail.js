const freeEmailDomains = require('free-email-domains');

export const isFreeMail = (email) => {
  if (typeof email !== 'string') return false;

  const domain = email.split('@')[1]?.toLowerCase();
  return freeEmailDomains?.includes(domain);
};
