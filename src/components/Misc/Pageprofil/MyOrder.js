import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useModal from '../../../lib/hooks/useModal';
import { setAddressInfosOrders } from '../../../lib/state/features/user.slice';
import ModalGiveOpinion from '../ModalGiveOpinion';
import ModalInfosDelivery from '../ModalInfosDelivery'; 

function MyOrder() {

    //tableau pour stocker les noms des produit qui ont été déja commenté (donc pour ne pas commenter en doublon)
    let opinionOK= [];

    //ici on stocke un code promo si existe
    let codePromo = null

    const dispatch = useDispatch() 

    const dataOrders = useSelector(state => state.user.users.body.orders) 
    const dataproductOpinion = useSelector(state => state.user.users.body.opinions);
    const products = useSelector(state => state.products.items)

    //fonction pour afficher la modal
    const {isShowing: isInfoShowed, toggle: toggleInfo} = useModal();
    const [dataproduit, setDataProduit] = useState()
    function ToggleModal(item) {
        toggleInfo()
        setDataProduit(item)  
    }

    //modal pour affciehr les informations de livraison
    const {isShowing: isInfoShowed2, toggle: toggleInfo2} = useModal();
    function ToggleModalDelivery(item, item1) {
        //item c'est l'adresse de livraison de cette commande, et item1 c'est le montant de la livraison
        const newItem = [item, item1]
        dispatch(setAddressInfosOrders(newItem))
        toggleInfo2()
    }

    //dans ce useEffect qui se lance à chaque fois qu'on ouvre ou ferme la modale, on verifie si l'element en question
    //a déja recu un avis, si oui, on affichera le message 'dejà évalué', pour ne pas evaluer en doublon
    useEffect(()=>{
        dataproductOpinion.forEach(element => {
            if (element.nameProduct !== undefined) {
                opinionOK.push(element.nameProduct)
            }
        })
    },[toggleInfo])

    //tableau et fonction pour calculer le total de chaque commande
    function TotalResult(array) {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i];
        }
        return sum/100; 
    } 

    ///function pour afficher le bouton pour ajouter un avis, si pas encore fait sur le produit en question
    function opinionOkFunc(item) {
        if (opinionOK.includes(item)) {
            return (<div className='productOpinionOK'><p>produit evalué</p></div>)
        } else {
            return (<button data-toggle="modal" data-target="#modalOpinionForm" onClick={()=>ToggleModal(item)} className='btn btn-outline-info'>Ajouter un avis</button>)
        }
    }

    //fonction pour afficher l'image du produit (on l'utilisera dans le src de la balise img)
    const imageData = (name) => {
        let image1;
        //on affichera l'image de l"élément dans produits (qu'on récupère du store redux), avec le meme name du parametre de cette fonction imageData
        products.map(item => {
            item.map(item1 => {
                if (item1.name === name) {
                    //on verifie si la key image existe dans le body des info de l'user (voir bdd)
                    if (item1.picture !== undefined) {
                        //si existe on affiche l'image stocké dans le dossier uploads du back (geré par multer)
                        image1 = 'http://localhost:4000/uploads/imagesUsersProfil/' + item1.picture.data;    
                    } else {
                        //sinon si l'user vient de s'enregister on mets une image profil par défaut
                        image1 = "./images/avatars/avatar3.jpg"
                    }
                }
            })
        })
        return image1; 
    }

    return ( 
        <>
        {dataproductOpinion.forEach(element => {
            if (element.nameProduct !== undefined) {
                opinionOK.push(element.nameProduct)
            }
        })}
        <div className='container my-order'>
            <h2 className='m-3 text-center text-primary'>Liste des commandes validées</h2>
            <hr/>
            <br/>
            {dataOrders.length ? dataOrders.map(item => {
                let total = [];
                codePromo = item[item.length -1].promo
                return (
                    <div className='card m-3 p-3 card-order'>
                        <div className='m-1 d-flex justify-content-between'>
                            <div className='d-flex align-items-center'>
                                <p className='text-center'><b>En cours de livraison</b></p>
                            </div>
                            <div className='d-flex flex-column align-items-end'>
                                {console.log(item)}
                                <p className='m-0'>Date : {item[item.length -1].key}</p>
                                <p className='m-0'>N° comande : </p>
                                <p className='m-0'>{item[item.length -1].orderNumber}</p>
                            </div>
                        </div>
                        {item[0].map(item1 => {
                            total.push(item1.price_data.unit_amount * item1.quantity);
                            return(
                            item1.price_data.product_data.name != "Shipping Cost" &&  
                            <div className='card m-1'>
                                <div className='row no-gutters'>
                                    <div className='col-md-6 col-lg-4'>
                                        <a href="#" className="img-wrap"> <img style={{height:'150px'}} src={imageData(item1.price_data.product_data.name)} /> </a> 
                                    </div>
                                    <div className='col-md-6 col-lg-4'>
                                        <div className='card-body'>
                                            <p class="card-title text-primary"><b>{item1.price_data.product_data.name} </b>
                                            <p className='text-dark'><b>x{item1.quantity}</b></p></p>
                                            {item1.price_data.product_data.metadata.priceReduction !== null ?
                                                <div className='mt-3 mb-3 d-flex align-items-center'>
                                                <p className='text-danger price h5'><b>{item1.price_data.product_data.metadata.priceReduction}€ </b></p>
                                                <span className="badge badge-danger ml-3 mb-2"><em>Reduction</em> {item1.price_data.product_data.metadata.percentageReduction}</span>
                                            </div> : <p class="card-title text-primary"><b>{item1.price_data.unit_amount/100} Є</b> </p>}
                                        </div>
                                    </div>
                                    <div className='col-md-12 col-lg-4'>
                                        <div className='card-body'>
                                            {opinionOkFunc(item1.price_data.product_data.name)}
                                            {isInfoShowed && <ModalGiveOpinion hide={()=>toggleInfo()} product={dataproduit} />}
                                        </div>
                                    </div>
                                </div> 
                            </div>
                            )
                        })}
                        <div className='m-1 d-flex justify-content-between'>
                            <i role={'button'} data-toggle="modal" data-target="#modalDeliveryInfos" onClick={()=> ToggleModalDelivery(item[item.length -2], total[total.length-1])} title='informations de livraison' className="fa-solid fa-truck fa-2x text-info" ></i>
                            {isInfoShowed2 && <ModalInfosDelivery hide={()=>toggleInfo2()} />}
                            <i role={'button'} title='supprimer la commande' class="fa-2x text-danger fa-solid fa-trash"></i>
                            <div className='d-flex align-items-center'>
                                <p><b>Total : {TotalResult(total) - (codePromo !== null ? codePromo : 0)} Є {codePromo !== null ?<p className='text-danger small'><em>&#40;{codePromo} Є code promo&#41;</em></p> : ""}</b></p>
                            </div>
                        </div>
                    </div>)
            }) : 'Your list of orders are empty'}
        </div>
        </>
    );
}

export default MyOrder;