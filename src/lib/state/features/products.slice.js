import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: { 
    isLoading: false,
    error: null,
    pageIndex: 0,
    items: [],
    //ici on stocke les images du produit que l'on veut modifier (modification produits coté dashboard admin)
    infosProduct: null
  },
  reducers: {
      getProductsPending: (state) => {
        return { 
          ...state,
          isLoading: true,
        }
      },
      getProductsSuccess: (state, {payload}) => {
        return {
          ...state,
          isLoading: false,
          items: payload,
        }
      },
      getProductsFailure: (state, {payload}) => {
        return {
          ...state,
          isLoading: false,
          error: payload,
        }
      },
      setPageIndex: (state, {payload}) => {
        return {
          ...state,
          pageIndex: payload,
        }
      }, 
      deleteProductFromAdmin: (state, {payload}) => {
        state.items = state.items.map(item => {
          return item.filter((pic) => pic.id !== payload);
        })
      },
      addNewProductAdmin: (state, {payload}) => {
        state.items[state.items.length -1].push(payload)
      },
      updateProductFromAdmin: (state, {payload}) => {
        state.items = state.items.map(item => {
          return item.filter((pic) => pic.id !== payload.id);
        })
        state.items[state.items.length -1].push(payload)
      },
      setInfosProductFromAdmin: (state, {payload}) => {
        state.infosProduct = payload
      },
      deleteInfosproductFromAdmin: (state) => {
        state.infosProduct = null
      }
  }
})

export const {getProductsFailure, getProductsSuccess, getProductsPending, setPageIndex, deleteProductFromAdmin, addNewProductAdmin, setInfosProductFromAdmin, deleteInfosproductFromAdmin,updateProductFromAdmin } = productsSlice.actions;
export default productsSlice.reducer;
