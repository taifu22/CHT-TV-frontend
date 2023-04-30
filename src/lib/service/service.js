import {data} from '../../data/products';
import axios from './CallAxiosService';
import { getAllproduct, getProductsFailure, getProductsPending, getProductsSuccess } from '../state/features/products.slice';

//récupération des données mockées
export const getProductsMock = () => {
   return new Promise(resolve => {
      resolve(data);
   })
} 

//récupération des produits depuis notre API
export const getProducts = () => {
   return new Promise((onSuccess, onFail) => {
      axios.get('api/produits')
      .then((response, error) => {
         if (!response || error) {
            return onFail(`Response failure: ${error}`)
         }
         onSuccess(response);
      })
   })
}

//récupération des produits selon la catégorie choisi
export const fetchproductsWithCategory = (props) => {
   console.log(props);
   return function (dispatch) {
      getProducts()
      .then((response) => {
         let newArrayWithCategory = []
         response.data.data.map(item => {
            if (item.category === props) {
               newArrayWithCategory.push(item)
            }
         })
         return returnProductsArrays(newArrayWithCategory)
      })
      .then((productData) => dispatch(getProductsSuccess(productData)))
      .catch((err) => dispatch(getProductsFailure(err)))
    }
}
 
//ajouter un avis utilisateur sur la fiche d'un produit
export let addNewDataOpinion = (token, data) => {;
     let config = {
         headers: {
           'Authorization': 'Bearer ' + token
         }
     }
     let body = data 
     return axios.patch('api/produits/create-new-opinion', body, config);
}
//ajouter un nouvel achat sur la fiche d'un produit
export let addNewDataPurchase = (data) => {;
   let body = data 
   return axios.patch('api/produits/create-new-purchase', body);
}
//supprimer une date d'achat si l'user annule la commande pendant le checkout de stripe
export let deleteNewDataPurchase = (body) => {;
   return axios.patch('api/produits/cancel-new-purchase', body);
}

//rendre à null le price et percentage d'une reduction sur un produits depuis la dash admin, si l'on choisit de modifier via l'input le prix
const deletePricePercentageReduction = (token, id) => {
   let config = {
       headers: {
         'Authorization': 'Bearer ' + token
       }
   }
   let body = {id: id};
   return axios.patch('api/produits/null-price-percentage-reduction', body, config);
}

/*fonction pour pouvoir créér à partir d'un seul tableau plusieurs avec maximum 9 index, concernant la pagination
donc pour visualiser 9 produits par page dans notre composant gallery*/
export const returnProductsArrays = (items) => { 
   let TwoDimensionalArray = []
   let remainder = items.length % 9
   let i = 0
   while (i < (items.length - remainder)) {
     let array = items.slice(i, i + 9)
     TwoDimensionalArray.push(array)
     i += 9 
   } 
   const array = items.slice(i)
   TwoDimensionalArray.push(array)
   //if the last array empty we will delete it
   if (TwoDimensionalArray[TwoDimensionalArray.length - 1].length === 0) {
      TwoDimensionalArray.pop();
   }
   return TwoDimensionalArray
};

//dispatch des données vers le store redux avec les produits trié selon la pagination, donc 9 product par array
export const fetchProducts = () => {
   return function (dispatch) {
     dispatch(getProductsPending);
     getProducts()
     .then((response) => returnProductsArrays(response.data.data))
     .then((productData) => dispatch(getProductsSuccess(productData)))
     //.then(res => console.log(res))
     .catch((err) => dispatch(getProductsFailure(err)))
   }
 }  

 //dispatch des produits sans pagination, dans itemsAll du state.products du store, 
 export const fetchProductsWithoutPagination = () => {
   return function (dispatch) {
     dispatch(getProductsPending);
     getProducts()
     .then((response) => dispatch(getAllproduct(response.data.data)))
     .catch((err) => dispatch(getProductsFailure(err)))
   } 
 } 


 export default {deletePricePercentageReduction}