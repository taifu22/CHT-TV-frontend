import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { processPayment } from '../../lib/service/serviceStripe'
import { selectDeliveryCost } from "../../lib/state/selectors";
import { addnewOrder } from '../../lib/state/features/user.slice';

function Payment(props) {

  const deliveryAddress = useSelector(state => state.cart.deliveryAddress);
  const userId = useSelector(state => state.user.users.body)

  const dispatch = useDispatch();
  const token = useSelector(state => ({...state.user.token}))
  //on récupere les items de mon panier, depuis le store de redux (l'état cart)
  const { items } = useSelector(state => state.cart);
  /*on va formater notre order selon ce que stripe atends donc le 'line-items' (voir Stripe.controller coté 
    backend, et doc stripe), donc vu qu'on peut avoir plusieurs produits dans le panier, dans order, on fera
    un map de processItem, pour pouvoir avoir un tableau avec tous les produits de mon panier*/
  const processItem = (item) => ({
    price_data: { 
      currency: "eur",
      product_data: { name: item.name },
      //a savoir que la unit (voir la doc), c'est toujours en centimes, donc faire *100
      unit_amount: item.price * 100
    },
    quantity: item.quantity
  }); 
  /*il faudra créer aussi une variable qui gere le produit 'livraison, car si l'user choisi la livraison fast il faudra
   ajouter 20 euros, donc pour stripe il faudra ajouter un produit de 20 euro'*/ 
   //on récupère biensur le shipping cost depuis le fichier /src/lib/selectors/index.js (ce fichier gère le prix qui sera de 20 si l'user choisi fast)
   const shippingCost = useSelector(selectDeliveryCost);
   const processShipping =  {
    price_data: {
      currency: "eur",
      product_data: { name: 'Shipping Cost' },
      //a savoir que la unit (voir la doc), c'est toujours en centimes, donc faire *100
      unit_amount: shippingCost * 100
    },
    quantity: 1
  };
  /*du coup si on fait un console log de order, on aura un tableau avec le ou les produits dans le panier
    formaté comme demandé dans la doc de stripe*/
  const order = items.map(processItem)
  //on fait une concat de nos produits dans le panier plus la livraison
  const orderWithShipping = order.concat(processShipping);

  //fonction pour donner toujours un numéro de commande different
  const orderNumber = userId.id.match(/\d+/g).join('') + userId.orders.length +2;

  useEffect(()=>{
    console.log(userId.orders.length);
  },[])

  return ( 
    <button 
      className="btn btn-outline-primary btn-lg mt-3 btn-block" 
      onClick={async() =>{
        /*je rajoute un index à l'array avec deja 1 array qui contient 2 index, un avec les ou l'objet et l'autre avec la livraison
        donc on aura 2 index, un avec objets et livraison, et un avec la date de la commande*/
        const date = new Date();
        const dataFormat = {key: date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear(),
                            orderNumber: orderNumber}
        const orderWithDate = [orderWithShipping, deliveryAddress, dataFormat];
        dispatch(addnewOrder(orderWithDate));
        await processPayment(orderWithShipping, deliveryAddress, orderNumber, token); 
      }} 
      disabled={props.address != 0 ? "" : "disabled"}>
      Checkout
      </button>
  );
}
export default Payment;  
