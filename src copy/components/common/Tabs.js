import React, { useCallback, useEffect } from 'react';
import { string, arrayOf, shape, node, bool, number } from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useLocation } from 'react-router-dom';

import THEME from '../../constants/theme';

const TabsStyled = withStyles({
  root: {
    padding: 0,
    margin: '0 0 16px',
    borderBottom: '1px solid #E6E9EC',
    backgroundColor: '#fff',
    width: '100%',
    position: 'relative',
  },
  indicator: {
    height: '2px',
    bottom: '0px',
    backgroundColor: THEME.primaryColors.primary,
  },
})(Tabs);

const TabStyled = withStyles((theme) => ({
  root: {
    padding: '0 0 20px 0px',
    margin: 0,
    textTransform: 'none',
    minWidth: 48,
    // minWidth: 72,
    marginRight: theme.spacing(3), //24px
    fontFamily: ['"NeurialGrotesk" , "sans-serif"'].join(','),
    fontSize: '14px',
    fontWeight: 500,
    letterSpacing: 'unset',
    transition: 'all 0.3s ease-out',
    color: THEME.greyColors.grey1,
    '&>span': {
      alignItems: 'flex-start',
    },
    '&:hover': {
      opacity: 1,
      '&>span': {
        // color: `${THEME.secondaryColors.purple} !important`,
        color: `${THEME.primaryColors.primary} !important`,
      },
    },
    '&:focus': {
      color: THEME.primaryColors.primary,
    },
  },
  selected: {
    color: THEME.primaryColors.primary,
  },
}))(Tab);
const TabPanel = ({ children, value, index, ...other }) => (
  <Typography
    component="div"
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && <Box>{children}</Box>}
  </Typography>
);

TabPanel.propTypes = {
  children: node.isRequired,
  index: number.isRequired,
  value: number.isRequired,
};
/**
 * @param {number} i
 * */
const a11yProps = (i) => ({
  id: `simple-tab-${i}`,
  ariaControls: `simple-tabpanel-${i}`,
});

const SimpleTabsStyles = makeStyles(() => ({
  root: {
    padding: 0,
    margin: 0,
    boxShadow: 'none',
    width: '100%',
    backgroundColor: 'transparent!important',
  },
  head: {
    backgroundColor: 'transparent!important',
  },
  body: {
    backgroundColor: 'transparent!important',
  },
}));

const SimpleTabs = ({ tabs, color, centered }) => {
  const classes = SimpleTabsStyles();
  const [value, setValue] = React.useState(0);
  const { state } = useLocation();
  useEffect(() => {
    if (state?.defaultTab) {
      setValue(state?.defaultTab);
    }
  }, [state]);

  const handleChange = useCallback((_, newValue) => setValue(newValue), []);
  return (
    <div className={classes.root}>
      <TabsStyled
        color={color}
        className={classes.head}
        centered={centered}
        value={value}
        onChange={handleChange}
        aria-label="simple tabs"
      >
        {tabs.map(({ label, id }, i) => {
          const { id: _id, ariaControls } = a11yProps(i);

          return <TabStyled color={color} key={label} label={label} id={id || _id} aria-controls={ariaControls} />;
        })}
      </TabsStyled>

      {tabs.map(({ label, node: childNode }, i) => (
        <TabPanel className={classes.body} key={label} value={value} index={i}>
          {childNode}
        </TabPanel>
      ))}
    </div>
  );
};

SimpleTabs.propTypes = {
  tabs: arrayOf(
    shape({
      label: string.isRequired,
      node: node.isRequired,
    }).isRequired
  ).isRequired,
  color: string,
  centered: bool,
};

SimpleTabs.defaultProps = {
  color: undefined,
  centered: false,
};

export default SimpleTabs;
export { TabsStyled, TabStyled, TabPanel, SimpleTabsStyles };
