import React from 'react'
import Payment from './Payment'
import DeliveryBox from './DeliveryBox'
import { useSelector, useDispatch } from 'react-redux';
import { setDeliveryChoice } from '../../lib/state/features/cart.slice';
import { Link, useNavigate } from "react-router-dom";

const defaultValues = { 
	delivery: 'standard',
	address: ''
}

const options = ['Canada', 'Russia', 'United States', 'India', 'Afganistan']
const Checkout = () => { 	

	//ici je dit, tu vas me chercher la key address de ce state/objet donc user.users.body
	const { address } = useSelector(state => state.user.users.body);
	const delivery = useSelector(state => state.cart.delivery)

	const dispatch = useDispatch()

	function deliveryChoice(value) {
		dispatch(setDeliveryChoice(value))
	}

	return (
	<> 
	<section className="section-content padding-y" style={{ margin: '100px auto', maxWidth: '720px' }}>
		<div className="container" >
            <div className="card mb-4">
				<div className="card-body">
					<h4 className="card-title mb-3">Delivery info</h4>
					<div className="form-row">
						<div className="form-group col-sm-6"> 
							<DeliveryBox value={delivery} title="standard" message="Free by airline within 20 days" onChange={(e) => deliveryChoice("standard")}/>
						</div>
						<div className="form-group col-sm-6">
							<DeliveryBox value={delivery} title="fast" message="Extra 20$ will be charged" onChange={(e) => deliveryChoice("fast")}/>
						</div>
					</div>
                    <h5>Veuillez choisir votre adresse de livraison</h5>
					<br/>
					<div className='form-row'>
						{
							address.length != 0  ? address.map(item => {
							return (<>
										<div className="col-sm-4">
											<div className="card">
											<div className="card-body">
												<h5 className="card-title">{item.firstname} {item.lastname}</h5>
												<p className="card-text">{item.street}</p>
												<p className="card-text">{item.city}</p>
												<p className="card-text">{item.country}</p>
											</div>
											</div>
										</div>
									</>) 
							}) : <p>La liste des addresses est vide, Veuillez ajouter une adresse dans le <Link to='/pageprofile'>menu profil utilisateur</Link></p>
						}
					</div>
				</div> 
				<div className="form-row" style={{padding: '0 25px 30px'}}>
					<Payment />	
				</div>
			</div> 
		</div>
    </section>
</>
)}
export default Checkout