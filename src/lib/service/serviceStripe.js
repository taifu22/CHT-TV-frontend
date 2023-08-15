import { loadStripe } from '@stripe/stripe-js';
import Axios from './CallAxiosService';
import DataOrder from '../../lib/service/serviceOrder';
import { addNewDataPurchase } from '../../lib/service/service';

//ici on appel le back-end, la route checkOut pour afficher les informations de payment via stripe, et valider le paymenet (on suit la doc stripe),
//puis si tout se passe bien on appel la route pour envoyer les informations de la commande à la bdd (dans la proprieté orders de l'user en question).
//pour le coté order dans la collections orders donc pour l'affichage de toutes les commandes par l'admin, voir la page /Checkout/Success.js
export const processPayment = async (order, deliveryAddress, orderNumber, promo, token) => {
    const cléAPI_production = "pk_live_51MK0pUKGygiBmYbKg2TZs2rb9uIBggBBfwyk6MZ3tPdCaZ3MgvDta4vBpjuubVwKSTPLXlJRmTkENc0A8roaFmnX00tvanLu9Q";
    const cléAPI_test = "pk_test_51MK0pUKGygiBmYbKUEqZKBqzP5Exchr0uxP5k4NGmgqfEXkk1sihvHA7W4aCykaVaLFBic7IqPjoQhWoVeckex4y00UQisAdAq"
    const stripePromise = loadStripe(cléAPI_test);
    const stripe = await stripePromise;
    Axios.post('api/create-checkout-session', order)
          .then(res => {
            const sessionID = res.data.id;
            const date = new Date();
            const dataFormat = {key: date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear(),
                                orderNumber: orderNumber,
                                promo: promo
                                };
            const orderWithDate = [order, deliveryAddress, dataFormat];
            stripe.redirectToCheckout({ sessionId: sessionID });
            addNewDataPurchase(orderWithDate);
            return DataOrder.addNewDataOrder(token.accessToken, orderWithDate)   
          })
} 