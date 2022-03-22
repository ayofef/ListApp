import { useState, useCallback } from 'react';

export const useModal = (initialMode = false) => {
  const [modalOpen, setModalOpen] = useState(initialMode);
  const toggle = () => setModalOpen(!modalOpen);
  return [modalOpen, setModalOpen, toggle];
};

export const useMultipleModal = (initialMode = '') => {
  const [modalOpen, setModalOpen] = useState(initialMode);
  const closeModal = useCallback(() => setModalOpen(''), []);
  const setModal = useCallback((name) => setModalOpen(name), []);

  return [modalOpen, closeModal, setModal];
};
