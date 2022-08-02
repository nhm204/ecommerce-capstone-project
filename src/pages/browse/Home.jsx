import React, { useEffect } from 'react';
import './Home.scss';
import { useQueryGetProductList } from '../../data/queries/getProduct';
import Navbar from '../../common/Header/Navbar';
import FeaturedProducts from './components/Products/FeaturedProducts/FeaturedProducts';
import { Banner1, Banner2 } from './components/Banner/Banner';


const Home = () => {
  const { data } = useQueryGetProductList();
  const products = data?.products; 

  useEffect(() => { document.title = `Home. Nike For You` }, []);

  return (
    <div className='home'>
      <Navbar link={'Home'} />
      <Banner1 />
      <div className='header'>
        <h2>Feature Products</h2>
        <p>Featured Collection For This Autumn</p>
      </div>
      <FeaturedProducts products={products} />
      <Banner2 />
      <div className='header'>
        <h2>New Arrivals</h2>
        <p>New Collection New Modern Design</p>
      </div>

    </div>
  )
}

export default Home;