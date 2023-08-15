import React, { useEffect } from 'react';  
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import CartTotal from './CartTotal'
import CartTable from './CartTable'

//this is the cart component .
//if the user not connected, we are redirect to the login page
const Layout = ({children}) => {

	const navigate = useNavigate();

	//Data recovery from the redux store (user information and token)
	const data = useSelector((state) => {
		if (state.user.users == null || state.user.users == undefined) {
			return null
		} else {
			return state.user.users.body
		}
	}) 

	return(
		<section className="section-content section-content-cart padding-y" style={{ marginTop: '140px' }}> 
			<div className="container">
				<div className="row">
					<main className="col-md-8">
						<CartTable children={children} dataUser={data}/>
					</main>
					<aside className="col-md-4">
						<CartTotal />			
					</aside>
				</div>
			</div> 
	    </section>
	);
}
export default Layout 