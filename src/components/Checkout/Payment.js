import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { processPayment } from '../../lib/service/serviceStripe'
import { addnewOrder } from '../../lib/state/features/user.slice'; 

function Payment(props) {

  const deliveryAddress = useSelector(state => state.cart.deliveryAddress);
  const userId = useSelector(state => state.user.users.body);

  //je récupère si il y a un code promo qui a été utilisé pour l'envoyer au composant service de stripe, pour qu'il envoie en bdd ce code promo
  const promoCode = useSelector(state => state.promosCodes.priceCodepromo);
  const promo = promoCode !== null ? promoCode : null;

  //je récupère le reductionPrice du code promo, comme ca si different de null, donc un code promo a été validé, alors coté back
  //(service stripe du backend), on reduira le prix totale avec ce code promo
  const reductionPricePromosCode = useSelector(state => state.promosCodes.reductionPrice);

  const dispatch = useDispatch();
  const token = useSelector(state => ({...state.user.token}));
  //on récupere les items de mon panier, depuis le store de redux (l'état cart) 
  const { items } = useSelector(state => state.cart);
  /*on va formater notre order selon ce que stripe atends donc le 'line-items' (voir Stripe.controller coté 
    backend, et doc stripe), donc vu qu'on peut avoir plusieurs produits dans le panier, dans order, on fera
    un map de processItem, pour pouvoir avoir un tableau avec tous les produits de mon panier*/
  const processItem = (item) => ({
    price_data: { 
      currency: "eur",  
      //dans l'objet metadata, je peut ajouter tout ce que je veux
      //dans ce cas je mets le priceReduction et la pourcentage s'il y en a
      //dans metadata je vais aussi sauvegarder s'il y a un code procmo, je vais stocker juste le montant, pour l'utiiser aprés
      //dans le service stripe du backend
      product_data: { name: item.name, metadata:{
                                        priceReduction: item.priceReduction, 
                                        percentageReduction: item.percentageReduction,
                                        reductionPricePromosCode: reductionPricePromosCode
                                      } },
      //a savoir que la unit (voir la doc), c'est toujours en centimes, donc faire *100
      unit_amount: item.priceReduction !== null ? item.priceReduction * 100 : item.price * 100
      //on peut aussi ajouter d'autres keys à notre objet qui partira en bdd
      //descrition:
      //images: [ca sera un tableau qui contient l'url de l'image]
    },
    quantity: item.quantity,
    //on utilise la proprieté metadata pour ajouter des informations en plus dans l'objet qu'on anvoie en bdd avec les infos de la commande
    
  }); 
  /*il faudra créer aussi une variable qui gere le produit 'livraison, car si l'user choisi la livraison fast il faudra
   ajouter 20 euros, donc pour stripe il faudra ajouter un produit de 20 euro'*/ 
   //on récupère biensur le shipping cost depuis le fichier /src/lib/selectors/index.js (ce fichier gère le prix qui sera de 20 si l'user choisi fast)
   const shippingCost = useSelector(state => state.cart.delivery === 'standard'  ? 0.00 : 20.00);
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

  return ( 
    <button  
      className="btn btn-outline-primary btn-lg mt-3 btn-block" 
      onClick={async() =>{
        /*je rajoute un index à l'array avec deja 1 array qui contient 2 index, un avec les ou l'objet et l'autre avec la livraison
        donc on aura 2 index, un avec produits et livraison, et un avec la date de la commande*/
        const date = new Date();
        const dataFormat = {key: date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear(),
                            orderNumber: orderNumber,
                            promo: promo}
                            //ca ca part en dispatch donc dans le store de redux
        const orderWithDate = [orderWithShipping, deliveryAddress, dataFormat];
        dispatch(addnewOrder(orderWithDate)); 
        //ca ca partira en bdd coté orders admin (toutes les ordres de tous les users), et orders user
        await processPayment(orderWithShipping, deliveryAddress, orderNumber,promo, token);  
      }} 
      disabled={props.address != 0 ? "" : "disabled"}>
      Checkout
      </button>
  );
}
export default Payment;  
