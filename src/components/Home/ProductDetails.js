import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import serviceAdmin from '../../lib/service/serviceAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { addNewReportOpinionData } from '../../lib/state/features/user.slice';
import LightBoxProductsDetails from '../Layout/LightBoxProductsDetails';
import useWindowSize from '../../lib/hooks/useScreenSize';

function ProductDetails(props) {

    //on récupère la liste des signalations donné par le user et son email pour voir si lui donner la main pour donner
    //une signalation si pas fait, sinon on affichera un button desactivé avec le mot 'dejà signalé'
    const opinionWithReport = useSelector(state => {
      if (state.user.users === null) {
        return null
      } else {
        return state.user.users.body.opinionsWithReport
      }
    });
    const userEmail = useSelector(state => {
      if (state.user.users === null) {
        return null
      } else {
        return state.user.users.body.email
      }
    })
    let opinionWithreportOK = []; 

    const dispatch = useDispatch()
    const navigate = useNavigate();

    function BuyNow() {
      //si on clique sur achat immediat on sera redirectionné vers le panier
      props.cart()
      navigate('/cart'); 
    }

    //affichage de l'image du produit stocké dans le backend ou une image par défaut si pas d'image dispo
    // const imageData = (img) => { 
    //   let image1;
    //   //on verifie si la key image existe dans le body des info de l'user (voir bdd)
    //   if (img.picture !== undefined){
    //       //si existe on affiche l'image stocké dans le dossier uploads du back (geré par multer)
    //       image1 = 'http://localhost:4000/uploads/imagesUsersProfil/' + img.picture.data;    
    //   } else {
    //       //sinon si l'user vient de s'enregister on mets une image profil par défaut
    //       image1 = "./images/avatars/avatar3.jpg"
    //   }
    //   return image1;
    // }

    //fonction pour envoyer à la bdd la signalation de l'avis, et on mets à jour aussi le store de redux comme ca l'user
    //ne pourra pas signaler une deuxième fois un avis qu'il a déjà signalé
    function FuncSignal(item) {
      serviceAdmin.setReportOpinion(props.token.accessToken, item.id)
          .then(res => dispatch(addNewReportOpinionData(res.data.body)))
    }

    //function pour ouvrir la lightbox donc voir l'image dans sa totalité, et cacher les infos du produits
    const [openLightBox, setopenLightBox] = useState(false);

    const screenWidth = useWindowSize().width;

    return (
        <div className="modal-productDetails">
              <div className="modals">
                <div className="modal-header"> 
                  <div>
                    <p><b>{props.data.name}</b></p>
                  </div> 
                  <button 
                    type="button"
                    className="modal-close-button" 
                    onClick={() => {props.hide()}}
                  >
                  <span>&times;</span>  
                  </button> 
                </div> 
                <div className="modal-body"> 
                  <div>
                    <LightBoxProductsDetails data={props.data.pictures} image={props.data.pictures[0].filename}/>
                    { screenWidth > 800 ? <p className='mt-3' role={"button"} onClick={()=>setopenLightBox(!openLightBox)}>{ openLightBox ? <><span className='text-primary'>Revenir en arrière</span><i class="ml-2 text-primary fa-solid fa-backward"></i></> : <><span className='text-primary'>Ouvrir l'image </span><i class="text-primary ml-2 fa-solid fa-magnifying-glass"></i></>}</p> : ""}
                  </div>
                  { openLightBox ? "" : <div className='body-product-info'>
                    <p><b>Description : </b> {props.data.description}</p>
                    <div className='div-price-product'>
                    {(props.data.percentageReduction && props.data.priceReduction !== null) ? 
                                            <div className='mt-3 mb-3 d-flex align-items-center justify-content-end'>
                                                <p className='text-danger price-product'><b>{props.data.priceReduction}€ </b></p>
                                                <span className="badge badge-danger ml-3 mb-2"><em>Reduction</em> {props.data.percentageReduction}</span>
                                            </div> : <div className="price-product mt-2">{ props.data.price } €</div>}
                      <p className='price-info'>TVA incluse (si applicable), plus frais de livraison</p>
                    </div>
                    <div className='div-buttons-product'>
                      <button className='btn-cart-product btn btn-info' onClick={BuyNow}>Achat immédiat 
                        <i className="fa-solid fa-truck-fast"></i></button>
                      <button className='btn-cart-product btn btn-success' onClick={()=>props.cart()}>Ajouter au panier 
                        <i className="fa-solid fa-cart-shopping"></i></button>
                      <button className='btn btn-light' onClick={()=>props.favoris()}>{props.productFavoris !== undefined ? (props.productFavoris.includes(props.data.id) ? "supprimer des favoris" : "Ajouter aux favoris") : "Ajouter aux favoris"}
                        <i className={props.productFavoris !== undefined ? (props.productFavoris.includes(props.data.id) ? "fas fa-heart text-danger fa-lg ml-2" : "far fa-heart text-dark a-lg ml-2") : "far fa-heart text-dark a-lg ml-2"}></i>
                      </button>
                    </div>
                    <div className='users-opinions'>
                       <p><b>Avis des utilisateurs : </b> <span className='ml-3'>{props.stars(props.starArray, props.totalStars())}</span>  <span className='ml-2'>{props.totalStars() ? (screenWidth > 500 ? props.totalStars() : "") : "aucun avis"}</span></p>
                       <hr/>
                       {props.opinions.map(item => {
                        {opinionWithReport !== null && opinionWithReport.map(item1 => {
                           {/**ici on stocke si  un item correspond a notre id de l'opinion, car si deja signalé, on affichera le bouton desactivé 'déjà signalé'*/}
                          if(item1.idOpinion === item.id) {
                            return opinionWithreportOK.push(item1.idOpinion)
                          }
                        })}
                         return(
                          <>
                          <div className='d-flex justify-content-between'>
                            <div className='users-stars'>
                              <p className='text-primary'>{item.userName}</p>
                              <ul>{props.stars(props.starArray, item.star)}</ul>
                            </div>
                            <span className='span-date'>{item.date}</span>
                          </div>
                          <div className='opinion'>
                            <p className='p-opinion'>{item.opinion}</p>
                            <div className='text-right'>
                              {/**ici on fait une condition, si dans le store on a déja un id qui est === à un id dans 
                              la liste des opinions deja signalé par l'user, donc le array opinions de sa fiche user, alors
                              on lui donne plus la possibilité de redonner une signalation pour le meme avis 
                              Ensuite si l'user a donné un avis, sur ce avis il ne pourra pas donner de signalation, il aura le button desactivé 'Mon avis'
                              Ensuite si on es pas loggé si on clique sur signaler on aura un message d'alert*/}
                              {(opinionWithReport !== null && opinionWithreportOK.length && userEmail !== null && item.user !== userEmail) ? 
                                                opinionWithreportOK.map(item1 =>{
                                                  if(item1.includes(item.id)) {
                                                    return(<button disabled className='btn-cart-product btn btn-secondary btn-sm'>Déjà signalé</button>)
                                                  }
                                                })
                              : (userEmail !== null && item.user !== userEmail && opinionWithreportOK.length == 0) ? 
                                                  <button onClick={()=>FuncSignal(item)} className='btn-cart-product btn btn-secondary btn-sm'>signaler</button>                   
                              : item.user === userEmail ? <button disabled className='btn-cart-product btn btn-secondary btn-sm'>Mon avis</button>
                              : userEmail === null ?  <button onClick={()=>alert('il faut se connecter pour faire la signalation')} className='btn-cart-product btn btn-secondary btn-sm'>Signaler</button>
                              : <button onClick={()=>FuncSignal(item)} className='btn-cart-product btn btn-secondary btn-sm'>Signaler</button>}
                            </div>
                          </div>
                          <hr/>
                          </>
                         )
                       })}
                    </div>
                  </div>}
                </div>
              </div>
          </div>
    );
}

export default ProductDetails;