import React from 'react';
import './ProductCard.scss';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {


  return (
    <Link to={`/shop/${product.name}`} className='product'>
      <img src={product.pictures[0]} alt='Nike Shoes' />
      <div className='info'>
        <div className='description'>{product.description}</div>
        <h5 className='name'>Nike {product.name}</h5>
        <div className='price'>${product.price}</div>
      </div>
      { product.stock !== 0 ? <button className='add'>Add to Bag</button> : <button className='add disable'>Out of Stock</button> }
    </Link>
  )
}

export default Product;