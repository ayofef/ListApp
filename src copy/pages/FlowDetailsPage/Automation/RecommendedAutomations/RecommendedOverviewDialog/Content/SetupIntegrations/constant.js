const parseLabel = (str, dataLength) => {
  return `${dataLength} ${str}${dataLength > 1 ? 's' : ''}`;
};

const MENU_ITEMS_MAP = {
  difficultyLevel: 'difficultyLevel',
  difficultyDescription: 'difficultyDescription',
  integration: 'integrations',
};

const MENU_ITEMS_TITLE_MAP = {
  [MENU_ITEMS_MAP.difficultyLevel]: 'Difficulty Level',
  [MENU_ITEMS_MAP.integration]: 'Integration',
};

const MENU_ITEMS = [
  {
    dataKey: MENU_ITEMS_MAP.difficultyLevel,
    subDataKey: MENU_ITEMS_MAP.difficultyDescription,
  },
  {
    dataKey: MENU_ITEMS_MAP.integration,
  },
];

const INTEGRATION_FN_MAP = {
  [MENU_ITEMS_MAP.integration]: (integrationItem) => {
    return {
      title: parseLabel(integrationItem.title, integrationItem?.data?.length),
      descriptions: integrationItem?.data,
    };
  },
  [MENU_ITEMS_MAP.difficultyLevel]: (integrationItem) => {
    return {
      title: `${integrationItem?.data} setup`,
      descriptions: integrationItem?.subData,
    };
  },
};

export { MENU_ITEMS_MAP, MENU_ITEMS_TITLE_MAP, MENU_ITEMS, INTEGRATION_FN_MAP };
