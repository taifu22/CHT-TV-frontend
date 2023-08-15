import Axios from './CallAxiosService';

//function to add new data promos code to dashBoard Admin
let addNewDataPromosCode = (token, data) => { 
    let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
    } 
    return Axios.post('api/admin/add-new-PromosCode', data, config);  
}

//fonction to get list of promos code to dashboard admin
let getAllPromosCode = () => {
    return Axios.get('api/admin/get-PromosCode');
  }

//function to delete a promos code from dshBoard admin
let deleteDataPromosCode = (token, id, name) => {
    let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
    }
    let body = {id:id, name:name}
    return Axios.patch('api/admin/delete-PromosCode', body, config);  
}

export default { addNewDataPromosCode, getAllPromosCode, deleteDataPromosCode }