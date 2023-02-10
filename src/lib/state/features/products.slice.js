import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: { 
    isLoading: false,
    error: null,
    pageIndex: 0,
    items: [],
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
  }
})

export const {getProductsFailure, getProductsSuccess, getProductsPending, setPageIndex} = productsSlice.actions;
export default productsSlice.reducer;
