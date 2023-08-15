
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { checkOut } from '../../lib/state/features/cart.slice';
import Adminservice from '../../lib/service/serviceAdmin';
import { setPromoOK, setReductionPrice } from '../../lib/state/features/PromosCode.slice';
import serviceCart from '../../lib/service/serviceCart';

const styles = {
  height: '100vh',
  fontSize: 20
}
function Success() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => ({...state.user.token})); 
  
  function redirectHome(params) {
    //je vide mon panier une fois la commande validé et tout (coté redux et coté bdd)
    dispatch(checkOut());
    serviceCart.deleteAllDataProductCart(token.accessToken);
    setTimeout(()=>{
      navigate('/');
    }, 3000)
  }

  /*je créé 3 éléments orders à envoyer à ma bdd, je récupère depuis le store redux la commande que l'user vient 
  de passer via stripe, donc cette commande est formaté avec stripe, et nous on va la rendre mieux utilisable
  pour afficher la liste des commandes dans la dashboard admin.
  Si on va dans le schemaOrders dans le backend on voit bien qu'il y a plusieurs proprietés, dont la liste des produits 
  commandés, un tableau avec les prix pour calculer le total, et les informations de livraison, et si'il y'a un code promo*/
  const order = useSelector(state => state.user.users.body.orders);
  const userEmail = useSelector(state => state.user.users.body.email);
  
  const orders = order

  useEffect(()=>{
    const delivery = orders[orders.length -1]
    const delivery1 = delivery[0]
    const delivery2 = delivery1[delivery1.length -1]
    const pricedelivery = delivery2.price_data.unit_amount
    const product = delivery[0]
    const promo = delivery[delivery.length -1].promo
    let totalproducts = []
    let totalprice = []
    totalprice.push(pricedelivery); 
    product.map((item, index) => {
      let productItem=null
      if (index !== product.length -1) {
        productItem = {
          nameProduct: item.price_data.product_data.name,
          quantity: item.quantity,
          priceReduction: item.price_data.product_data.metadata.priceReduction,
          percentageReduction: item.price_data.product_data.metadata.percentageReduction
        }
        totalprice.push(item.price_data.unit_amount)
        return totalproducts.push(productItem) 
      }
    })
    
    const deliveryAddress = delivery[delivery.length -2]
    //deliveryAddress.price = pricedelivery
    //deliveryAddress.email = userEmail;
    //const number = delivery[delivery.length -1].orderNumber 
    //const dateOrder = delivery[delivery.length -1].key
    const numberOrder = [delivery[delivery.length -1].orderNumber, delivery[delivery.length -1].key]
    Adminservice.addOrderAdminService(token.accessToken, totalproducts, totalprice, deliveryAddress, numberOrder, userEmail, promo);
    //s'il y avait un code promo on le remets à null, et le faite d'avoir utilisé un code promo aussi on le mets à false
    dispatch(setReductionPrice({name: null, price: null}));
    dispatch(setPromoOK(false));
    redirectHome();
  },[])

  return (
    <>
    <div style={styles} className='d-flex justify-content-center align-items-center'>
        <div className="alert alert-success mt-3 mb-3">
          <p className="icontext"><i className="icon text-success fa fa-thumbs-up"></i>Thank you for your order & your payment</p>
      </div>
    </div>
    </>
  );
}
export default Success