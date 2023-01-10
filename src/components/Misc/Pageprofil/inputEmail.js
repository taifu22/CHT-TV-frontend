import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '../../Auth/validationSchemaYup/ValidationSchemaEmail';
import { useForm } from 'react-hook-form';
import serviceUser from '../../../lib/service/serviceUser';
import { editEmailUser } from '../../../lib/state/features/user.slice';
import { useDispatch } from 'react-redux';

function InputEmail(props) {  

    const dispatch = useDispatch();
    const { register, handleSubmit, formState, reset } = useForm({ 
		mode: "onBlur",
		defaultValues: {
			email: "",
			confirmEmail: "", 
		},
		resolver: yupResolver(validationSchema),
    });

	const { errors } = formState;

	const onSubmit = (data) => {
        serviceUser.editPassword(props.token.accessToken, data)
        .then(res => console.log(res));
        dispatch(editEmailUser(data));
        props.func();
		reset();
	};

    return (
        <div className='container-fluid'>
            <form onSubmit={handleSubmit(onSubmit)} id="formName">     
                <div className='form-row' >
                    <div className='col'>
                        <label>New email</label>
                        <input {...register("email")} type='email' name='email' className="form-control"  />
                        <small className="text-danger">
							{errors.email   ?.message}	
						</small>
                    </div>
                    <div className='col'>
                        <label>Confirm new email</label>
                        <input {...register("confirmEmail")} type='email' name='confirmEmail' className="form-control"  />
                        <small className="text-danger">
							{errors.confirmEmail?.message}
						</small>
                    </div>
                </div>
                <br/>
                <div className='form-row'>
                    <div className='col text-right'>
                        <button type='submit' className='btn-primary'>Valider</button>
                    </div>
                    <div className='col text-left'>
                        <button form="formName" type='button' onClick={props.func} className='btn-primary'>Annuler</button>
                    </div>
                </div>
            </form> 
        </div>
    );
}

export default InputEmail;