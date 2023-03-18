import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '../../Auth/validationSchemaYup/ValidationSchemaFirstLastName';
import { useForm } from 'react-hook-form';
import serviceUser from '../../../lib/service/serviceUser';
import { useDispatch } from 'react-redux';
import { edituserLastFirstName } from '../../../lib/state/features/user.slice';

function InputFirstLastName(props) {

    const dispatch = useDispatch();
    const { register, handleSubmit, formState, reset } = useForm({
		mode: "onBlur",
		defaultValues: { 
			firstname: "",
			lastname: "", 
		},
		resolver: yupResolver(validationSchema)
    });

	const { errors } = formState;

	const onSubmit = (data) => {
        console.log('ciao');
        serviceUser.editLastFirstName(props.token.accessToken, data)
              .then(res => console.log(res));
        dispatch(edituserLastFirstName(data))
        props.func();
		reset();
	};

    return (
        <div className='container-fluid'>
            <form onSubmit={handleSubmit(onSubmit)} id="formName">     
                <div className='form-row' >
                    <div className='col'>
                        <label>First Name</label>
                        <input {...register("firstname")} type='text' name='firstname' className="form-control"  />
                        <small className="text-danger">
							{errors.firstname?.message}	
						</small>
                    </div>
                    <div className='col'>
                        <label>Last Name</label>
                        <input {...register("lastname")} type='text' name='lastname' className="form-control"  />
                        <small className="text-danger">
							{errors.lastname?.message}
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

export default InputFirstLastName;