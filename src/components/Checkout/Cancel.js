
import React, { useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import DataOrder from '../../lib/service/serviceOrder';
import { deleteNewOrder } from '../../lib/state/features/user.slice';
import { deleteNewDataPurchase } from '../../lib/service/service';
import { setPromoOK, setReductionPrice } from '../../lib/state/features/PromosCode.slice';
import { checkOut } from '../../lib/state/features/cart.slice';
 
const styles = {
  height: '100vh',
  fontSize: 20
}
function Cancel() {

  const token = useSelector(state => ({...state.user.token}))
  const purchase = useSelector(state => state.user.users.body.orders)
  const dispatch = useDispatch();
  
  useEffect(()=>{
    //s'il y avait un code promo on le remets à null, et le faite d'avoir utilé un code promo aussi on le mets à false
    dispatch(setReductionPrice({name: null, price: null}));
    dispatch(setPromoOK(false));
    //on vide le panier
    dispatch(checkOut());
    redirectHome();
  },[])

  const navigate = useNavigate();
  function redirectHome() {
    //je supprime de la bdd et du redux la derniere commande annulé pendant le checkout
    DataOrder.deleteNewOrder(token.accessToken); 
    dispatch(deleteNewOrder());
    //je supprime le dernier élément qui corresponds à la derniere commande effectué pour ce produit, mais annulé pendant le checkout de stripe
    deleteNewDataPurchase(purchase[purchase.length -1])
    setTimeout(()=>{
      navigate('/');
    }, 3000)
  }

  return (
    <>
      <div style={styles} className='d-flex justify-content-center align-items-center'>
          <div className="alert alert-warning mt-3 mb-3">
            <p className="icontext"><i className="icon text-cancel fa fa-thumbs-up"></i>You will redirected in a few seconds ...</p>
        </div>
      </div>
    </>
  );
}
export default Cancel 