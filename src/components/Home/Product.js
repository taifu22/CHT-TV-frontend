import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../lib/state/features/cart.slice';
import { addNewFavorisData } from '../../lib/state/features/user.slice';
import { deleteFavorisData } from '../../lib/state/features/user.slice';
import serviceUser from '../../lib/service/serviceUser';
import useModal from '../../lib/hooks/useModal';
import ProductDetails from './ProductDetails'; 
import useWindowSize from '../../lib/hooks/useScreenSize'; 
import serviceCart from '../../lib/service/serviceCart';

const Product = ({ id, name, price, category, description, opinions, purchases, pictures, picture, toggle, priceReduction, percentageReduction }) => {

    /*ici la proprieté dans les props 'toggle', me permete de passer de l'affichage par grid, vers l'affichage par liste
    a savoir que l'affichage par grid c'est la className 'card-product-grid', et celle par liste c'est la 'product-menu-list' */

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

    const addTocartAction = () => {
        const newData = {
            id : id,
            category: category,
            name: name,
            price: price,
            picture: picture,
            priceReduction: priceReduction,
            percentageReduction: percentageReduction, 
            quantity: 1
        }
        dispatch(addToCart(newData)) 
        token.accessToken !== undefined && serviceCart.addNewDataProductCart(token.accessToken, newData);
    } 

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
            productFav !== undefined && (productFav.includes(id) ? deleteFavorite(id) : addDataFavoris(id))
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

    const screenWidth = useWindowSize().width; 

    return ( 
    <>
    {toggle ? <div className="col-md-4 col-6 col-lg-3 p-0" onClick={toggleInfo}>
        <div className="card card-product-grid">
            <img className='m-3' src={imageData()} /> 
            <figcaption className="info-wrap">
                <ul className="rating-stars mb-1">
                    {Viewstars(star, MeanStarsCalculate())} 
                </ul> 
                {screenWidth > 576 ? <span className='ml-2'>{MeanStarsCalculate() ? MeanStarsCalculate() : "aucun avis"} </span> : ""}
                <p>{(purchases.length >= 1 && NumberPurchases() > 1 ) ? NumberPurchases() + ' vendus' : (purchases.length == 1 && NumberPurchases() == 1) ? purchases.length+ ' vendu' : 'pas vendu'} </p>
                <div>
                    <a href="#" className="text-muted">{ category } : </a>
                    <a href="#" className="title">{ name }</a>
                </div>
                {(percentageReduction && priceReduction !== null) ? 
                                            <div className='mt-3 mb-3 d-flex align-items-center'>
                                                <p className='text-danger price h5'><b>{priceReduction}€ </b></p>
                                                <span className="badge badge-danger ml-3 mb-2"><em>Reduction</em> {percentageReduction}</span>
                                            </div> : <div className="price h5 mt-2">{ price } €</div>}
                    <div className="btn-group btn-group-toggle float-right" data-toggle="buttons">
                        <label className= {screenWidth > 576 ? "btn btn-light active" : "btn btn-light active btn-sm"}>
                            <input 
                                onClick={() => onClickfavoris()} 
                                type="radio" 
                                name="options" 
                                id="option1"  
                                checked    
                                />
                                <i className={productFav !== undefined ? (productFav.includes(id) ? "fas fa-heart text-danger fa-xl" : "far fa-heart text-dark fa-xl") : "far fa-heart text-dark fa-xl"}></i>
                        </label>

                        <label className={screenWidth > 576 ? "btn btn-success" : "btn btn-success btn-sm"}>
                            <input onClick={addTocartAction} type="radio" name="options" id="option3" /><i className="fas fa-shopping-cart fa-xl"></i>
                        </label> 
                    </div>        
            </figcaption>
        </div>
    </div> : <div className="col-12 p-0" onClick={toggleInfo}> 
        <div className="product-menu-list">
            <img className='m-3' src={imageData()} /> 
            <figcaption className="m-3 w-100">
                <div className='row'>
                    <p className="p-elipsis text-primary col-10">{ name }</p>
                </div>
                <div className='container-fluid pl-0'>
                    <div className='row w-100'>
                        <p className="p-elipsis col-7">{ description }</p>
                    </div>
                </div>
                {(percentageReduction && priceReduction !== null) ? 
                                            <div className='mt-3 mb-3 d-flex align-items-center'>
                                                <p className='text-danger price h5'><b>{priceReduction}€ </b></p>
                                                <span className="badge badge-danger ml-3 mb-2"><em>Reduction</em> {percentageReduction}</span>
                                            </div> : <div className="p-price price h5 mt-2">{ price } €</div>}
                <ul className="rating-stars mb-1 ">
                    {Viewstars(star, MeanStarsCalculate())}
                </ul> 
                {screenWidth > 576 ? <span className='ml-2'>{MeanStarsCalculate() ? MeanStarsCalculate() : "aucun avis"} </span> : ""}
                <p>{(purchases.length >= 1 && NumberPurchases() > 1 ) ? NumberPurchases() + ' vendus' : (purchases.length == 1 && NumberPurchases() == 1) ? purchases.length+ ' vendu' : 'pas vendu'} </p>       
            </figcaption>
            <div className="btn-group btn-group-toggle float-right div-buttons" data-toggle="buttons">
                <label className= {screenWidth > 576 ? "btn btn-light active" : "btn btn-light active btn-sm"}>
                    <input 
                        onClick={() => onClickfavoris()} 
                        type="radio" 
                        name="options" 
                        id="option1"  
                        checked    
                        />
                        <i className={productFav !== undefined ? (productFav.includes(id) ? "fas fa-heart text-danger fa-xl" : "far fa-heart text-dark fa-xl") : "far fa-heart text-dark fa-xl"}></i>
                </label>

                <label className={screenWidth > 576 ? "btn btn-success" : "btn btn-success btn-sm"}>
                    <input onClick={addTocartAction} type="radio" name="options" id="option3" /><i className="fas fa-shopping-cart fa-xl"></i>
                </label> 
            </div> 
        </div>
    </div>}
    {isInfoShowed && <ProductDetails 
                            cart={addTocartAction} 
                            favoris={onClickfavoris} 
                            hide={toggleInfo} 
                            show={isInfoShowed} 
                            data={{price:price, name:name, category:category, description:description, id:id, pictures:pictures, priceReduction: priceReduction, percentageReduction:percentageReduction}}
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