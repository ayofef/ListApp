const parseCategoryLabel = (category) =>
  category
    ?.toLowerCase()
    ?.split('_')
    ?.join(' ');

const parseIntegrationText = (integration) =>
  integration
    ?.toLowerCase()
    ?.split('_')
    ?.join(' ')
    ?.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());

export { parseCategoryLabel, parseIntegrationText };
