import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProductFromAdmin, setInfosProductFromAdmin } from '../../../lib/state/features/products.slice';
import serviceAdmin from '../../../lib/service/serviceAdmin';
import { returnProductsArrays } from "../../../lib/service/service";
import { getProductsSuccess } from "../../../lib/state/features/products.slice";
import { getProducts } from "../../../lib/service/service";
import useModal from '../../../lib/hooks/useModal';
import ModalAddProduct from './ModalAddproduct';

function ListProducts(props) {

    const dispatch = useDispatch();
    const products = useSelector(state => state.products.items);
    const token = useSelector(state => ({...state.user.token}))
    const {isShowing: isInfoShowed, toggle: toggleInfo} = useModal();
    const {isShowing: isInfoShowed2, toggle: toggleInfo2} = useModal(); 
    const [valueInput, setValueInput] = useState("");
    let arrayStar = []; 
    const productsSorted = []

    //function pour calculer la moyen des étoile concernant les avis des utilisateurs
    function MeanStarsCalculate(opinions) {
        opinions.length && opinions.map(item => {
            arrayStar.push(item.star)
        }) 
        let sum = 0;
        arrayStar.forEach(item => {
            sum += item
        })
        return sum / arrayStar.length
    }
    //fonction pour afficher les étoile par rapport au avis des utilisateurs sur le produit
    function Viewstars(arrayStar, func) {
        return arrayStar.map((item, index) => { 
            return (
                    item <= func ? 
                    <i key={'key-etoile'+index} style={{color:'#FFD700'}} className=" fa fa-solid fa-star"></i> : 
                    <i key={'key-etoile'+index} style={{color:'#CCCCCC'}} className=" fa fa-solid fa-star"></i>)
        })
    }
    //tableau qui me sert pour afficher les étoiles dan la balise ul ci-dessous
    let star = [1,2,3,4,5]

    /*fonction pour afficher le nombres de ventes du produit (on recupère la key quantité de chaque vente du produit
    ,car si un user achete plusieurs quantité du meme produit on aura une seule vente, un seul objet, du coup c'est 
    à ca qui nous aide la key quantité)*/
    function NumberPurchases(purchases) {
        let result = []
        let sum = 0
        purchases.map(item => {
            result.push(item.quantity) 
        })
        for (let i = 0; i < result.length; i++) {
            sum+= result[i]
        } 
        return sum
    } 

    //fonction pour supprimer un produit de la bdd et du store redux
    function deleteProduct(id, token) {
        serviceAdmin.deleteProductAdminService(id, token);
        dispatch(deleteProductFromAdmin(id));
    }

    //function to sorted gallery products with the value of input
    function onChangeInput(e) {
        setValueInput(e.target.value.toLowerCase())
    }
    //in this useEffect we sort the store redux of produits by ration of input's value
    useEffect(() => { 
        products.map(item => {
            item.map(item1 => {
                if (item1.name.toLowerCase().includes(valueInput)) {
                    productsSorted.push(item1)
                }
            })
        })
        if (valueInput.length === 0 && valueInput === "") {
            getProducts()
                .then((response) => returnProductsArrays(response.data.data))
                .then((productData) => dispatch(getProductsSuccess(productData)))
        } else {
            const productsArrayPagination = returnProductsArrays(productsSorted);
            dispatch(getProductsSuccess(productsArrayPagination));
        }
    },[valueInput])

    //affichage de l'image du produit stocké dans le backend ou une image par défaut si pas d'image dispo
    const imageData = (img) => { 
        let image1;
        //on verifie si la key image existe dans le body des info de l'user (voir bdd)
        if (img.pictures !== undefined){
            //si existe on affiche l'image stocké dans le dossier uploads du back (geré par multer)
            image1 = 'http://localhost:4000/uploads/imagesUsersProfil/' + img.pictures[0].filename;    
        } else {
            //sinon si l'user vient de s'enregister on mets une image profil par défaut
            image1 = "./images/avatars/avatar3.jpg"
        }
        return image1;
    }

    //fonction pour vider le tableau des étoiles à la fin de chargement de chaque produit (item)
    function EmptyArrayStars(params) {
        arrayStar = []
    }
 
    return (
        <div className='list-product-admin'>
            <h2 className='m-3 text-center text-primary'>Liste des produits</h2>
            <br/>
            <div className='div-search-button-add'>
                <div className="input-group-prepend mr-3">
                    <div className="form-outline">
                        <input onChange={e => onChangeInput(e)} value={valueInput} id="search-focus" type="search" placeholder="search" className="form-control" />
                    </div>
                    <button type="button" className="btn btn-primary">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
                <div className='add-product-admin'>
                    <i role={'button'} data-toggle="modal" data-target="#modalAddproduct" onClick={()=>toggleInfo()} title='ajouter un nouveau produit' class="fa-solid fa-plus"></i>
                </div>     
                {/* <button data-toggle="modal" data-target="#modalAddproduct" onClick={()=>toggleInfo()} className='btn btn-success'>Ajouter un nouveau produit</button> */}
                {isInfoShowed && <ModalAddProduct updateProduct={false} dataTarget={"modalAddproduct"} funcToggle={()=>toggleInfo()} />}
            </div>
            <hr/>
            <div className='list-products-admin-into'>
            {products.map(item =>{
                return item.map(item1 => {
                    return(
                        <>   
                            <div className='product-admin'>
                                <div className='product-admin-image-name'>
                                    <img src={imageData(item1)} /*src={ `images/items/${item1.name}.jpg`}*/ />
                                    <div className='name-rating'>
                                        <h5>{item1.name}</h5>
                                        <p>{item1.category}</p>
                                        <ul className="rating-stars mb-1">
                                            {Viewstars(star, MeanStarsCalculate(item1.opinions))}
                                        </ul> 
                                        <span className='ml-2'>{item1.opinions.length > 0 ? MeanStarsCalculate(item1.opinions) : "aucun avis"} </span>
                                    </div>
                                </div>
                                <div className='product-admin-price-action'>
                                    <div className='product-admin-price'>
                                        { (item1.percentageReduction && item1.priceReduction !== null) ? 
                                            <div className='d-flex align-items-center'>
                                                <p className='text-danger'><b>{item1.priceReduction} € </b></p>
                                                <span className="badge badge-danger ml-2 mb-3"><em>Reduction</em> {item1.percentageReduction}</span>
                                            </div> : <p>{item1.price} € </p>}
                                        <p>{(item1.purchases.length >= 1 && NumberPurchases(item1.purchases) > 1 ) ? NumberPurchases(item1.purchases) + ' articles vendus' : (item1.purchases.length == 1 && NumberPurchases(item1.purchases) == 1) ? item1.purchases.length+ ' article vendu' : '0 articles vendus'} </p>
                                    </div>
                                    {/*je vide le tableau des etoiles, pour que ca soit vide pour le prochaine produit du map (sinon conflits d'étoiles)arrayStar = []*/}
                                    <div className='d-flex flex-column justify-content-center mr-3'>
                                        <i onClick={()=>deleteProduct(item1.id, token.accessToken)} title='supprimer le produit' className="fa-solid fa-trash text-danger fa-lg" role={'button'}></i>
                                        {/* <button onClick={()=>deleteProduct(item1.id, token.accessToken)} className='btn btn-outline-danger'>Supprimer le produit</button> */}
                                        <i data-toggle="modal" data-target="#modalUpdateproduct" onClick={()=>{toggleInfo2();dispatch(setInfosProductFromAdmin(item1))}} title='modifier le produit' className="fa-solid fa-pen-to-square text-info mt-4" role={'button'}></i>
                                        {/* <button data-toggle="modal" data-target="#modalUpdateproduct" onClick={()=>{toggleInfo2();dispatch(setInfosProductFromAdmin(item1))}} className='btn btn-outline-info'>Modifier le produit</button> */}
                                        {isInfoShowed2 && <ModalAddProduct updateProduct={true} dataTarget={"modalUpdateproduct"} funcToggle={()=>toggleInfo2()} />}
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            {EmptyArrayStars()}
                        </>)
                })
            })}
            </div>
        </div>
    );
}

export default ListProducts;