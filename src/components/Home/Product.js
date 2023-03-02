import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../lib/state/features/cart.slice';
import { addNewFavorisData } from '../../lib/state/features/user.slice';
import { deleteFavorisData } from '../../lib/state/features/user.slice';
import serviceUser from '../../lib/service/serviceUser';
import useModal from '../../lib/hooks/useModal';
import ProductDetails from './ProductDetails'; 

const Product = ({ id, name, price, category, description, opinions, purchases, pictures }) => {

    //state for show modal with product details
    const {isShowing: isInfoShowed, toggle: toggleInfo} = useModal();

    const dispatch = useDispatch();
    const token = useSelector(state => ({...state.user.token}));
    const favoris = useSelector(state => ({...state.user.users}));
    let arrayStar = [];
    let productFav;

    /*on stocke les id des favoris, pour pouvoir supprimer de la liste si on reclique sur un produit dejà mis en favoris
    Bien sur si on est pas connecté donc token pas présent on va pas avoir acces aux favoris, donc on fait une condition*/
    if (token['accessToken'] !== undefined) {
        productFav = favoris.body.favoris.map(item => {
            return item.id
        })   
    } 

    const addTocartAction = () => dispatch(addToCart({id, name, price, pictures}))

    const addDataFavoris = (id, category, name, price, pictures) => {
        const newData = {
            id : id,
            category: category,
            name: name,
            price: price,
            pictures: pictures  
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
            productFav !== undefined && (productFav.includes(id) ? deleteFavorite(id) : addDataFavoris(id, category, name, price, pictures))
        }
    }

    //function pour calculer la moyen des étoile concernant les avis des utilisateurs
    function MeanStarsCalculate() {
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
    function NumberPurchases(params) { 
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

    //affichage de l'image du produit stocké dans le backend ou une image par défaut si pas d'image dispo
    const imageData = () => { 
        let image1;
        //on verifie si la key image existe dans le body des info de l'user (voir bdd)
        if (pictures !== undefined){
            //si existe on affiche l'image stocké dans le dossier uploads du back (geré par multer)
            image1 = 'http://localhost:4000/uploads/imagesUsersProfil/' + pictures[0].filename;     
        } else {
            //sinon si l'user vient de s'enregister on mets une image profil par défaut
            image1 = "./images/avatars/avatar3.jpg"
        }
        return image1;
    }

    return (
    <>
    <div className="col-sm-4 col-6" onClick={toggleInfo}>
        <div className="card card-product-grid">
            <a href="#" className="img-wrap"> <img src={imageData()} /> </a> 
            <figcaption className="info-wrap">
                <ul className="rating-stars mb-1">
                    {Viewstars(star, MeanStarsCalculate())}
                </ul> 
                <span className='ml-2'>{MeanStarsCalculate() ? MeanStarsCalculate() : "aucun avis"} </span>
                <p>{(purchases.length >= 1 && NumberPurchases() > 1 ) ? NumberPurchases() + ' articles vendus' : (purchases.length == 1 && NumberPurchases() == 1) ? purchases.length+ ' article vendu' : '0 articles vendus'} </p>
                <div>
                    <a href="#" className="text-muted">{ category } : </a>
                    <a href="#" className="title">{ name }</a>
                </div>
                <div className="price h5 mt-2">${ price }</div>
                    <div className="btn-group btn-group-toggle float-right" data-toggle="buttons">
                        <label className="btn btn-light active">
                            <input 
                                onClick={() => onClickfavoris()} 
                                type="radio" 
                                name="options" 
                                id="option1"  
                                checked    
                                />
                                <i className={productFav !== undefined ? (productFav.includes(id) ? "fas fa-heart text-danger fa-xl" : "far fa-heart text-dark fa-xl") : "far fa-heart text-dark fa-xl"}></i>
                        </label>

                        <label className="btn btn-success">
                            <input onClick={addTocartAction} type="radio" name="options" id="option3" /><i className="fas fa-shopping-cart fa-xl"></i>
                        </label> 
                    </div>        
            </figcaption>
        </div>
    </div>
    {isInfoShowed && <ProductDetails 
                            cart={addTocartAction} 
                            favoris={onClickfavoris} 
                            hide={toggleInfo} 
                            show={isInfoShowed} 
                            data={{price:price, name:name, category:category, description:description, id:id, pictures:pictures}}
                            productFavoris={productFav}
                            stars={Viewstars}
                            opinions={opinions}
                            starArray={[1,2,3,4,5]}
                            totalStars={MeanStarsCalculate}
                            token={token}
                        />}
    </>
    )
}
export default Product