import Axios from './CallAxiosService';

//fonction to signup an user
let signup = (data) => {
    return Axios.post('api/auth/signup', data)
}

//fonction for signin the user
let signin = (data) => {
    return Axios.post('api/auth/signin', data)
}

//function to get data's user with the token received during the connection
let getProfile = (token) => {
    let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
    }
    let body = {key: "value"}
    return Axios.post('api/auth/profile', body, config);
}

//function to add new dataAddress
let addNewDataAddress = (token, data) => {
    let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
    }
    let body = data
    return Axios.patch('api/auth/profile/address', body, config);
}

//function to delete an user's address
let deleteAddressUser = (token, id) => {
    let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
    }
    let body = {id: id}
    return Axios.patch('api/auth/profile/address/delete', body, config);
}

//function to edit lastname and firstname 
let editLastFirstName = (token, data) => {
    let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
    }
    let body = data
    return Axios.patch('api/auth/profile/firstlastname', body, config);
}

//function to edit user's password
let editPassword = (token, data) => {
    console.log(data);
    let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
    }
    let body = data
    return Axios.patch('api/auth/profile/editpasswordoremail', body, config);
}

//function to upload an image profil
let uploadImageProfil = (token, data) => {
    let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
    }
    let body = data
    console.log(body); 
    return Axios.post('api/profile/editImageProfil', body, config); 
}

//function to add new dataAddress
let addNewDataFavoris = (token, data) => {
    let config = {
        headers: {
          'Authorization': 'Bearer ' + token 
        }
    }
    return Axios.patch('api/auth/profile/favoris', data, config);
}

//function to delete an user's address
let deleteFavorisUser = (token, id) => {
    let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
    }
    let body = {id: id}
    return Axios.patch('api/auth/profile/favoris/delete', body, config);
}

//function to send à email from user to admin in the Contact page
let SendEmailFromContactPage = (token, data) => {
    let config = {
        headers: {
          'Authorization': 'Bearer ' + token 
        }
    }
    return Axios.post('api/auth/profile/send-email-contact', data, config);
}

export default { signup, 
                 signin, 
                 getProfile, 
                 deleteAddressUser, 
                 addNewDataAddress, 
                 editLastFirstName, 
                 editPassword, 
                 uploadImageProfil, 
                 addNewDataFavoris, 
                 deleteFavorisUser }