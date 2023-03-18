import Axios from "./CallAxiosService";

//function to send à email message from user to admin in the Contact page (open new discussion in the mesaging board)
//ici on envoie aussi un mail à l'admin dans sa messagerie, plus message dans la dashboard admin
let SendEmailFromContactPage = (token, data) => {
    let config = {
        headers: {
          'Authorization': 'Bearer ' + token 
        }
    }
    return Axios.post('api/auth/messaging/send-email-contact', data, config);
}

//function to store new message response send from admin to user (store in the same id messaging of discussion)
// ici on enverra toujours un mail à l'admin pour lui dire que tel user à répondu
let SendResponseFromMessagingBoard = (token, data) => {
  let config = {
      headers: {
        'Authorization': 'Bearer ' + token 
      }
  }
  return Axios.patch('api/auth/messaging/send-reponse-to-user', data, config);
}

//function to store new message response send from user to admin (store in the same id messaging of discussion)
let SendResponseFromMessagingBoardUserToAdmin = (token, data) => {
  let config = {
      headers: {
        'Authorization': 'Bearer ' + token 
      }
  }
  return Axios.patch('api/auth/messaging/send-reponse-to-admin', data, config);
}
 
//function to view the complete list of messages in the admin dashboard panel
let getAllMessages = (token) => {
  let config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }
  let body = {}
  return Axios.post('api/admin/dashBoard/messages/get',body, config);
}

//function tu delete notifications of newMessage, in admin side
let deleteNewMessageAdmin = (token, data) => {
  let config = {
      headers: {
        'Authorization': 'Bearer ' + token 
      }
  }
  let body = {id:data}
  return Axios.patch('api/auth/messaging/delete-new-mess-admin', body, config);
}

//function tu delete notifications of newMessage, in admin side
let deleteNewMessageUser = (token, data) => {
  let config = {
      headers: {
        'Authorization': 'Bearer ' + token 
      }
  }
  let body = {id:data}
  return Axios.patch('api/auth/messaging/delete-new-mess-user', body, config);
}

export default { SendEmailFromContactPage, SendResponseFromMessagingBoard, SendResponseFromMessagingBoardUserToAdmin, getAllMessages, deleteNewMessageAdmin, deleteNewMessageUser }