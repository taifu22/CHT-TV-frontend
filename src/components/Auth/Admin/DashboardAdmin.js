import React, { useEffect, useState } from 'react';
import ListOrders from './ListOrders';
import ListProducts from './ListProducts';
import serviceAdmin from '../../../lib/service/serviceAdmin';
import { getAllOrdersFromAdmin, getAllMessages } from '../../../lib/state/features/user.slice';
import { getOpinionsSuccess } from '../../../lib/state/features/opinion.slice';
import { useSelector, useDispatch } from 'react-redux';
import ListOpinions from './ListOpinions';
import serviceMessages from '../../../lib/service/serviceMessages';
import MessagingAdmin from './MessagingAdmin';
import useWindowSize from '../../../lib/hooks/useScreenSize';
import ListCategorys from './ListCategorys';
import ListPromoCode from './ListPromoCode';
import servicePromosCode from '../../../lib/service/servicePromosCode';
import { getAllsPromosCode } from '../../../lib/state/features/PromosCode.slice';

function DashboardAdmin(props) {
    
    const [stateMenu, setStateMenu] = useState({  
        products: true,
        categorys: false,
        commandes: false, 
        opinions: false,
        messages: false,
        promoCode: false
    })

    const dispatch = useDispatch();
    const token = useSelector(state => ({...state.user.token}));

    useEffect(()=>{
        //on récupère de la bdd et on rempli le store de redux avec toutes les commandes
        serviceAdmin.getAllOrders(token.accessToken)
            .then(res => dispatch(getAllOrdersFromAdmin(res.data.data)))
        //on récupère de la bdd et on rempli le sore redux avec la liste de tous les avis utilisateurs
        serviceAdmin.getAllOpinions(token.accessToken)
            .then(res => dispatch(getOpinionsSuccess(res.data.data)))
        //on récupère de la bdd et on rempli le sore redux avec la liste de tous les messages des utilisateurs
        serviceMessages.getAllMessages(token.accessToken)
            .then(res => dispatch(getAllMessages(res.data.data)))
            //on récupère la liste des codes promos et on repmli le store redux
        servicePromosCode.getAllPromosCode()
            .then(res => dispatch(getAllsPromosCode(res.data.data)))
    },[])

    useEffect(()=>{
        if (props.menu === 'message') {
            setStateMenu({personnel: false, address: false, orders: false, image: false, favoris: false, messages: true})
        } else if (props.menu === 'favoris') {
            setStateMenu({personnel: false, address: false, orders: false, image: false, favoris: true, messages: false})
        }
    },[props.menu])

    function handleMenu(e) {
        if (e === 'produits') {
            setStateMenu({products: true, commandes: false, opinions:false, messages: false, categorys: false, promoCode: false});
        } else if (e === 'commandes') {
            setStateMenu({products: false, commandes: true, opinions: false, messages: false, categorys: false, promoCode: false});
        } else if (e === 'opinions') {
            setStateMenu({products: false, commandes: false, opinions: true, messages: false, categorys: false, promoCode: false});
        } else if (e === 'messagerie') {
            setStateMenu({products: false, commandes: false, opinions: false, messages: true, categorys: false, promoCode: false});
        } else if (e === 'categorys') {
            setStateMenu({products: false, commandes: false, opinions: false, messages: false, categorys: true, promoCode: false});
        } else if (e === 'promoCode') {
            setStateMenu({products: false, commandes: false, opinions: false, messages: false, categorys: false, promoCode: true});
        }
    }

    //if we have a new message received unread, then we will display in new red in the envelope 
    const newMessages = useSelector(state => {
        if (state.user.users !== null && state.user.users.body.newMessage === true) {
            return 'new'
        } else {
            return ''
        } 
    })

    const screenWidth = useWindowSize().width;  

    return (  
        <div className="container-fluid page-profil-container"> 
            <div className="page-profil row flex-nowrap" >
                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-2 px-sm-2 px-0 bg-dark">
                    <div className="ul-profil d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 mt-3">
                    {screenWidth > 576 ? <h4 className='text-light mt-3 mb-3'>DashBoard Admin</h4> : <i class="fa-2x text-light mt-3 mb-3 fas fa-bars fs-xl"></i>}
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li className="nav-item">
                                <a href="#" className="nav-link align-middle px-0" title='produits' onClick={(e)=>handleMenu(e.target.title)}>
                                    <i title='produits' className="text-white fas fa-list fa-1x"></i><span className="ms-1 d-none d-sm-inline h6 text-white" title='produits'>Liste des produits</span> 
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link align-middle px-0" title='categorys' onClick={(e)=>handleMenu(e.target.title)}>
                                    <i title='categorys' className="text-white fas fa-list fa-1x"></i><span className="ms-1 d-none d-sm-inline h6 text-white" title='categorys'>Liste des categories</span> 
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link align-middle px-0" title='commandes' onClick={(e)=>handleMenu(e.target.title)}>
                                    <i className="text-white fas fa-list-check fa-1x" title='commandes'></i> <span title='commandes' className="ms-1 d-none d-sm-inline h6 text-white">Liste des commandes</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link align-middle px-0" title='opinions' onClick={(e)=>handleMenu(e.target.title)}>
                                    <i className="text-white fas fa-list-check fa-1x" title='opinions'></i> <span title='opinions' className="ms-1 d-none d-sm-inline h6 text-white">Liste des avis</span>
                                </a>
                            </li>
                            <li className="nav-item nav-item-messagerie-dash">
                                <a href="#" className="nav-link align-middle px-0" title='messagerie' onClick={(e)=>handleMenu(e.target.title)}>
                                    <i className="text-white fas fa-envelope fa-1x" title='messagerie'></i> <span title='messagerie' className="ms-1 d-none d-sm-inline h6 text-white">Messagerie</span>
                                    {<span style={{marginLeft:'10px'}} className="badge badge-danger mr-2 mb-3">{newMessages}</span>}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link align-middle px-0" title='promoCode' onClick={(e)=>handleMenu(e.target.title)}>
                                    <i className="text-white fa-solid fa-percent fa-1x" title='promoCode'></i> <span title='promoCode' className="ms-1 d-none d-sm-inline h6 text-white">Codes promo</span>
                                </a>
                            </li>
                        </ul>
                        <hr />
                    </div>
                </div>
                <div className="py-3 col">
                    {stateMenu.products && <ListProducts />}
                    {stateMenu.commandes && <ListOrders />}
                    {stateMenu.opinions && <ListOpinions />}
                    {stateMenu.messages && <MessagingAdmin />}
                    {stateMenu.categorys && <ListCategorys />}
                    {stateMenu.promoCode && <ListPromoCode />}
                </div>
            </div>
        </div>
    );
}

export default DashboardAdmin;