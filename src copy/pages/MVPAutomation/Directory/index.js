import React, { useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import AutomationsDirectoryHeroSection from './AutomationsDirectoryHeroSection';
import DirectoryList from './DirectoryList';
import useSearch from '../../../hooks/useSearch';
import { RECOMMENDATION_KEY } from './DirectoryList/constant';

const Directory = () => {
  const [params, setParams] = useSearch();

  useEffect(() => {
    if (isEmpty(params)) {
      setParams({
        automationCategories: RECOMMENDATION_KEY,
      });
    }
  }, [params, setParams]);

  return (
    <div>
      <AutomationsDirectoryHeroSection />
      <DirectoryList />
    </div>
  );
};

export default Directory;
