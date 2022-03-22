const TABS_SETTINGS = {
  nodes: { label: 'nodes', value: '0' },
  recipes: { label: 'recipes', value: '1' },
};

const TABS = [TABS_SETTINGS.nodes, TABS_SETTINGS.recipes];

const a11yProps = (i) => ({
  id: `node-tab-${i}`,
  ariaControls: `node-tabpanel-${i}`,
});

export { TABS, a11yProps, TABS_SETTINGS };
