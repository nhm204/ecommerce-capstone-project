import React, { useCallback, useState, useEffect } from 'react';
import Navbar from '../../../../../common/Header/Navbar';
import './ProductDetail.scss';
import { useParams } from 'react-router-dom';
import { useQueryGetProductList } from '../../../../../data/queries/getProduct';
import { useQueryGetCustomer } from '../../../../../data/queries/getCustomer';
import { useMutationAddItemToCart } from '../../../../../data/mutations/addToCart';


const ProductDetail = () => {
  const { loading, error, data } = useQueryGetProductList();
  const customerQuery = useQueryGetCustomer();
  const [ addItemToCartMutation ] = useMutationAddItemToCart();
  const [ size, setSize ] = useState();
  const [ color, setColor ] = useState();
  const paramValue = useParams();
  const productId = paramValue.id;
  

  const product = data?.products.find(element => element.id === paramValue.id);
  let productImage = product?.pictures?.slice(1); // Remove the first element of picture array
  const colorArr = product?.colors.map((color) => color.name.toLowerCase());

  useEffect(() => {
    document.title = `Nike ${product?.name}`
  }, [product?.name]);

  const handleAdd = useCallback(() => {
    addItemToCartMutation ({
      variables: {
        customerId: "hmy",
        item: {
          productId: product.id,
          color: color,
          size: size,
          quantity: 1
        }
      }
    }).then(() => {
      customerQuery.refetch();
    })
    console.log('re-render')
  }, [addItemToCartMutation, product?.id, color, size, customerQuery]);

  console.log('color:' + color, 'size:' + size)

  if (error) return <h1>Error: {error} </h1>;
  if (loading) return <h2 style={{ textAlign: 'center', padding: '8vh 0', fontWeight: '500' }}>Loading your product...</h2>;

  
  return (
    <div id={productId}>
      <Navbar />
      <div className='product-detail'>
        <div className='image-container'>
          {
            productImage.map((picture, index) => (
              picture.includes('webm') ? <video key={index} src={picture} autoPlay={true} loop={true} playsInline="" tabIndex="-1" muted={true}/> : <img key={index} src={picture} alt='shoes' />
            ))
          }
        </div>
        <div className='detail'>
          <h2 className='name'>Nike {product.name}</h2>
          <h4 className='desc'>{product.description}</h4>
          <p className='price'>${product.price}</p>
          <div className='size-selection'>
              <p>Select size</p>
              <div className="wrapper">
                { product.sizes.map((size, index) => (
                    <div key={index} className='size' onClick={() => setSize(size)}>{size}</div>
                ))}
              </div>
          </div>
          <div className='color-selection'>
              <p>Select color</p>
              <div className="wrapper">
                { colorArr.map((color, index) => (
                    <div key={index} className='color' style={{ backgroundColor: `${color}`}} onClick={() => setColor(color)}></div>
                ))}
              </div>
          </div>
          { product !== 0 ? <button className='add' onClick={handleAdd}>Add to Bag</button> : <button className='add disable'>Add to Bag</button> }
          <h4 className='quote'>Keep pushing your runs to the limit. The {product.name} keeps you going with the same supersoft feel that lets you feel the potential when your foot hits the pavement. We created the shoe with plenty of snappy responsiveness and our highest level of support to keep you feeling secure and competitive. It's one of our most tested shoes, still designed for you to stay on the track and away from the sidelines.</h4>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail;