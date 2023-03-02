import Axios from './CallAxiosService';

//function to add new dataOrder
let addNewDataOrder = (token, data) => { 
  console.log(token);
    let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
    }
    let body = data 
    return Axios.patch('api/create-new-order', body, config); 
}

//function to delete an order with stripe cancelled payment
let deleteNewOrder = (token) => {
  let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
  }
  let body = {};
  return Axios.patch('api/cancel-new-order', body, config);
}

export default { addNewDataOrder, deleteNewOrder }