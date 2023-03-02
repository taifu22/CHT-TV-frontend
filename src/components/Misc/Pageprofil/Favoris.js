import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import serviceUser from '../../../lib/service/serviceUser';
import { deleteFavorisData } from '../../../lib/state/features/user.slice';
import { addToCart } from '../../../lib/state/features/cart.slice';

function Favoris(props) {

    const dispatch = useDispatch();
    const favoris = useSelector(state => ({...state.user.users.body}));
    const token = useSelector(state => ({...state.user.token}));

    const addTocartAction = (id, name, price, picture) => dispatch(addToCart({id, name, price, picture}))
    function deleteFavorite(id) {
        serviceUser.deleteFavorisUser(token.accessToken, id);
        dispatch(deleteFavorisData(id));
    }

    //affichage de l'image du produit stocké dans le backend ou une image par défaut si pas d'image dispo
    const imageData = (picture) => { 
        let image1;
        //on verifie si la key image existe dans le body des info de l'user (voir bdd)
        if (picture !== undefined){
            //si existe on affiche l'image stocké dans le dossier uploads du back (geré par multer)
            image1 = 'http://localhost:4000/uploads/imagesUsersProfil/' + picture.data;    
        } else {
            //sinon si l'user vient de s'enregister on mets une image profil par défaut
            image1 = "./images/avatars/avatar3.jpg"
        }
        return image1;
    }

    return (
        <div className='container-fluid div-favoris'>
            <h2 className='m-3 text-center text-primary'>Liste des produits favoris</h2>
            <hr/>
            <br/>
            <div className='container-favoris-products'>
                {favoris.favoris.length > 0 ?
                    favoris.favoris.map(item => {
                        return(
                            <div className='favoris-product'>
                                <img src={imageData(item.picture)}/>
                                <div className='infos-product'>
                                    <p>{item.name}</p>
                                    <p className='infos-price'>{item.price} Є</p>
                                </div>
                                <div className='buttons-favoris-product'>
                                    <button onClick={() => addTocartAction(item.id, item.name, item.price, item.picture)} className='btn btn-primary'>Ajouter au panier</button>
                                    <button onClick={() => deleteFavorite(item.id)} className='btn btn-danger'>Supprimer</button>
                                </div>
                            </div>)
                    }) : "Your liste of favorites is empty"
                }
            </div>
        </div>
    );
}

export default Favoris;