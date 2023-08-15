import React, { useEffect } from 'react';  
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, totalCart, updateCart } from '../../lib/state/features/cart.slice';
import { addNewFavorisData,deleteFavorisData } from '../../lib/state/features/user.slice';
import serviceUser from '../../lib/service/serviceUser';
import useWindowSize from '../../lib/hooks/useScreenSize';
import serviceCart from '../../lib/service/serviceCart';

const Row = ({ id, name, price, quantity, category, picture, priceReduction, percentageReduction}) => { 

    const dispatch = useDispatch();

    //function pour supprimer un produit du panier
    const removeFromcartAction = (e) => {
        e.preventDefault();
        dispatch(removeFromCart({ id }));
        serviceCart.deleteDataProductCart(token.accessToken, id);
        //je dispatch dans le store le montant total avec le produit ajouté ou supprimé
        return dispatch(totalCart());
    }

    //function pour incrémenter/décrémenter la quantité d'un produit
    const updateCartAction = (e) => {
        let value = parseInt(quantity);
        if (quantity > 0) {
            if (e.target.className === "fa-solid fa-plus") { 
            value += 1;
            } else {
                if (quantity >1) {
                    value -= 1
                } else {
                    value = 1
                }
                
            }
        }
        //je dispatch dans le store mon produit que j'ai ajouté ou supprimé
        dispatch(updateCart({id, value}))
        //j'envoie la quantité du produit aussi dans la bdd, coté collection cart de l'user
        serviceCart.updateQuantityProductCart(token.accessToken, id, value);
        //je dispatch dans le store le montant total avec le produit ajouté ou supprimé
        return dispatch(totalCart());
    }

    const token = useSelector(state => ({...state.user.token}));
    const addDataFavoris = (id) => {
        const newData = {
            id : id,  
        }
        serviceUser.addNewDataFavoris(token.accessToken, newData)
        dispatch(addNewFavorisData(newData))
    }

    function deleteFavorite(id) {
        serviceUser.deleteFavorisUser(token.accessToken, id);
        dispatch(deleteFavorisData(id));
    }

    //fonction pour ajouter/supprimer un produit des favoris
    function onClickfavoris(params) {
        if (productFav === undefined) {
            alert('il faut se connecter pour ajouter un produit aux favoris')
        } else {
            console.log(picture);
            productFav !== undefined && (productFav.includes(id) ? deleteFavorite(id) : addDataFavoris(id))
        }
    }

    const favoris = useSelector(state => ({...state.user.users}));
    let productFav;

    /*on stocke les id des favoris, pour pouvoir supprimer de la liste si on reclique sur un produit dejà mis en favoris
    Bien sur si on est pas connecté donc token pas présent on va pas avoir acces aux favoris, donc on fait une condition*/
    if (token['accessToken'] !== undefined) {
        productFav = favoris.body.favoris.map(item => {
            return item.id
        })   
    }  

    //fonction pour afficher l'image du profile (on l'utilisera dans le src de la balise img)
    const imageData = () => {
        let image1;
        //on verifie si la key image existe dans le body des info de l'user (voir bdd)
        if (picture.data !== undefined){
            //si existe on affiche l'image stocké dans le dossier uploads du back (geré par multer)
            image1 = 'http://localhost:4000/uploads/imagesUsersProfil/' + picture.data;    
        } else {
            //sinon si l'user vient de s'enregister on mets une image profil par défaut
            image1 = "./images/avatars/avatar3.jpg"
        }
        return image1; 
    }

    const screenWidth = useWindowSize().width;

    return (
        <div className="col-12 p-0 row-product-cart-responsive"> 
            <div className="product-menu-list">
                <img className='m-3' src={imageData()} /> 
                <div className="figcaption m-3 w-100">
                    <div className='row'>
                        <p className="p-elipsis text-primary col-10">{ name }</p>
                    </div>
                    {(percentageReduction && priceReduction !== null) ? 
                                                <div className='mt-3 mb-3 d-flex align-items-center'>
                                                    <p className='text-danger price h5'><b>{ priceReduction }€ </b></p>
                                                    <span className="badge badge-danger ml-3 mb-2"><em>Reduction</em> {percentageReduction}</span>
                                                </div> : <div className="p-price price h5 mt-2">{ price } €</div>}   
                    <div className='incr-decr-quantity'>
                        <div className='div-plus' onClick={(e)=> updateCartAction(e)}>
                            <i className="fa-solid fa-plus"></i>
                        </div>
                        <p>x{ quantity }</p>
                        <div className='div-minus' onClick={(e)=> updateCartAction(e)}>
                            <i className="fa-solid fa-minus"></i>   
                        </div>
                    </div>    
                </div>
                <div className="btn-group btn-group-toggle float-right div-buttons" data-toggle="buttons">
                    <label className= {screenWidth > 576 ? "btn btn-light active" : "btn btn-light active btn-sm"}>
                        <input onClick={() => onClickfavoris()} type="radio" name="options" id="option1"  checked />
                            <i className={productFav !== undefined ? (productFav.includes(id) ? "fas fa-heart text-danger fa-xl" : "far fa-heart text-dark fa-xl") : "far fa-heart text-dark fa-xl"}></i>
                    </label>

                    <label className={screenWidth > 576 ? "btn btn-danger" : "btn btn-danger btn-sm"}>
                        <input onClick={removeFromcartAction} type="radio" name="options" id="option3" /><i className="fas fa-trash fa-xl"></i>
                    </label> 
                </div> 
            </div>
        </div>
    )
    
}
export default Row  