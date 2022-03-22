import React from 'react';
import PropTypes from 'prop-types';

import Drawer from '../components/Drawer';
import CommentsDrawerContent from '../../Payments/CommentsDrawerContent';

const PaymentDetailsDrawer = ({ drawerOpen, toggleDrawer }) => {
  return (
    <Drawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} title="Comments">
      <CommentsDrawerContent />
    </Drawer>
  );
};

PaymentDetailsDrawer.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default PaymentDetailsDrawer;
