import React, { useState, useEffect } from 'react';
import './styles.css';
import MainLayout from '../../components/layouts/MainLayout';
import { useGlobalContext } from '../App/context';
import DashboardRoutes from '../../routes/DashboardRoutes/DashboardRoutes';
import { localStorageService } from '../../utils/localStorageService';
import { STORAGE_KEYS } from '../../constants/storage';
import FirstTimeEntry from '../../components/FirstTimeEntry';

const Dashboard = () => {
  const [isConfirm, setIsConfirm] = useState(localStorageService.getItem(STORAGE_KEYS.getMeData) === 'set');

  const { getMeData, getMeStopPolling } = useGlobalContext();

  useEffect(() => {
    getMeStopPolling();
  }, [getMeStopPolling]);

  useEffect(() => {
    if (getMeData) {
      localStorageService.setItem(STORAGE_KEYS.getMeData, 'set');
      setIsConfirm(true);
    }
  }, [getMeData]);

  const isReady = !!getMeData && isConfirm;

  return (
    <>
      <MainLayout>{isReady && <DashboardRoutes />}</MainLayout>
      <FirstTimeEntry />
    </>
  );
};

export default Dashboard;
