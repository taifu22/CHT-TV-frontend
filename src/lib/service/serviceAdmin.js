import Axios from "./CallAxiosService";

//function to delete one product data from the admin dashboard
let deleteProductAdminService = (id, token) => {
    let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
    }
    let body = {id:id}
    return Axios.patch('api/admin/dashBoard/products/delete', body, config);
}

//function to add a new product from the admin dashboard
let addProductAdminService = (token, body) => {
  let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
  }
  return Axios.post('api/admin/dashBoard/products/add', body, config);
}

//function to update a product from the admin dashboard
let updateProductAdminService = (token, body) => {
  let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
  }
  return Axios.post('api/admin/dashBoard/products/update', body, config);
}

//function to add a new order and view it in the admin dashboard panel
let addOrderAdminService = (token, product, total, delivery, orderNumber, email, promo) => {
  let config = {
      headers: {
        'Authorization': 'Bearer ' + token 
      }
  }
  let body = {
    product: product,
    total: total,
    delivery: delivery, 
    orderNumber: orderNumber,
    email: email,
    promo: promo
  }
  return Axios.post('api/admin/dashBoard/orders/add', body, config);
}

//function to view the complete list of orders in the admin dashboard panel
let getAllOrders = (token) => {
  let config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }
  let body = {}
  return Axios.post('api/admin/dashBoard/orders/get',body, config);
}

//function to add a new order and view it in the admin dashboard panel
let addOpinionAdminService = (token, data) => {  
  let config = {
      headers: {
        'Authorization': 'Bearer ' + token 
      }
  }

  return Axios.post('api/admin/dashBoard/opinions/add', data, config); 
}

//function to view the complete list of opinions in the admin dashboard panel
let getAllOpinions = (token) => {
  let config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }
  let body = {}
  return Axios.post('api/admin/dashBoard/opinions/get',body, config);
}

//function to create a new report for an user opinion
let setReportOpinion = (token, data) => {
  let config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }
  const date = new Date();
  const dataFormat = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()
  let body = {
    id: data,
    date: dataFormat 
  }
  return Axios.patch('api/admin/dashBoard/opinions/add-report-opinion',body, config);
}

//function to delete an report user opinion
//en gros l'admin verifie que la signalation n'est pas bonne, donc il decide de supprimer la signalation et garder l'avis
let deleteReportOpinion = (token, id, email) => {
  let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
  }
  let body = {id: id, email: email}
  return Axios.patch('api/admin/dashBoard/opinions/delete-report-opinion', body, config);
}

//function to delete one opinion data from the admin dashboard
let deleteOpinionAdminService = (token, data) => {
  let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
  }
  return Axios.patch('api/admin/dashBoard/opinions/delete', data, config);
}
  
export default { deleteProductAdminService, 
                 addProductAdminService, 
                 addOrderAdminService, 
                 getAllOrders, 
                 addOpinionAdminService, 
                 getAllOpinions, 
                 setReportOpinion, 
                 deleteReportOpinion,
                 deleteOpinionAdminService,
                 updateProductAdminService }