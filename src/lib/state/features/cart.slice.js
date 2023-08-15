import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";
import { selectCartTotal } from "../selectors";
import { useSelector } from "react-redux";

const mapItem = (item, payload) => {
    if (item.id === payload.id) { return { ...item, quantity: item.quantity + 1 } }
    return item
}
const updateMapItem = (item, payload) => { 
    if (item.id === payload.id) { return { ...item, quantity: payload.value} }
    return item
}
const filterItem = (item, payload) => item.id !== payload.id

export const cartSlice = createSlice({ 
    name: "user",
    initialState: { 
        items: localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [],
        delivery: 'standard',
        addressDelivery : {},
        total: null,
        totalCartWithReduc: null
    },
    reducers: {
        addToCart: (state, {payload}) => { 
            //pour voir le state en cours on utilise la fonction de redux-toolkit current()
            /*ici itemFound, me dira que le item existe deja, donc avec la fonction mapItem je vais créer un nouveau index
            quantity (au tableau item contenant mon produit) avec du coup le nombre de quantité de ce produit selectionné*/
            const itemFound = !!current(state.items).find(item => item.id === payload.id)
            if (itemFound) { return { ...state, items: current(state.items).map(item => mapItem(item, payload)) }}
            //si le item (produit) n'existe pas dans mon state cart de mon store, alor je vais créé un nouveu item avec quantité 1
            return { ...state, items: [{ ...payload, quantity: 1 }, ...state.items] }
        },
        removeFromCart: (state, {payload}) => {
            return { ...state, items: current(state.items).filter(item => filterItem(item, payload)) }
        },
        updateCart: (state, {payload}) => {
            return { ...state, items: current(state.items).map(item => updateMapItem(item, payload))}
        },
        setDeliveryChoice: (state, {payload}) => {
            return {...state, delivery: payload} 
        },
        setDeliveryAddress: (state, {payload}) => {
            return {...state, deliveryAddress: payload} 
        },
        checkOut: (state) => {
            state.delivery = 'standard';
            state.items = [];
            state.addressDelivery = {};
            state.total = null;
            state.totalCartWithReduc = null;
        },
        /*ici je stocke le montant totale de la commande, donc si on utilise la fonction updatecartAction pour ajouter supprimer des
         produits, ce reducer sera appelé pour mettre à jour le prix totale*/
        totalCart: (state, {payload}) => {
            const calculateTotal = ($0, $1) => $0 + $1;
            let totalCart = current(state.items).map(item => {
                //biensur je prends en compte un prix qui a une reduction, et les prix sans réduction
                const total = item.priceReduction !== null ? item.priceReduction * item.quantity : item.price * item.quantity
                return total
            }).reduce(calculateTotal, 0) 
            //je rècupère tout ce qu'il y a dans initialState sans modifier, et je modifie juste la key 'total'
            //le payload du coup c'est un montant de code promo, si utilisé par l'user
            return { ...state, total: payload !== null ? totalCart - payload : totalCart }
        },
        //ici je modifie le prix total avec une reduction si l'user en a une
        totalCartWithReduc: (state, {payload}) => {
            return {...state, totalCartWithReduc: payload}
        },
        //ici on récupère de la bdd tous les produits qu'ont été ajouté au panier avant un achat validé.
        getAllproductsCart: (state, {payload}) => {
            state.items = payload
        } 
    }
})

export const { addToCart, removeFromCart, updateCart, setDeliveryChoice, setDeliveryAddress, checkOut, totalCart, totalCartWithReduc, getAllproductsCart } = cartSlice.actions;
export default cartSlice.reducer;