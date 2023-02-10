import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useModal from '../../../lib/hooks/useModal';
import ModalGiveOpinion from '../ModalGiveOpinion';

function MyOrder() {

    //tableau pour stocker les noms des produit qui ont été déja commenté (donc pour ne pas commenter en doublon)
    let opinionOK= [];

    const dataOrders = useSelector(state => state.user.users.body.orders) 
    const dataproductOpinion = useSelector(state => state.user.users.body.opinions);

    //fonction pour afficher la modal
    const {isShowing: isInfoShowed, toggle: toggleInfo} = useModal();
    const [dataproduit, setDataProduit] = useState()
    function ToggleModal(item) {
        toggleInfo()
        setDataProduit(item)
    }

    //dans ce useEffect qui se lance à chaque fois qu'on ouvre ou ferme la modale, on verifie si l'element en question
    //a déja recu un avis, si oui, on affichera le message 'dejà évalué', pour ne pas evaluer en doublon
    useEffect(()=>{
        dataproductOpinion.forEach(element => {
            console.log(element);
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
            return (<button data-toggle="modal" data-target="#modalOpinionForm" onClick={()=>ToggleModal(item)} className='btn btn-info'>Ajouter un avis</button>)
        }
    }

    return (
        <>
        {dataproductOpinion.forEach(element => {
            console.log(element);
            if (element.nameProduct !== undefined) {
                opinionOK.push(element.nameProduct)
            }
        })}
        <div className='container-fluid my-order'>
            <h2 className='m-3 text-center text-primary'>Liste des commandes validées</h2>
            <hr/>
            <br/>
            {dataOrders.length ? dataOrders.map(item => {
                let total = [];
                return (
                    <div className='card m-3'>
                        <div className='m-1 d-flex justify-content-between'>
                            <p><b>commande du {item[1].key}</b></p>
                        </div>
                        {item[0].map(item1 => {
                            total.push(item1.price_data.unit_amount * item1.quantity);
                            return(
                            item1.price_data.product_data.name != "Shipping Cost" && 
                            <div className='card m-1'>
                                <div className='row no-gutters'>
                                    <div className='col-md-4'>
                                        <a href="#" className="img-wrap"> <img style={{height:'150px'}} src={ `images/items/${item1.price_data.product_data.name}.jpg`} /> </a> 
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='card-body'>
                                            <p class="card-title text-primary"><b>{item1.price_data.product_data.name} </b><p className='text-dark'><b>x{item1.quantity}</b></p></p>
                                        </div>
                                    </div>
                                    <div className='col-md-2'>
                                        <div className='card-body'>
                                            <p class="card-title text-primary ml-3"><b>{item1.price_data.unit_amount/100} Є</b> </p>
                                            {opinionOkFunc(item1.price_data.product_data.name)}
                                            {isInfoShowed && <ModalGiveOpinion hide={()=>toggleInfo()} product={dataproduit} />}
                                        </div>
                                    </div>
                                </div> 
                            </div>
                            )
                        })}
                        <div className='m-1 d-flex justify-content-between'>
                             <p><b>livraison {total[total.length-1]/100} Є</b></p>
                             <button className='btn btn-danger w-25'>Supprimer la commande</button>
                            <p><b>Total : {TotalResult(total)} Є</b></p>
                        </div>
                    </div>)
            }) : 'Your list of orders are empty'}
        </div>
        </>
    );
}

export default MyOrder;