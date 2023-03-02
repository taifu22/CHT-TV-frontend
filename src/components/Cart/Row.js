import React, { useEffect } from 'react';  
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateCart } from '../../lib/state/features/cart.slice';
import { addNewFavorisData,deleteFavorisData } from '../../lib/state/features/user.slice';
import serviceUser from '../../lib/service/serviceUser';

const Row = ({ id, name, price, quantity, category, picture}) => { 

    const dispatch = useDispatch();
    const removeFromcartAction = (e) => {
        e.preventDefault();
        dispatch(removeFromCart({ id }))
    }
    const updateCartAction = (e) => {
        e.preventDefault();
        const value = parseInt(e.target.value)
        return dispatch(updateCart({id, value}))
    }

    const token = useSelector(state => ({...state.user.token}));
    const addDataFavoris = (id, name, price) => {
        const newData = {
            id : id,
            name: name,
            price: price  
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
            productFav !== undefined && (productFav.includes(id) ? deleteFavorite(id) : addDataFavoris(id, name, price))
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
        if (picture !== undefined) {
            //si existe on affiche l'image stocké dans le dossier uploads du back (geré par multer)
            image1 = 'http://localhost:4000/uploads/imagesUsersProfil/' + picture.data;    
        } else {
            //sinon si l'user vient de s'enregister on mets une image profil par défaut
            image1 = "./images/avatars/avatar3.jpg"
        }
        return image1; 
    }

    useEffect(()=>{
        console.log(picture);
    },[])

    return (
        <tr>
            <td>
                <figure className="itemside">
                    <div className="aside"><img src={imageData()} className="img-sm" /></div>
                    <figcaption className="info">
                        <a href="#" className="title text-dark">{ name }</a>
                    </figcaption>
                </figure>
            </td> 
            <td> 
                <select className="form-control" value={quantity} onChange={(e) => updateCartAction(e)}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select> 
            </td>
            <td>    
                <div className="price-wrap"> 
                    <span className="price">${price * quantity}</span> 
                </div>
            </td>
            <td className="text-right"> 
                <a data-original-title="Save to Wishlist" title="" 
                   className="btn btn-light" 
                   data-toggle="tooltip" 
                   onClick={() => onClickfavoris()}> 
                   <i className={productFav !== undefined ? (productFav.includes(id) ? "fas fa-heart text-danger fa-lg" : "far fa-heart text-dark a-lg") : "far fa-heart text-dark a-lg"}></i></a> 
                <a href="" className="btn btn-light btn-round" onClick={(e) => removeFromcartAction(e)}> Remove</a>
            </td>
    </tr>)
}
export default Row 