import { createSlice } from "@reduxjs/toolkit";

export const promosCodeSlice = createSlice({
  name: "promosCodes",
  initialState: { 
    promosCode: [],
    reductionPrice: null,
    priceCodepromo: null,
    promoOK: false
  },
  reducers: {
      //ici on rècupère tous les codes promo
      getAllsPromosCode: (state, {payload}) => { 
        return {
          promosCode: payload,
        }
      },
      /*ici si on ajoute une nouveau code promo on l'ajoutera à notre tableau pour la voir directement dans le menu 'liste des codes promo'
      dans la dashboard admin*/
      addNewPromosCodeAdmin: (state, {payload}) => {
        state.promosCode.push(payload)
      },
      deletePromosCodeFromAdmin: (state, {payload}) => {
        state.promosCode = state.promosCode.filter(item => {
          return item._id !== payload;
        })
      }, 
      /*ici, dans ces 2 reducers on va sauvegarder le nom et montant de la reduction, pour l'envoyer au service back end du stripe,
      et du coup pour que stripe gère la réduction*/
      setReductionPrice: (state, {payload}) => {
        state.reductionPrice = payload.name
        state.priceCodepromo = payload.price
      },
      //si l'on choisi un code promo, l'user ne pourra plus en utiliser un autre, ou utiliser le meme
      setPromoOK: (state, {payload}) => {
        state.promoOK = payload
      },
      //une fois le user déconnecté (logOut) de la session on vide le tout
      setLogOutDeleteCodesPromo: (state) => {
        state.promosCode = []
        state.reductionPrice = null
        state.priceCodepromo = null
        state.promoOK = false
      } 
  }
})

export const { getAllsPromosCode, addNewPromosCodeAdmin, deletePromosCodeFromAdmin, setReductionPrice, setPromoOK, setLogOutDeleteCodesPromo } = promosCodeSlice.actions; 
export default promosCodeSlice.reducer;
