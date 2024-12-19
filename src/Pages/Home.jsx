import React from 'react';
import Hero from '../Components/Hero/Hero';
import Popular from '../Components/Popular/Popular';
import Offers from '../Components/Offers/Offers';
import NewCollections from '../Components/NewCollection/NewCollections';
import Populara from '../Components/Popular/popback';

const Home = () => {
  return (
    <div>
      <Hero />
      <Popular />
      <Populara/>
      <Offers />
      <NewCollections />
    </div>
  );
};

export default Home;
