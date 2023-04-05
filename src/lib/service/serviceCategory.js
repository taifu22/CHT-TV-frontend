import Axios from './CallAxiosService';

//function to add new datacatzgory to dashBoard Admin
let addNewDataCategory = (token, data) => { 
  console.log(token);
    let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
    }
    let body = {category: data}; 
    return Axios.patch('api/admin/add-new-category', body, config); 
}

//fonction to get list of categoryes to dashboard admin
let getAllCategories = (token) => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    let body = {}
    return Axios.post('api/admin/get-category',body, config);
  }

//function to delete a category from dshBoard admin
let deleteDataCategory = (token) => {
    let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
    }
    let body = {id:id}
    return Axios.patch('api/admin/dashBoard/products/delete', body, config);
}

export default { addNewDataCategory, deleteDataCategory, getAllCategories }