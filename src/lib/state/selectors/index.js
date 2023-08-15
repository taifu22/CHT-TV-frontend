// import { createSelector } from 'reselect'

// //fonctions selector pour le prix totale dans le panier et le prix de la livraison
// export const calculateTotal = ($0, $1) => $0 + $1;
// const getItems = state => state.cart.items
// const getDeliveryCost = state => state.cart.delivery === 'standard'  ? 0.00 : 20.00 
// export const selectDeliveryCost = createSelector([getDeliveryCost], (cost) => cost) 
// export const selectCartTotal = createSelector([getItems, selectDeliveryCost], (items, deliveryCost) => items.map(item => {return item.priceReduction !== null ? item.priceReduction : item.price * item.quantity}).reduce(calculateTotal, 0) + deliveryCost)  