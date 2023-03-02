import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchemaAddress } from '../Auth/validationSchemaYup/ValidationSchemaAddress';
import serviceUser from '../../lib/service/serviceUser';
import { useDispatch, useSelector } from 'react-redux';
import { addNewAddressData } from '../../lib/state/features/user.slice';

function ModalAddress(props) {

    const [placeholder, setPlaceholder] = useState(props.data)
    const dispatch = useDispatch();
    const token = useSelector(state => ({...state.user.token}))

    const { register, handleSubmit, formState, reset } = useForm({
		mode: "onBlur",
		defaultValues: { 
			firstname: "",
			lastname: "", 
			street: "",
			city: "",
			country: "",
		},
		resolver: yupResolver(validationSchemaAddress),
    });

	const { errors } = formState;

	const onSubmit = (data) => {
		const dataAddress = {
			firstname: data.firstname,
			lastname: data.lastname,
			street: data.street,
			city: data.city,
            country: data.country 
		}
		serviceUser.addNewDataAddress(token.accessToken, dataAddress)
                 .then(res => console.log(res))
                 .catch(error => console.log(error))
        dispatch(addNewAddressData(dataAddress));
		reset();
		props.funcToggle();
	};

    return (
        <>
            <div class="modal fade" id="modalRegisterForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header text-center">
                            <h4 class="modal-title w-100 font-weight-bold">Ajouter une adresse</h4>
                            <button type="button" class="close" onClick={()=>{props.funcToggle();setPlaceholder(undefined)}} data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form className='m-3' >
                            <div className="form-row">
                                <div className="col form-group col-md" >
                                    <label>First Name</label>
                                    <input {...register("firstname")} type='text' name='firstname' className="form-control"  />
                                    <small className="text-danger">
                                        {errors.firstname?.message}	
                                    </small>
                                </div>
                                <div className="col form-group col-md" >
                                    <label>Last Name</label>
                                    <input {...register("lastname")} type='text' name='lastname' className="form-control" />
                                    <small className="text-danger">
                                        {errors.lastname?.message}
                                    </small>
                                </div>
                            </div> 
                            <div className="form-group">
                                <div className="col form-group col-md p-0" >
                                    <label>Address</label>
                                    <input {...register("street")} type='text' name='street' className="form-control" />
                                    <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                                    <small className="text-danger">
                                        {errors.street?.message}
                                    </small>
                                </div>
                            </div> 
                            <div className="form-row">	
                                <div className="form-group col-md-6" >
                                    <label>City</label>
                                    <input {...register("city")} type='text' name='city' className="form-control" />
                                    <small className="text-danger">
                                        {errors.city?.message}	
                                    </small>
                                </div>
                                <div className="form-group col-md-6" >
                                    <label>Country</label>
                                    <input {...register("country")} type='text' name='country' className="form-control" />
                                    <small className="text-danger">
                                        {errors.country?.message}
                                    </small>
                                </div>
                            </div>
                            <div className="form-group d-flex mt-4 justify-content-md-end">
                                <button type="button" onClick={handleSubmit(onSubmit)} className={`col-md-2 mr-4 btn btn-primary`} data-dismiss="modal" >Valider</button>
                                <button type="button" className="col-md-2 btn btn-danger" onClick={() => reset()}>Annuler</button> 
                            </div>              
			            </form> 
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default ModalAddress;