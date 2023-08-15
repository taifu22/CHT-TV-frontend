import Axios from './CallAxiosService';

//function to add new data product to cart
let addNewDataProductCart = (token, data) => { 
    let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
    } 
    return Axios.post('api/cart/add-new-cart', data, config);  
}

//fonction to get list of promos code to dashboard admin
let getAllProductsCart = (token) => {
  let config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }
  const data = {};
  return Axios.post('api/cart/get-cart', data, config);
  }

//function to delete a promos code from dshBoard admin
let deleteDataProductCart = (token, id) => {
    let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
    }
    let body = {id:id}
    return Axios.patch('api/cart/delete-cart', body, config); 
}

//update data quantity of product's cart
let updateQuantityProductCart = (token, id, quantity) => {
  let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
  }
  let body = {id: id, quantity: quantity}
  return Axios.patch('api/cart/update-quantity-product', body, config); 
}

//function to delete all data products from user's cart
let deleteAllDataProductCart = (token) => {
  let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
  }
  let body = {}
  return Axios.patch('api/cart/delete-all-data-cart', body, config);  
}

export default { addNewDataProductCart, getAllProductsCart, deleteDataProductCart, deleteAllDataProductCart, updateQuantityProductCart }