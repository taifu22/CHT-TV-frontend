import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '../validationSchemaYup/ValidationSChema';
import serviceUser   from '../../../lib/service/serviceUser';
import { useNavigate } from 'react-router-dom';

const RegisterIndex = () => {

	const options = ['Uzbekistan', 'Russia', 'United States', 'India', 'Afganistan'];
	const navigate = useNavigate();
	const [emailAlreadyExist, setEmailAlreadyExist] = useState()

	const { register, handleSubmit, formState, reset } = useForm({
		mode: "onBlur",
		defaultValues: {
			firstname: "",
			lastname: "", 
			email: "",
			password: "",
			confirmPassword: "",
		},
		resolver: yupResolver(validationSchema), 
    });

	const { errors } = formState;

	const onSubmit = (data) => {
		const dataUser = {
			firstname: data.firstname,
			lastname: data.lastname,
			email: data.email,
			password: data.password
		}
		serviceUser.signup(dataUser)
		    .then(res => navigate('/registerSuccess', {state:{firstname: dataUser.firstname, lastname: dataUser.lastname}}))
			.catch(err => {
				if (err.response.status === 400) {
					setEmailAlreadyExist('L\'email existe déjà, merci d\'en utiliser une autre');
				}
			})
		//reset();
	};
 
	return (
	<>
    <div className="card mx-auto" style={{maxWidth:'520px', marginTop:'140px'}} >
      <article className="card-body">
			<header className="mb-4"><h4 className="card-title">Sign up</h4></header>
			{emailAlreadyExist ? <p style={{color:'red'}}>{emailAlreadyExist}</p> : ""}
 			<form onSubmit={handleSubmit(onSubmit)}>
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
						<input {...register("lastname")} type='text' name='lastname' className="form-control"  />
						<small className="text-danger">
							{errors.lastname?.message}
						</small>
					</div>
				</div> 
				<div className="form-group">
					<div className="col form-group col-md p-0" >
						<label>Email</label>
						<input {...register("email")} type='email' name='email' className="form-control"  />
						<small className="form-text text-muted">We'll never share your email with anyone else.</small>
						<small className="text-danger">
							{errors.email?.message}
						</small>
					</div>
				</div> 
				<div className="form-row">	 
					<div className="form-group col-md-6" >
						<label>Password</label>
						<input {...register("password")} type='password' name='password' className="form-control"  />
						<small className="text-danger">
							{errors.password?.message}	
						</small>
					</div>
					<div className="form-group col-md-6" >
						<label>Confirm Password</label>
						<input {...register("confirmPassword")} type='password' name='confirmPassword' className="form-control"  />
						<small className="text-danger">
							{errors.confirmPassword?.message}
						</small>
					</div>
				</div>
				<div className="form-check">
				    <input type="checkbox" className="form-check-input" {...register("acceptTerms")} name="acceptTerms"/>
				    <label htmlFor="acceptTerms" className="form-check-label">J'ai lu et j'accepte les conditions</label>
					<small className="text-danger d-block">
						{errors.acceptTerms?.message}
					</small>
				</div> 
				<div className="form-group d-flex mt-4 justify-content-md-end">
					<button type="submit" className={`col-md-2 mr-4 btn btn-primary`} >Register</button>
					<button type="button" className="col-md-2 btn btn-danger" onClick={() => reset()}>Annuler</button>
			    </div>              
			</form>
		</article>
    </div>
    <p className="text-center mt-4">Have an account? <Link to='/login'>Log In</Link></p>
    <br /><br /><br />
</>
)}
export default RegisterIndex 