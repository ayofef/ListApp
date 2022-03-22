import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { DialogContextProvider } from './DialogContext';

const Dialog = React.lazy(() => import('./Dialog'));

const SurveyDialog = ({ handleClose }) => (
  <Suspense fallback={null}>
    <DialogContextProvider value={{ handleClose }}>
      <Dialog />
    </DialogContextProvider>
  </Suspense>
);

SurveyDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default SurveyDialog;
