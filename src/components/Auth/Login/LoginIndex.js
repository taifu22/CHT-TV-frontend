import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchemaLogin } from '../validationSchemaYup/validationSchemaLogin';
import serviceUser   from '../../../lib/service/serviceUser';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setUserData, setTokenData } from '../../../lib/state/features/user.slice'; 
import serviceCart from '../../../lib/service/serviceCart';

const Login = () => {  

  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  //state for store error login if username or password are note valids
  const [errorLogin, setErrorLogin] = useState();

  //here we store the data of the token to be able to save the data of the cart in bdd 
  //const [token, setToken] = useState();

  //recovery data of cart for see if user not connect and add products to cart.
  //if the user not connect and add products to cart, before payment it will be redirected to login page, and after redirect again in cart page
  const dataCart = useSelector(state => (state.cart.items));

  useEffect(()=>{
    console.log(dataCart.length);
  },[])

	const { register, handleSubmit, formState, reset } = useForm({
		mode: "onBlur",
		defaultValues: {
			email: "",
			password: ""
		},
		resolver: yupResolver(validationSchemaLogin),
    });

	const { errors } = formState;

	const onSubmit = (data) => {
		serviceUser.signin(data)
       .then(res => {
        dispatch(setTokenData(res.data))
        const token = res.data.accessToken;
        serviceUser.getProfile(res.data.accessToken) 
            .then(res => {
              dispatch(setUserData(res.data));
              if (res.data.body.role === "admin") {
                navigate('/dashboardAdmin');
              } else {
                //on envoie en bdd, ce que le user à mis pendant qu'il était déconnecté
                dataCart.length > 0 && serviceCart.addNewDataProductCart(token, dataCart)
                navigate('/');
              }  
            }) 
       })   
       .catch(error => {
        if (error.response.status === 404) {
          setErrorLogin('User not found!')
        } else if (error.response.status === 401) {
          setErrorLogin('Invalid Password!')
        }
    })
	};

  return(<>
		<div className="card mx-auto" style={{maxWidth: '380px', marginTop:'200px'}}>
      <div className="card-body">
        <h4 className="card-title mb-4">Sign in</h4>
        {errorLogin ? <p style={{color:'red'}}>{errorLogin}</p> : ""}
       	<form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <div className="col form-group col-md p-0" >
              <label>Email</label>
              <input {...register("email")} type='email' name='email' className="form-control"  />
              <small className="text-danger">
                {errors.email?.message}
              </small>
            </div>
          </div> 
          <div className='form-group'>
            <div className="form-group col-md p-0" >
              <label>Password</label>
              <input {...register("password")} type='password' name='password' className="form-control"  />
              <small className="text-danger">
                {errors.password?.message}	
              </small>
            </div>
          </div> 
          <div className="form-check">
              <input type="checkbox" className="form-check-input" name="acceptTerms"/>
              <label htmlFor="acceptTerms" className="form-check-label">Remember me</label>
            <small className="text-danger d-block">
              {errors.acceptTerms?.message}
            </small>
          </div> 
          <div className="form-group d-flex mt-4 justify-content-md-start">
            <button type="submit" className={`col-md- mr-4 btn btn-primary`}>Login</button>
          </div>
        </form>
      </div>
    </div> 
     <p className="text-center mt-4">Don't have account? <Link to='/register'>Sign Up</Link></p>
		<br /><br />
	</>)
}  
export default Login