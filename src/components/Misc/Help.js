import React, { useEffect, useState } from 'react'
import serviceMessages from '../../lib/service/serviceMessages'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { ValidationSchemaSendEmailContact } from '../Auth/validationSchemaYup/ValidationSchemaSendEmailContact';
import { useSelector, useDispatch } from 'react-redux';
import { setNewDiscussion } from '../../lib/state/features/user.slice';
import useModal from '../../lib/hooks/useModal';
import ModalMessageSendOk from './ModalMessageSendOk';
import Login from '../Auth/Login/LoginIndex';

const Help = () => {

	const {isShowing: isInfoShowed, toggle: toggleInfo} = useModal();
	const token = useSelector(state => ({...state.user.token}))
	const user = useSelector(state => {
		if (state.user.users !== null) {
			return state.user.users.body
		} else {
			return null
		}
	})
	const [message200, setMessage200] = useState(true); 
	const dispatch = useDispatch();

	const { register, handleSubmit, formState, reset } = useForm({ 
		mode: "onBlur",
		defaultValues: { 
			email: "",
		},
		resolver: yupResolver(ValidationSchemaSendEmailContact),
    });

	const { errors } = formState;

	function onSubmit(data) {
		//quand un user submit le formulaire de contact, une nouvelle discussion sera ouverte, donc on ajoutera une discussion avec id
		//dans la proprieté messages de l'user, et à l'intérieur de cette discussion, on aura encore une proprieté messages
		//qui stockera les messages zentre l'user et l'admin dans cette discussion 
		//dans data donc ce qu'on a recu du formulaire avec la validation userfrm et yup, on ajoutera aussi la proprieté messages, avec
		//les messagesw échangé entre le user et l'admin dans cette discission, et aussi la date de création de cette discission
		const date = new Date();
		const newdate = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()
		data.date = newdate
		serviceMessages.SendEmailFromContactPage(token.accessToken, data)
		   .then(data => {
			   if (data.status == 200) {
				//si le message a été envoyé correctement alors on affichera la modale qui confirme cela à l'utilisateur
				toggleInfo();
				setMessage200(false);
			   }
		   })
		data.messages = [{message: data.textMessage, user: user.email, date: newdate}]
		dispatch(setNewDiscussion(data))
		reset();
	}

	return ( 
		<>
			{user === null ? <Login /> : <div class="container contact-form">
			    {isInfoShowed && <ModalMessageSendOk message1={'Votre message a été envoyé'} message2={'L\'administrateur vous répondra dans les plus brefs délais'} hide={()=>toggleInfo()} />}
				<div class="contact-image">
					<img src="https://image.ibb.co/kUagtU/rocket_contact.png" alt="rocket_contact"/>
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<h3>Drop Us a Message</h3>
				<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<input {...register("name")} type="text" name="name" class="form-control" placeholder="Nom prénom *" />
							    <small className="text-danger">
									{errors.name?.message}
								</small>
							</div>
							<div class="form-group">
								<input {...register("email")} type="email" name="email" class="form-control" placeholder="Email *" />
								<small className="text-danger">
									{errors.email?.message}
								</small>
							</div>
							<div class="form-group">
								<input {...register("object")} type="object" name="object" class="form-control" placeholder="Object *" />
								<small className="text-danger">
									{errors.object?.message}
								</small>
							</div>
							<div class="form-group">
								{user.role === 'admin' ? <button title="vous etes l'admin vous ne pouvez pas vous envoyer un msg !!!" disabled className='btn btn-danger rounded-pill'>Vous etes l'admin</button> : message200 ? <input type="submit" name="btnSubmit" className="btnContact" value="Send Message" /> : ""}
                                {message200 === false && <button title="vous venez d'envoyer un message à l'admin !!!" disabled className='btn btn-danger rounded-pill'>Message envoyé</button>}
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<textarea {...register("textMessage")} name="textMessage" class="form-control" placeholder="Message *" style={{width: '100%', height: '150px'}}></textarea>
							    <small className="text-danger">
									{errors.textMessage?.message}
								</small>
							</div>
						</div>
					</div>
				</form>
			</div>}
		</>
	)
}

export default Help