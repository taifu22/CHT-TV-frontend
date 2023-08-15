import React, { useState } from 'react'
import Payment from './Payment'
import DeliveryBox from './DeliveryBox'
import { useSelector, useDispatch } from 'react-redux';
import { setDeliveryChoice, setDeliveryAddress } from '../../lib/state/features/cart.slice';
import { Link, useNavigate } from "react-router-dom";
import CartTotal from '../Cart/CartTotal';
import useWindowSize from '../../lib/hooks/useScreenSize';

const defaultValues = { 
	delivery: 'standard', 
	address: ''
}

const options = ['Canada', 'Russia', 'United States', 'India', 'Afganistan']
const Checkout = () => { 

	//ici je dit, tu vas me chercher la key address de ce state/objet donc user.users.body
	const { address } = useSelector(state => state.user.users.body);
	//ici je récupère depuis le store juste la valeur du choix de delivery choisi (20$ ou pas, car seulement 2 choix)
	const delivery = useSelector(state => state.cart.delivery)
	//ici je récupère depuis le store l'adresse de livraison choisi, pour faire fonctionner mon système de choix des addresses
	const deliveryAddress = useSelector(state => state.cart.deliveryAddress)

	const dispatch = useDispatch()

	//fonction pour dispatch dans le store le choix de la livraiison pour aprés l'utiliser lors du payement (ajouter ou pas 20£)
	function deliveryChoice(value) {
		dispatch(setDeliveryChoice(value))
	}
    
	//fonction pour stocker dans le store l'adresse de livraison et pouvoir l'utiliser dans la prochaine étape du payement
	function deliveryAddressChoice(value) {
		if (value !== deliveryAddress) {
		    dispatch(setDeliveryAddress(value))	
		}
	}

	const screenWidth = useWindowSize().width;

	return (
	<div className='container'>
	<div className='row'> 
	<section className="section-content-checkout padding-y col-md-8" style={{ margin: '100px auto', maxWidth: '720px' }}>
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
										<div className="col-xl-6 address-delivery">
											<div className="card">
											<div onClick={()=> deliveryAddressChoice(item)} className={item === deliveryAddress ? "card-body card-body-selected" : "card-body"}>
												<h5 className="card-title">{item.firstname} {item.lastname}</h5>
												<p className="card-text m-0">{item.street}</p>
												<p className="card-text m-0">{item.city}</p>
												<p className="card-text">{item.country}</p>
											</div>
											</div>
										</div>
									</>) 
							}) : <p>La liste des addresses est vide, Veuillez ajouter une adresse dans le <Link to='/pageprofil/address'>menu profil utilisateur</Link></p>
						}
					</div>
				</div> 
				<div className="form-row" style={{padding: '0 25px 30px'}}>
					<Payment address={address.length}/>	
				</div>
			</div> 
		</div>
    </section>
	<div className={screenWidth > 767 ? 'col-md-4' : 'col-md-4 mr-3 mb-3 ml-3'} style={screenWidth > 767 ? { marginTop: '135px'} : { marginTop: '-120px' }}>
		<CartTotal />
	</div>
</div>
</div>
)}
export default Checkout