import React, { useEffect, useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { setPriceCodePromo, setPromoOK, setReductionPrice } from '../../lib/state/features/PromosCode.slice';
import servicePromosCode from '../../lib/service/servicePromosCode';
import { totalCart, totalCartWithReduc } from '../../lib/state/features/cart.slice';

const CartTotal = () => { 

	/*ici, on récupère le totalWithReduc, qui sera remplie si un code promo a été utilisé, du coup on l'utilise dans le reducer
	totalCart() du cart.slice, donc si !== null donc un code promo a été utilisé, à chaque ajout suppression de produits, le 
	total sera calculé avec cette reduction*/
	const priceReductionCode = useSelector(state => state.promosCodes.priceCodepromo); 

	const dispatch = useDispatch()
	//première chose je dispatch dans redux le prix total de ma commande
	dispatch(totalCart(priceReductionCode));
	const user = useSelector(state => state.user.users) 
	//ici on stocke les codes promo de la bdd
	const [promosCodes, setpromosCodes] = useState();
	//input qui stocke le code promo
	const [inputPromosCode, setInputPromosCode] = useState();

	//ici on récupère la liste des codes promos qui sont dispo dans la bdd à chaque fois que l'user entre un code dans l'input
	useEffect(()=>{
        servicePromosCode.getAllPromosCode()
		.then(res => setpromosCodes(res.data.data))
	},[inputPromosCode]) 

	//le total stocke le prix totale de la transaction, qui varifiera si on utilise un code promo
	const [total, setTotal] = useState(useSelector(state => state.cart.total));
	/* vu que le prix total peux changer si l'user ajoute des quantités en plus ou au moins, alors on récupère un total1
	qui changera en fonction de l'ajout suppression quantités */
	const total1 = useSelector(state => state.cart.total);
	/*ici, oin récupère le totalWithReduc, qui sera remplie si un code promo a été utilisé, du coup on l'utilise là où
	l'o affiche le total, on fera une condition ternaire, si celui-ci est !== null alors on l'affichera, sinon on affiche le total*/
    const totalWithReduc = useSelector(state => state.cart.totalCartWithReduc);

	useEffect(()=> {
		//ici je change la valeur de total àchaque mouvemant de total1 grace à redux (c'est dans Row.js, la fonction updateCartAction, qui fait changer cette valeur)
        setTotal(total1)
	},[total1])
	//ici je stocke le montant de la livraison
	const deliveryCost = useSelector(state => state.cart.delivery === 'standard'  ? 0.00 : 20.00);  
	//state qui stocke le message à afficher si code promo valide
	const [validCode, setvalidCode] = useState();
	//state qui stocke le message à afficher si le code promo n'est pas valide
	const [noValidCode, setNoValidCode] = useState();
	//state qui passe à true si un code promo a été déja ajouté(pour ne pas cumuler plusieurs codes, ou le meme)
	//const [promoOK, setPromoOK] = useState(false);
	const promoOK = useSelector(state => state.promosCodes.promoOK);

	//fonction qui affichera un message si code promo bon, et modifiera du coup le prix totale de la transaction
	//si le code n'est pas bon un messagee de non validation du code sera affiché
	function funcPromosCode(e) {
		e.preventDefault();
		//avant de continuer on verifie que l'user est bien connecté pour pouvoir mettre en place le code promo
		if (user === null) {			
			alert('il faut se connecter pour pouvoir utiiser les codes promos');
		} else {
			//premiere chose on verifie si un code a été déja utilisé ou pas, car pas de possibilité de cumuler plueirs codes
			if (promoOK === false) {
				/*la méthode some() est utilisée pour parcourir chaque objet dans promosCode et vérifier si l'élément inputPromosCode 
				existe dans un des objets. Si c'est le cas, la fonction afficherModale() est appelée. Si inputPromosCode n'existe pas 
				dans promosCode, rien ne se passe.*/
				let price;
				const promoscodeExist = promosCodes.some((item) => {
					let codeOK = item.code === inputPromosCode; 
					if (codeOK) {
						price = item.price;
						setTotal(total1 - item.price)
					}
					dispatch(totalCartWithReduc(total1 - item.price))
					console.log(total1 - item.price);
					return codeOK
				})	
				if (promoscodeExist) { 
					//si le code promo a été ajouté avec ce state à true on ne pourra plus cumuler le meme ou d'autres (stocké dans notre store redux)
					//setPromoOK(true)
					dispatch(setPromoOK(true));
					//le code promo existe alora j'affiche le message qui dit reduction ok et baisse le prix par rapport à cette reduction
					setvalidCode('Réduction de ' + price + ' euros OK');
					/*on dispatch vers redux pour qu'il garde le prix, et le nom de la reduction et l'envoie aprés vers le service stripe du backend, et du 
					coup stripe pourra gerer cette reduction grace au coupon qui*/
					const reduc = {name: inputPromosCode, price: price}
					dispatch(setReductionPrice(reduc));
				} else {
					//sinon j'affiche la modale qui me dira que le code promo n'existe pas
					setNoValidCode('le code promo n\'est pas valide');
				}
			} else {
				//si un code promo a été dejà utilisé.....
				setvalidCode('un code promo a été déjà utilisé');
			}
		}
	}

    return (
    <>
		<div className="card mb-3">
			<div className="card-body">
			<form>
				<div className="form-group">
					<label>Have coupon?</label>
					<div className="input-group">
						<input onChange={(e)=> setInputPromosCode(e.target.value)} type="text" className="form-control" name="" placeholder="Code promo" />
						<p style={{fontSize:'13px'}} className='mt-2 text-info w-100'>{validCode ? validCode : ""}</p>
						<p style={{fontSize:'13px'}} className={noValidCode ? 'mt-2 text-danger w-100' : 'mt-2 text-danger'}>{noValidCode ? noValidCode : ""}</p>
						<span className="input-group-append"> 
							<button onClick={(e)=> {setvalidCode();setNoValidCode(); funcPromosCode(e)}} type='submit' className="btn btn-primary">Apply</button>
						</span>
					</div>
				</div> 
			</form>
			</div> 
		</div>  
		<div className="card">
			<div className="card-body">
					<dl className="dlist-align"> 
					  <dt>SubTotal:</dt> 
					  {/*si on a un code promo, et qu'on supprime tous les produits du panier, on descendra jamais on dessous de 0*/}
                        <dd className="text-right">${total > 0 ? total : 0}</dd>
					</dl>
					<dl className="dlist-align">
					  <dt>Delivery:</dt>
						<dd className="text-right">${deliveryCost}</dd>
					</dl>
					<dl className="dlist-align">
					  <dt>Discount:</dt>
					  <dd className="text-right">---</dd>
					</dl>
					<dl className="dlist-align">
					  <dt>Total:</dt>
					  <dd className="text-right  h5"><strong>${total + deliveryCost > 0 ? total + deliveryCost : 0}</strong></dd>
					</dl>
					<hr />
					<p className="text-center mb-3">
						<img src="images/misc/payments.png" height="26" />
					</p>
					
			</div> 
		</div>  
    </>
)}
export default CartTotal