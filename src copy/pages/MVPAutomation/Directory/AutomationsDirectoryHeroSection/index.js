import React from 'react';

import FeaturedContents from './FeaturedContents';
import { useGetHeroContent } from './useGetHeroContent';
import LoadingState from './LoadingState';

const AutomationsDirectoryHeroSection = () => {
  const { heroContents, loading } = useGetHeroContent();

  return (
    <div>
      {loading && <LoadingState />}
      {!loading && <FeaturedContents featuredContents={heroContents} />}
    </div>
  );
};

export default AutomationsDirectoryHeroSection;
