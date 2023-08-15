import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import serviceUser from '../../../lib/service/serviceUser';
import { deleteFavorisData } from '../../../lib/state/features/user.slice';
import { addToCart } from '../../../lib/state/features/cart.slice';
import serviceCart from '../../../lib/service/serviceCart';

function Favoris(props) {

    const dispatch = useDispatch();
    const favoris = useSelector(state => ({...state.user.users.body}));
    const product = useSelector(state => state.products.itemsAll)
    const token = useSelector(state => ({...state.user.token})); 

    const addTocartAction = (id, name, price, category, picture) => {
        dispatch(addToCart({id, name, price, category, picture}))
        serviceCart.addNewDataProductCart(token.accessToken, {id, name, price, category, picture});
    }
    function deleteFavorite(id) {
        serviceUser.deleteFavorisUser(token.accessToken, id);
        dispatch(deleteFavorisData(id));
    } 

    //affichage de l'image du produit stocké dans le backend ou une image par défaut si pas d'image dispo
    const imageData = (picture) => { 
        let image1;
        //on verifie si l'image existe
        if (picture !== undefined){
            //si existe on affiche l'image stocké dans le dossier uploads du back (geré par multer)
            image1 = 'http://localhost:4000/uploads/imagesUsersProfil/' + picture;    
        } 
        else {
            //sinon si l'user vient de s'enregister on mets une image profil par défaut
            image1 = "./images/avatars/avatar3.jpg"
        }
        
        
        console.log(image1);
        return image1;
    }

    return (
        <div className='container div-favoris'>
            <h2 className='m-3 text-center text-primary'>Liste des produits favoris</h2>
            <hr/>
            <br/>
            <div className='container-favoris-products'>
                {favoris.favoris.length > 0 ?
                    favoris.favoris.map(item => {
                        return product.map(item1 => {
                            //pour afficher les infos du produit en favoris, on récupère celle du produits avec le meme id
                            if(item.id == item1.id){
                                return(
                                    <div className='favoris-product row'>
                                        <div className='col-xs-12 col-lg-2 d-flex justify-content-center'>
                                            <img src={imageData(item1.picture.data)} />
                                        </div>
                                        <div className='infos-product col-xs-2'>
                                            <p>{item1.name}</p>
                                            {(item1.percentageReduction && item1.priceReduction !== null) ? 
                                            <div className='mt-3 mb-3 d-flex align-items-center'>
                                                <p className='text-danger price h5'><b>{item1.priceReduction}€ </b></p>
                                                <span className="badge badge-danger ml-3 mb-2"><em>Reduction</em> {item1.percentageReduction}</span>
                                            </div> : <div className="infos-price h5 mt-2">{ item1.price } €</div>}
                                        </div>
                                        <div className='d-flex flex-column align-items-center justify-content-between mt-3'>
                                            <i role={'button'} title='Ajouter au panier' className="fa-2x mb-3 text-success fa-solid fa-cart-shopping" onClick={() => addTocartAction(item1.id, item1.name, item1.price, item1.category, item1.picture)}></i>
                                            <i role={'button'} className="fa-2x text-danger fa-solid fa-trash" title='supprimer' onClick={() => deleteFavorite(item.id)} ></i>
                                        </div>
                                    </div>) 
                            }
                        })
                    }) : "Your liste of favorites is empty"
                }
            </div>
        </div>
    );
}

export default Favoris;