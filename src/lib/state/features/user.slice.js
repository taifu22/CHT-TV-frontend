import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: { 
        //user contient toutes les infos récupèré de la bdd concernanr le user
        users: null,
        //ici on stocke le token pour l'utiliser lors des appels à la bdd
        token: null,
        //ici on stocke les infos de la livraison pour les afficher dans la modal en info commande (dashboard admin, et myorder user)
        address: null,
        //ici de meme pour la dashboard admin coté commandes on stocke les info de la commande dans une modal
        order: null,
        //ici on stocke toutes les orders pour pouvoir les afficher seulement coté admin et faire une recherche par numéro de commande(donc afficher les commandés rechercés en temps réele)
        orders: null,
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
            state.address = null;
            state.orders = null;
            state.order = null;
            state.opinionsWithReport = null
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
        //action to delete new order if the user cancel an order befor the stripe checkouot
        deleteNewOrder: (state) => {
            if (state.users.body.orders.length == 1) {
                state.users.body.orders = []
            } else {
                state.users.body.orders = state.users.body.orders.pop();
            } 
        },
        //action to update user's profil's image
        updateUserProfilImage: (state, {payload}) => {
            state.users.body.image = payload
        },
        //action for add newproduct favorite to store
        addNewFavorisData: (state, {payload}) => {
            state.users.body.favoris = [...state.users.body.favoris, payload];
        },
        //action pour supprimer un produit de la liste des favoris
        deleteFavorisData: (state, {payload}) => {
            state.users.body.favoris = state.users.body.favoris.filter((pic) => pic.id !== payload); 
        },
        //action for add new product opinion to store
        addNewOpinionData: (state, {payload}) => {
            state.users.body.opinions = [...state.users.body.opinions, payload];
        },
        //afficher l'adresse de livraison dans les informations des commandes passées
        setAddressInfosOrders: (state, {payload}) => {
            state.address = payload
        },
        //afficher la liste des orders de tous les utilisateurs dans la dashboard de l'admin
        getAllOrdersFromAdmin: (state, {payload}) => {
            state.orders = payload
        },
        //affiches les infos de la comande en cours dans la modal infos commande de la dashboard admin
        setOrderFromAdmin: (state, {payload}) => {
            state.order = payload
        },
        //action for add new report opinion to store
        //ici on stocke les opinions signalé par l'utilisateur, comme ca il ne donne pas plus d'une signalisation par avis
        addNewReportOpinionData: (state, {payload}) => {
            state.users.body.opinionsWithReport = [...state.users.body.opinionsWithReport, payload]
        },
    }
})

export const {setUserData, 
                setTokenData, 
                editUserData, 
                deleteDataUser, 
                deleteAddressData, 
                addNewAddressData, 
                edituserLastFirstName, 
                editEmailUser, 
                addnewOrder, 
                deleteNewOrder, 
                updateUserProfilImage, 
                addNewFavorisData, 
                deleteFavorisData, 
                addNewOpinionData, 
                setAddressInfosOrders,
                getAllOrdersFromAdmin,
                setOrderFromAdmin,
                addNewReportOpinionData} = userSlice.actions;

export default userSlice.reducer;
