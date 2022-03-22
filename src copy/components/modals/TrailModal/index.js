import React from 'react';
import { func } from 'prop-types';
import FullScreenModalLayout from '../../layouts/FullScreenModalLayout';
import { useGlobalContext } from '../../../containers/App/context';
import PlanSelection from '../../../pages/PlanSelection';
import SimpleModal from '../SimpleModal';

const TrailModal = ({ onClose, refetchData }) => {
  const { IS_TABLET } = useGlobalContext();
  return (
    <FullScreenModalLayout onClose={onClose} padding={IS_TABLET ? '30px 40px' : '32px 32px 60px 110px'}>
      <SimpleModal fullScreen open handleClose={onClose}>
        <PlanSelection billing refetchData={refetchData} onClose={onClose} />
      </SimpleModal>
    </FullScreenModalLayout>
  );
};

TrailModal.propTypes = {
  onClose: func.isRequired,
  refetchData: func.isRequired,
};

export default TrailModal;
