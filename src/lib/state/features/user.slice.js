import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: { 
        users: null,
        token: null
    },
    reducers: {
        //store token in redux store
        setTokenData: (state, {payload}) => {
            state.token = payload; 
        },
        //store user's data in redux store for login
        setUserData: (state, {payload}) => {
            state.users = payload;
        },
        //action to empty the store and then logout the user
        deleteDataUser: (state) => {
            state.users = null;
            state.token = null;
        },
        //action for add newAddress to store
        addNewAddressData: (state, {payload}) => {
            state.users.body.address = [...state.users.body.address, payload];
        },
        //action pour supprimer une addresse de livraison
        deleteAddressData: (state, {payload}) => {
            state.users.body.address = state.users.body.address.filter((pic, index) => index !== payload);
        },
        //acton to edit last and user's firstname
        edituserLastFirstName: (state, {payload}) => {
            state.users.body.firstname = payload.firstname;
            state.users.body.lastname = payload.lastname;
        },
        //action to edit user's email
        editEmailUser: (state, {payload}) => {
            state.users.body.email = payload.email
        },
        //action to add new order in user's profile
        addnewOrder: (state, {payload}) => {
            state.users.body.orders = [...state.users.body.orders, payload];
        },
        //action to update user's profil's image
        updateUserProfilImage: (state, {payload}) => {
            state.users.body.image = payload
        }
    }
})

export const {setUserData, setTokenData, editUserData, deleteDataUser, deleteAddressData, addNewAddressData, edituserLastFirstName, editEmailUser, addnewOrder, updateUserProfilImage} = userSlice.actions;
export default userSlice.reducer;
