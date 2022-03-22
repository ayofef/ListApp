import React from 'react';
import PropTypes from 'prop-types';

import Drawer from '../components/Drawer';
import IssuesFilter from '../../Payments/Issues/IssuesFilter';

const PaymentIntentsDrawer = ({ drawerOpen, toggleDrawer }) => {
  return (
    <Drawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} title="Filter">
      <IssuesFilter />
    </Drawer>
  );
};

PaymentIntentsDrawer.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default PaymentIntentsDrawer;
