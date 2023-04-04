import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '../../Auth/validationSchemaYup/ValidationSChemaPassword';
import { useForm } from 'react-hook-form';
import serviceUser from '../../../lib/service/serviceUser';

function InputPassword(props) {

    const { register, handleSubmit, formState, reset } = useForm({ 
		mode: "onBlur",
		defaultValues: {
			password: "",
			confirmPassword: "", 
		},
		resolver: yupResolver(validationSchema),
    });

	const { errors } = formState; 

	const onSubmit = (data) => {
        serviceUser.editPassword(props.token.accessToken, data)
        .then(res => console.log(res));
        props.func();
		reset();
	};

    return (
        <div className='container-fluid'>
            <form onSubmit={handleSubmit(onSubmit)} id="formName">     
                <div className='form-row' >
                    <div className='col'>
                        <label>New password</label>
                        <input {...register("password")} type='password' name='password' className="form-control"  />
                        <small className="text-danger">
							{errors.password?.message}	
						</small>
                    </div>
                    <div className='col'>
                        <label>Confirm password</label>
                        <input {...register("confirmPassword")} type='password' name='confirmPassword' className="form-control"  />
                        <small className="text-danger">
							{errors.confirmPassword?.message}
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

export default InputPassword;