import { gql, useQuery } from '@apollo/client'

const GET_PRODUCTS = gql `
{
  products {
    id
    name
    price
    stock
    colors {
      name
    }
    description
    categories
    pictures
    sizes
  }
}
`;


const GET_PRODUCT = gql `
{
  product(id: "b3131ffe-f034-4b0e-ab55-cfca897f7106") {
    name
    price
    colors {
      name
    }
    description
    categories
    pictures
    sizes
  }
}
`;



export const useQueryGetProductList = () => useQuery(GET_PRODUCTS);
export const useQueryGetProduct = () => useQuery(GET_PRODUCT);