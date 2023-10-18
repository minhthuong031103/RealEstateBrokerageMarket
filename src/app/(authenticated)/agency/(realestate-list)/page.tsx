import React from 'react';
import SearchBarAndCreate from '../(components)/SearchBarAndCreate';
import RealEstateCard from '../(components)/RealEstateCard';

const page = async () => {
  return (
    <div className="m-4">
      <SearchBarAndCreate />
      <RealEstateCard />
      <RealEstateCard />
      <RealEstateCard />
      <RealEstateCard />
      <RealEstateCard />
    </div>
  );
};

export default page;
