import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchemaMessage } from '../../Auth/validationSchemaYup/ValidationSchemaMessage';
import { useForm } from 'react-hook-form';
import { setMessageSend, setNewMessageFalse, setNewMessageFalseUser } from '../../../lib/state/features/user.slice';
import MessageService from '../../../lib/service/serviceMessages'

function ModalViewMessages(props) {

    const messages = useSelector(state => state.user.message)
    const user = useSelector(state => state.user.users.body)
    const token = useSelector(state => ({...state.user.token}))
    const myDivRef = useRef(null)    

    const dispatch = useDispatch();
    const { register, handleSubmit, formState, reset } = useForm({
		mode: "onBlur",
		defaultValues: { 
			message: "", 
		},
		resolver: yupResolver(validationSchemaMessage)
    });
	const { errors } = formState;

    function onSubmit(data) {
        const date = new Date();
		const newdate = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()
        const newMessage = {message: data.message, id: messages.id, user: props.user.email, user1: messages.usermess, date: newdate, object: messages.object}
        console.log(newMessage);
        if (user.role === 'user') {
            MessageService.SendResponseFromMessagingBoardUserToAdmin(token.accessToken, newMessage)
            dispatch(setMessageSend({id: messages.id, new: newMessage}));
        } else {
            MessageService.SendResponseFromMessagingBoard(token.accessToken, newMessage)
            dispatch(setMessageSend({id: messages.id, new: newMessage})); 
        } 
        reset();
    }

    //ici on appelle la route pour pouvoir passer le newMessage à false (coté collections messages si admin et coté document user array messages)
    useEffect(()=>{ 
        if (messages.newMessage === true && user.role === 'admin') {
            MessageService.deleteNewMessageAdmin(token.accessToken, messages.id);
            dispatch(setNewMessageFalse(messages.id))
        } else if (messages.newMessage === true && user.role === 'user') {
            console.log('user');
            MessageService.deleteNewMessageUser(token.accessToken, messages.id);
            dispatch(setNewMessageFalseUser(messages.id))
        }
    },[])

    useEffect(() => {
        //ici j'essaye de faire afficher toujours le dernier message, donc le scroll toujours vers le bas
        if (myDivRef.current) {
            console.log(myDivRef.current);
          myDivRef.current.scrollTop = myDivRef.current.scrollHeight;
        }
    }, [])

    return ( 
        <div class="modal fade" id='modalViewMessages' tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header text-center w-100">
                            <div>
                                <h5 class="modal-title font-weight-bold">Objet : {messages.object}</h5>
                            </div> 
                            <div>
                                <button type="button" onClick={()=>props.hide()} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                        </div>
                        <div className='modal-body' >
                            <div className='mb-3 list-messages-container' ref={myDivRef}>
                                {messages.messages.map(item => {
                                    if(item.user === props.user.email) {
                                        return (<><p className='p-message'>{item.date}</p>
                                                <div className='inside-message m-2'>
                                                    <div className='d-flex justify-content-between'>
                                                        <p className='text-success m-0'><b>You</b></p>
                                                    </div>
                                                    <p className='p-message'>{item.message}</p>
                                                </div></>)
                                    } else {
                                        return (<><p className='p-message p-message-2'>{item.date}</p>
                                                <div className='inside-message inside-message-2 m-2'>
                                                    <div className='d-flex justify-content-between'>
                                                        <p className='text-info m-0'><b>{user.role === 'user' ? 'Admin ' : item.user}</b></p>
                                                    </div>
                                                    <p className='p-message'>{item.message}</p>
                                                </div></>)
                                    }
                                })}
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} id="formMessage">
                                <div className="card-footer text-muted d-flex flex-column justify-content-start align-items-center p-3">
                                    <div className="input-group mb-0">
                                        <input {...register("message")} name="message" type="text" className="form-control" placeholder="Type message"
                                            aria-label="Recipient's username" aria-describedby="button-addon2" />
                                        <button form="formMessage" className="btn btn-success" type="submit">
                                            Envoie
                                        </button>
                                    </div>
                                    <small className="text-danger text-start mt-2">
                                        {errors.message?.message}
                                    </small>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default ModalViewMessages;