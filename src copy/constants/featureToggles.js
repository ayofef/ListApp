const FEATURE_TOGGLES_KEYS = {
  MULTIPLE_FLOW: 'multipleFlow',
  /* MULTIPLE_FLOW
  - Flows back to main nav with the route component
  - Hide automations nav and the route component
  - Make the flow details page active in src/routes/RestrictedRoutes.js
  - Import historic payment → Select flow modal
  - APM
    - Connection form experience
    - Payment method section in connection details
  */
  INSIGHTS_NAV: 'insightsNav',
  /* INSIGHTS_NAV
  - Insights back to main nav
  - Removes insights from payments sub nav
  - Attach insight route component
  */
  SETTINGS_ELEMENTS_NAV: 'settingsElementsNav',
  /*
  - Adds Elements to settings sub nav with the route component
  - Makes payments issues route active
  */
};

export { FEATURE_TOGGLES_KEYS };
