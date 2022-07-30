import React, { useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './ProductList.scss';
import Product from './ProductCard/ProductCard';
import Navbar from '../../../../common/Header/Navbar';
import { useQueryGetProductList } from '../../../../data/queries/getProduct';


const ShowProducts = ({ searchQuery }) => { 
  const [ selectedCategory, setSelectedCategory ] = useState();
  const [ color, setColor ] = useState();
  const [ price, setPrice ] = useState(0);
  const [ sortProduct, setSortProduct ] = useState();
  const { loading, error, data } = useQueryGetProductList();

  const productList = data?.products.map((product) => product);
  let filteredList = productList;


  // console.log(searchQuery)
  filteredList = useMemo(() => {
    if (searchQuery) {
      return productList.filter(product => product.name.toLowerCase().includes(searchQuery)); 
    }
    return filteredList;
  }, [filteredList, searchQuery, productList]);
  
  
  filteredList = useMemo(() => {
    if (color) {
      // return filteredList.filter(() => (productsColorObj.find(element => element === color)));
      return filteredList.filter(product => product.colors.map(color => color.name).find(element => element === color)); 
    }
    return filteredList;
  }, [color, filteredList]);
  // console.log(filteredList)

  
  filteredList = useMemo(() => {
    if (selectedCategory) {
      return filteredList.filter(product => product.categories.find(element => element === selectedCategory)); 
    }
    return filteredList;
  }, [selectedCategory, filteredList]);
  
  // const productsColorObj = productList.map((product) => product.colors.map((color) => color.name)); // lấy ra tên màu từ obj colors
  // const productsColorObj = data?.products.map((product) => product.colors); // lấy ra màu từ obj colors
  // let productColor = productsColorObj.map(product => product.find(item => item === 'White'))


  filteredList = useMemo(() => {
    if (price !== 0) {
      return filteredList.filter(product => product.price >= parseInt(price, 10));
    }
    return filteredList;
  }, [price, filteredList]);


  filteredList = useMemo(() => {
    if (sortProduct === 'ASC') {
      return filteredList.sort((a, b) => a.price - b.price);
    }
    if (sortProduct === 'DESC') {
      return filteredList.sort((a, b) => b.price - a.price);
    }
    if (sortProduct === 'A-Z') {
      return filteredList.sort((a, b) => a.name > b.name ? 1 : -1);
    }
    if (sortProduct === 'Z-A') {
      return filteredList.sort((a, b) => a.name > b.name ? -1 : 1);
    }
    return filteredList;
  }, [sortProduct, filteredList]);
  

  if (error) return <h1>Error: {error} </h1>;
  if (loading) return <h2>Loading... 🚀</h2>;

  return (
    <div className='filter-products'>
      <div className='filter'>
        <span>Gender</span>
        <div className='selection'>
          <div className='option' onClick={() => setSelectedCategory()}>All</div>
          <div className='option' onClick={() => setSelectedCategory('Men')}>Men</div>
          <div className='option' onClick={() => setSelectedCategory('Women')}>Women</div>
          <div className='option' onClick={() => setSelectedCategory('Unisex')}>Unisex</div>
        </div>
        <span>Lifestyle</span>
        <div className='selection'>
          <div className='option' onClick={() => setSelectedCategory('Jordan')}>Jordan</div>
          <div className='option' onClick={() => setSelectedCategory('Shoes')}>Shoes</div>
          <div className='option' onClick={() => setSelectedCategory('Running Shoes')}>Running Shoes</div>
          <div className='option' onClick={() => setSelectedCategory('Skateboarding')}>Skateboarding</div>
          <div className='option' onClick={() => setSelectedCategory('Training & Gym')}>Training &amp; Gym</div>
        </div>

        <div className='color-selection-header'>
          <span>Color</span>
          <span className='clear-color' onClick={() => setColor()}>Clear</span>
        </div>
        <div className='selection colors'>
          <div className='color' style={{ backgroundColor: "black" }} onClick={() => setColor('Black')}></div>
          <div className='color' style={{ backgroundColor: "aquamarine" }} onClick={() => setColor('Aquamarine')}></div>
          <div className='color' style={{ backgroundColor: "white" }} onClick={() => setColor('White')}></div>
          <div className='color' style={{ backgroundColor: "cornflowerblue" }} onClick={() => setColor('CornflowerBlue')}></div>
          <div className='color' style={{ backgroundColor: "lightsalmon" }} onClick={() => setColor('LightSalmon')}></div>
          <div className='color' style={{ backgroundColor: "rosybrown" }} onClick={() => setColor('RosyBrown')}></div>
          <div className='color' style={{ backgroundColor: "sandybrown" }} onClick={() => setColor('SandyBrown')}></div>
        </div>

        <span className='price'>Price: <span style={{ color: "darkorange" }}>${price}</span></span>
        <div className='price-container'>
          <input type="range" min='0' max='2000' className='slider' onChange={e => setPrice(e.target.value)} />
        </div>

        <div className='sort-product'>
          <span className='sort'>Sort by price</span>
          <div className='option' onClick={() => setSortProduct('ASC')}>Low to High</div>
          <div className='option' onClick={() => setSortProduct('DESC')}>High to Low</div>

          <span className='sort'>Sort by name</span>
          <div className='option' onClick={() => setSortProduct('A-Z')}>From A to Z</div>
          <div className='option' onClick={() => setSortProduct('Z-A')}>From Z to A</div>
          <div className='option default' onClick={() => setSortProduct()}>Reset</div>
        </div>
      </div>
      <ul className='product-list'>
        { filteredList.map((product => (
          <li key={product.id}>
            <Product product={product} />   
          </li>
        )))} 
      </ul>
    </div>
  )
}

const Products = () => {
  const [ searchQuery, setSearchQuery ] = useState();

  let searchValue = localStorage.getItem('searchValue');
  useEffect(() => setSearchQuery(searchValue), [searchValue]);


  return (
    <div className='products'>
      <Navbar setSearchQuery={setSearchQuery} searchValue={searchQuery}  />
      <div className='banner'> 
        <h2>#stayhome</h2>
        <p>Save more with coupons &amp; up to 70% off!</p>
      </div>
      <ShowProducts searchQuery={searchQuery}/> 
      <Outlet />
    </div>
  )
}

const FeatureProducts = () => {
  return (
    <div className='products'>
      <div className='header'>
        <h2>Feature Products</h2>
        <p>Summer Collection New Modern Design</p>
      </div>
      {/* <ul className='product-list'>
        { products.slice(0, 4).map(product => (
          <li key={product.id}>
            <Product product={product}/>   
          </li>
        ))}
      </ul> */}
    </div>
  )
}

export default Products;
export { FeatureProducts };