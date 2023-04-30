import Axios from './CallAxiosService';

//function to add new datacatzgory to dashBoard Admin
let addNewDataCategory = (token, data) => { 
    let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
    } 
    return Axios.post('api/admin/add-new-category', data, config); 
}

//fonction to get list of categoryes to dashboard admin
let getAllCategories = () => {
    return Axios.get('api/admin/get-categorys');
  }

//function to delete a category from dshBoard admin
let deleteDataCategory = (token, id) => {
    let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
    }
    let body = {id:id}
    return Axios.patch('api/admin//delete-category', body, config);
}

export default { addNewDataCategory, deleteDataCategory, getAllCategories }