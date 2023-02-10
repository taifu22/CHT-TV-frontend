import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductDetails(props) {

    useEffect(()=>{
      //console.log(props.opinions);
    },[])
    
    const navigate = useNavigate();

    function BuyNow() {
      props.cart()
      navigate('/cart'); 
    }

    return (
        <div className="modal-worldmap">
              <div className="modals">
                <div className="modal-header"> 
                  <div>
                    <h2>{props.data.name}</h2>
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
                  <img className='img-map' src={ `images/items/${props.data.name}.jpg`}></img>
                  <div className='body-country-info'>
                    <p><b>Description : </b> {props.data.description}</p>
                    <div className='div-price-product'>
                      <p className='price-product'>{props.data.price} €</p>
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
                       <p><b>Avis des utilisateurs : </b> <span className='ml-3'>{props.stars(props.starArray, props.totalStars())}</span>  <span className='ml-2'>{props.totalStars() ? props.totalStars() : "aucun avis"}</span></p>
                       <hr/>
                       {props.opinions.map(item => {
                         return(
                          <>
                          <div className='users-stars'>
                            <p className='text-primary'>{item.userName}</p>
                            <ul>{props.stars(props.starArray, item.star)}</ul>
                          </div>
                          <div className='opinion'>
                            <p className='p-opinion'>{item.opinion}</p>
                          </div>
                          <hr/>
                          </>
                         )
                       })}
                    </div>
                  </div>
                </div>
              </div>
          </div>
    );
}

export default ProductDetails;