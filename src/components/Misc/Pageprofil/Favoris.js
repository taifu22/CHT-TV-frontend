import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import serviceUser from '../../../lib/service/serviceUser';
import { deleteFavorisData } from '../../../lib/state/features/user.slice';
import { addToCart } from '../../../lib/state/features/cart.slice';

function Favoris(props) {

    const dispatch = useDispatch();
    const favoris = useSelector(state => ({...state.user.users.body}));
    const token = useSelector(state => ({...state.user.token}));

    const addTocartAction = (id, name, price) => dispatch(addToCart({id, name, price}))
    function deleteFavorite(id) {
        serviceUser.deleteFavorisUser(token.accessToken, id);
        dispatch(deleteFavorisData(id));
    }

    useEffect(() => {
        console.log(favoris.favoris);
    },[])

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
                                <img src={ `images/items/${item.name}.jpg`}/>
                                <div className='infos-product'>
                                    <p>{item.name}</p>
                                    <p className='infos-price'>{item.price} Є</p>
                                </div>
                                <div className='buttons-favoris-product'>
                                    <button onClick={() => addTocartAction(item.id, item.name, item.price)} className='btn btn-primary'>Ajouter au panier</button>
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