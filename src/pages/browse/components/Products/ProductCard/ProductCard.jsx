import React, { useCallback } from 'react';
import './ProductCard.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useMutationAddItemToCart } from '../../../../../data/mutations/addToCart';
import { useQueryGetCustomer } from '../../../../../data/queries/getCustomer';


const Product = ({ product }) => {
  const [ addItemToCartMutation ] = useMutationAddItemToCart();
  const customerQuery = useQueryGetCustomer();
  const navigate = useNavigate();

  const handleAdd = useCallback(() => {
    if (product.stock === 1 && product.colors.length === 1 && product.sizes.length === 1) {
      addItemToCartMutation ({
        variables: {
          customerId: "hmy",
          item: {
            productId: product.id,
            color: product.colors[0].name,
            size: product.sizes[0],
            quantity: 1
          }
        }
      }).then(() => {
        customerQuery.refetch();
      })
    } else {
      navigate(`/shop/${product.id}`)
    }
  }, [addItemToCartMutation, product?.stock, product?.id, product?.colors, product?.sizes, navigate, customerQuery]);

  return (
    <div className='product-wrapper'>
      <Link to={`/shop/${product.id}`} className='product'>
        <img src={product.pictures[0]} alt={product.name} />
        <div className='info'>
          <div className='description'>{product.description}</div>
          <h5 className='name'>Nike {product.name}</h5>
          <div className='price'>${product.price}</div>
        </div>
      </Link>
      { product.stock !== 0 ? <button className='add' onClick={handleAdd}>Add to Bag</button> : <button className='add disable'>Out of Stock</button> }
    </div>
  )
}

export default Product;