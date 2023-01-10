import { loadStripe } from '@stripe/stripe-js';
import Axios from './CallAxiosService';
import DataOrder from '../../lib/service/serviceOrder';

export const processPayment = async (order, token) => {
    const cléAPI_production = "pk_live_51MK0pUKGygiBmYbKg2TZs2rb9uIBggBBfwyk6MZ3tPdCaZ3MgvDta4vBpjuubVwKSTPLXlJRmTkENc0A8roaFmnX00tvanLu9Q";
    const cléAPI_test = "pk_test_51MK0pUKGygiBmYbKUEqZKBqzP5Exchr0uxP5k4NGmgqfEXkk1sihvHA7W4aCykaVaLFBic7IqPjoQhWoVeckex4y00UQisAdAq"
    const stripePromise = loadStripe(cléAPI_test);
    const stripe = await stripePromise;
    Axios.post('api/create-checkout-session', order)
          .then(res => {
            const sessionID = res.data.id
            const date = new Date();
            const dataFormat = {key: date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()}
            const orderWithDate = [order, dataFormat];
            stripe.redirectToCheckout({ sessionId: sessionID });
            return DataOrder.addNewDataOrder(token.accessToken, orderWithDate)
          })
} 