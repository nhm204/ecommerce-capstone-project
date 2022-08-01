import React, { useEffect } from 'react';
import './Home.scss';
import Navbar from '../../common/Header/Navbar';
import FeaturedProducts from './components/Products/FeaturedProducts/FeaturedProducts';
import { Banner1, Banner2 } from './components/Banner/Banner';


const Home = () => {
  useEffect(() => {
    document.title = `Home. Nike For You`;
  }, []);

  return (
    <div className='home'>
      <Navbar link={'Home'} />
      <Banner1 />
      <div className='header'>
        <h2>Feature Products</h2>
        <p>Summer Collection New Modern Design</p>
      </div>
      <FeaturedProducts />
      <Banner2 />
    </div>
  )
}

export default Home;