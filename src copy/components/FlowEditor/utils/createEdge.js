export const createEdge = (source, target, type, sourceHandle) => ({
  id: `${sourceHandle === 'else' ? 'e-else-' : 'e-'}${source}${target}`,
  source,
  target,
  sourceHandle,
  type,
});
