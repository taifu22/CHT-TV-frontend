
import React, { useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import DataOrder from '../../lib/service/serviceOrder';
import { deleteNewOrder } from '../../lib/state/features/user.slice';
import { deleteNewDataPurchase } from '../../lib/service/service';
 
const styles = {
  height: '100vh',
  fontSize: 20
}
function Cancel() {

  const token = useSelector(state => ({...state.user.token}))
  const purchase = useSelector(state => state.user.users.body.orders)
  const dispatch = useDispatch();
  
  useEffect(()=>{
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