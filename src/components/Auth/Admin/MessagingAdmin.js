import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useModal from '../../../lib/hooks/useModal';
import { setMessage } from '../../../lib/state/features/user.slice';
import ModalViewMessages from '../../Misc/Pageprofil/ModalViewMessages';

function MessagingAdmin(props) {

    const dispatch = useDispatch();
    const [valueInput, setValueInput] = useState('tous les messages')

    //on récupère toute la collection des messages
    const AllMessages = useSelector(state => state.user.AllMessages)

    const user = useSelector(state => state.user.users.body)

    const {isShowing: isInfoShowed, toggle: toggleInfo} = useModal();
    function ViewMessages(messages, id, user, object, newMessage) {
        //la key usermess, c'est le user qui a envoyé ce message, donc la réponse de l'admin partira vers ce user
        const newdata = {messages:messages, id: id, usermess: user, object: object, newMessage: newMessage}
        //avec ce dispatch je récupère juste le message dont j'ai cliqué dessus, en gros je le sauvegarde dans le store de redux
        //pour l'afficher aprés dans la modale d'affichage des messages liés à cette discussion
        dispatch(setMessage(newdata))
        toggleInfo()
    } 

    //function to sorted list messages with the value of input 
    function onChangeInput(e) {
        setValueInput(e.target.value) 
    }

    const options = [
        "tous les messages",
        "nouveaux messages"
    ]

    //ici je stockerai dans un tableau tous les newMessages recues pour pouvoir aprés si aucun message recu, visualiser
    //la mentien 'aucun nouveau message' si l'on est dans le select des nouveaux messages 
    let AllMessagesNewArray = [];

    return (
        <div className='messaging-list'> 
            {
                //je stocke les nouveaux messages dans un array, pour les afficher dans le select 'nouveaux messages'
                AllMessages.map(item => {
                    if (item.newMessage === true) {
                        AllMessagesNewArray.push(item)
                    }
                })
            }
            <h2 className='m-3 text-center text-primary'>Messagerie</h2> 
            <br/>
            <div className='div-search-button-add'>
                <div className='col form-group col-md-4'>
                    <select className="form-control" onChange={(e)=>onChangeInput(e)}>
                        {options.map((value, index) => (
                        <option value={value} key={index}>
                            {value}
                        </option>
                        ))} 
                    </select>
                </div>
            </div>
            <div className='row title-order-admin'>
                <h5 className='col-3 into-message-p-elipsis'>Date</h5>
                <h5 className='col-4 into-message-p-elipsis'>user</h5> 
                <h5 className='col-3 into-message-p-elipsis'>Objet</h5>
                <h5 className='into-message-p-elipsis'>Action</h5>
            </div>
            <hr/>
            <div className='container messaging-list-div'>
                {(valueInput === 'tous les messages' && AllMessages.length ) ? AllMessages.map(item => {
                    console.log(item.messages[item.messages.length -1].date)
                    return  (<><div className='row into-message'>
                                <p className='col-3'>{item.messages[item.messages.length -1].date /*ici on afiche la date du dernier message recu*/}</p>
                                <p className='col-4 into-message-p-elipsis'>{item.user}</p>
                                <p className='col-4 into-message-p-elipsis'>{item.object}</p> 
                                <div>
                                    {item.newMessage ? <span style={{marginLeft:'-10px'}} className="badge badge-danger mr-2 mb-3">new</span> : ""}
                                    <i role={'button'} onClick={()=>ViewMessages(item.messages, item.id, item.user, item.object, item.newMessage)} title='voir la discussion' data-toggle="modal" data-target="#modalViewMessages" className="fa-solid fa-eye"></i>
                                </div>
                            </div><hr/></>)
                }) : (valueInput === "nouveaux messages" && AllMessagesNewArray.length ) ? AllMessagesNewArray.map(item => {
                    return  (<><div className='row into-message'>
                            <p className='col-3'>{item.messages[item.messages.length -1].date /*ici on afiche la date du dernier message recu*/}</p>
                            <p className='col-4 into-message-p-elipsis'>{item.user}</p>
                            <p className='col-4 into-message-p-elipsis'>{item.object}</p>
                            <div>
                                {item.newMessage ? <span style={{marginLeft:'-10px'}} className="badge badge-danger mr-2 mb-3">new</span> : ""}
                                <i role={'button'} onClick={()=>ViewMessages(item.messages, item.id, item.user, item.object, item.newMessage)} title='voir la discussion' data-toggle="modal" data-target="#modalViewMessages" className="fa-solid fa-eye"></i>
                            </div>
                        </div><hr/></>)
                }) : (valueInput === "nouveaux messages" && AllMessagesNewArray.length === 0) ? <p>Aucun nouveau message recu</p> : 
                (valueInput === "tous les messages" && AllMessages.length === 0) ? <p>Aucun message recu</p> : ""}
            </div>
            {isInfoShowed && <ModalViewMessages user={user} hide={()=>toggleInfo()} />}
        </div> 
    );
}

export default MessagingAdmin;