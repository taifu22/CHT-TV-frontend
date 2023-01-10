import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

const mapItem = (item, payload) => {
    console.log(item);
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
        delivery: 'standard'
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
        checkOut: (state) => {
            state.delivery= 'standard';
            state.items= []
        }
    }
})

export const {addToCart, removeFromCart, updateCart, setDeliveryChoice, checkOut} = cartSlice.actions;
export default cartSlice.reducer;