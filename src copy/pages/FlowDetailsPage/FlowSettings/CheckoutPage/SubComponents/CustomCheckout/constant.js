const ID_PREFIX = 'connection-provider:';

const parseConnectionId = (id) => (id?.startsWith(ID_PREFIX) ? id : `${ID_PREFIX}${id}`);
export { parseConnectionId };
