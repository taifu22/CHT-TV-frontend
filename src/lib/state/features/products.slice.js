import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: { 
    isLoading: false,
    error: null,
    pageIndex: 0,
    items: [],
    //ici on stocke les images du produit que l'on veut modifier (modification produits coté dashboard admin)
    infosProduct: null,
    //ici on stockera tous les produits sans devoir toucher au items, qui sera utiliser juste pour la pagination donc
    //avoir des array chaque 9 products
    //on utilise itemsAll pour récuperer les infos d'un produit par exemple afficher ses infos depuis les favoris de l'user
    itemsAll: [],
    //state for store the priceReduction if admin choice to defined a reduction for the product (in modal edit product in dashboardAdmin)
    priceReduction: null
  },
  reducers: {
      getProductsPending: (state) => {
        return { 
          ...state,
          isLoading: true,
        }
      },
      //ici on récupère les produits avec pagination, donc si 10 produits dans items on aura 2 arrays, un avec 9 product et un avec 1
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
      //voilà ici on récupère tous les produits sans pagination
      getAllproduct: (state, {payload}) => {
        state.itemsAll = payload
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
      },
      setPriceReduction: (state, {payload}) => {
        state.priceReduction = payload
      }
  }
})

export const {getProductsFailure, 
              getProductsSuccess, 
              getProductsPending, 
              setPageIndex, 
              deleteProductFromAdmin, 
              addNewProductAdmin, 
              setInfosProductFromAdmin, 
              deleteInfosproductFromAdmin,
              updateProductFromAdmin,
              getAllproduct,
              setPriceReduction } = productsSlice.actions;
              
export default productsSlice.reducer;
