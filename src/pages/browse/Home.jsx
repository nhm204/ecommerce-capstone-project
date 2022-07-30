import React from 'react';
import Navbar from '../../common/Header/Navbar';
import { FeatureProducts } from './components/Products/ProductList';

const Home = () => {
  return (
    <div>
      <Navbar />
      <FeatureProducts />
    </div>
  )
}

export default Home;