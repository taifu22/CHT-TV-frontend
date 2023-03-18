import React, { useEffect, useState } from 'react';
import AddressShipping from './Pageprofil/AddressShipping';
import PersonalData from './Pageprofil/PersonalData';
import MyOrder from './Pageprofil/MyOrder';
import ImageProfil from './Pageprofil/ImageProfil';
import Favoris from './Pageprofil/Favoris';
import MessagingUser from './Pageprofil/MessagingUser';
import { useSelector } from 'react-redux';

function Pageprofile(props) {
    
    const [stateMenu, setStateMenu] = useState({
        personnel: true,
        address: false,
        orders: false,
        image: false,
        favoris: false,
        messages: false
    })

    function handleMenu(e) {
        if (e.target.textContent === 'Données Personnelles') {
            setStateMenu({personnel: true, address: false, orders: false, image: false, favoris: false, messages: false});
        } else if (e.target.textContent === 'Adresses de livraison') {
            setStateMenu({personnel: false, address: true, orders: false, image: false, favoris: false, messages: false});
        } else if (e.target.textContent === 'My Orders') {
            setStateMenu({personnel: false, address: false, orders: true, image: false, favoris: false, messages: false});
        } else if (e.target.textContent === 'Image profil') {
            setStateMenu({personnel: false, address: false, orders: false, image: true, favoris: false, messages: false})
        } else if (e.target.textContent === 'Favoris') {
            setStateMenu({personnel: false, address: false, orders: false, image: false, favoris: true, messages: false})
        } else if (e.target.textContent === 'Messagerie') {
            setStateMenu({personnel: false, address: false, orders: false, image: false, favoris: false, messages: true})
        }
    }

    useEffect(()=>{
        if (props.menu === 'message') {
            setStateMenu({personnel: false, address: false, orders: false, image: false, favoris: false, messages: true})
        } else if (props.menu === 'favoris') {
            setStateMenu({personnel: false, address: false, orders: false, image: false, favoris: true, messages: false})
        }
    },[props.menu])

    //if we have a new message received unread, then we will display in new red in the envelope 
    const newMessages = useSelector(state => {
        if (state.user.users !== null && state.user.users.body.newMessage === true) { 
            return 'new'
        } else {
            return ''
        } 
    })

    return (  
        <div class="container-fluid page-profil-container">
            <div class="page-profil row flex-nowrap" >
                <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div class="ul-profil d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 mt-3">
                        <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li class="nav-item">
                                <a class="nav-link align-middle px-0" title='Personnel' onClick={(e)=>handleMenu(e)}>
                                    <i class="text-white fas fa-user fa-1x"></i> <span class="ms-1 d-none d-sm-inline h6 text-white">Données Personnelles</span>
                                </a>
                            </li>
                            <li>
                                <a data-bs-toggle="collapse" title='Adresses de livraison' class="home nav-link px-0 align-middle" onClick={(e)=>handleMenu(e)}>
                                    <i class="home text-white fas fa-house fa-1x"></i> <span class="ms-1 d-none d-sm-inline h6 text-white">Adresses de livraison</span>
                                </a>
                            </li>
                            <li>
                                <a class="nav-link px-0 align-middle" title='My orders' onClick={(e)=>handleMenu(e)}>
                                    <i class="fa-sharp fa-solid fa-bag-shopping text-white fa-1x"></i> <span class="ms-1 d-none d-sm-inline h6 text-white">My Orders</span>
                                </a>
                            </li>
                            <li>
                                <a class="nav-link px-0 align-middle" title='Image profil' onClick={(e)=>handleMenu(e)}>
                                    <i class="fa-solid fa-image-portrait text-white fa-1x"></i> <span class="ms-1 d-none d-sm-inline h6 text-white">Image profil</span>
                                </a>
                            </li>
                            <li>
                                <a class="nav-link px-0 align-middle" title='Favoris' onClick={(e)=>handleMenu(e)}>
                                    <i class="fa-sharp fa-solid fa-heart text-white fa-1x"></i> <span class="ms-1 d-none d-sm-inline h6 text-white">Favoris</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link align-middle px-0" title='opinions' onClick={(e)=>handleMenu(e)}>
                                    <i className="text-white fas fa-envelope fa-1x"></i> <span className="ms-1 d-none d-sm-inline h6 text-white">Messagerie</span>
                                    {<span style={{marginLeft:'10px'}} className="badge badge-danger mr-2 mb-3">{newMessages}</span>}
                                </a>
                            </li>
                        </ul>
                        <hr />
                    </div>
                </div>
                <div class="col py-3">
                    {stateMenu.address && <AddressShipping />}
                    {stateMenu.personnel && <PersonalData />}
                    {stateMenu.orders && <MyOrder />}
                    {stateMenu.image && <ImageProfil />}
                    {stateMenu.favoris && <Favoris />}
                    {stateMenu.messages && <MessagingUser />} 
                </div>
            </div>
        </div>
    );
}

export default Pageprofile;