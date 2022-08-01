import React from 'react';
import './Home.scss';
import Navbar from '../../common/Header/Navbar';
import FeaturedProducts from './components/Products/FeaturedProducts/FeaturedProducts';


const Home = () => {
  return (
    <div className='home'>
      <Navbar link={'Home'} />
      <div className='header'>
        <h2>Feature Products</h2>
        <p>Summer Collection New Modern Design</p>
      </div>
      <FeaturedProducts />
    </div>
  )
}

export default Home;