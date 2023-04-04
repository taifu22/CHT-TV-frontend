import React, { useEffect, useState } from 'react';
import AddressShipping from './Pageprofil/AddressShipping';
import PersonalData from './Pageprofil/PersonalData';
import MyOrder from './Pageprofil/MyOrder';
import ImageProfil from './Pageprofil/ImageProfil';
import Favoris from './Pageprofil/Favoris';
import MessagingUser from './Pageprofil/MessagingUser';
import { useSelector } from 'react-redux';
import useWindowSize from '../../lib/hooks/useScreenSize';

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
        console.log(e);
        if (e.target.title === 'Personnel') {
            setStateMenu({personnel: true, address: false, orders: false, image: false, favoris: false, messages: false});
        } else if (e.target.title === 'Adresses de livraison') {
            setStateMenu({personnel: false, address: true, orders: false, image: false, favoris: false, messages: false});
        } else if (e.target.title === 'My orders') {
            setStateMenu({personnel: false, address: false, orders: true, image: false, favoris: false, messages: false});
        } else if (e.target.title === 'Image profil') {
            setStateMenu({personnel: false, address: false, orders: false, image: true, favoris: false, messages: false})
        } else if (e.target.title === 'Favoris') {
            setStateMenu({personnel: false, address: false, orders: false, image: false, favoris: true, messages: false})
        } else if (e.target.title === 'Messagerie') {
            setStateMenu({personnel: false, address: false, orders: false, image: false, favoris: false, messages: true})
        }
    }

    useEffect(()=>{
        if (props.menu === 'message') {
            setStateMenu({personnel: false, address: false, orders: false, image: false, favoris: false, messages: true})
        } else if (props.menu === 'favoris') {
            setStateMenu({personnel: false, address: false, orders: false, image: false, favoris: true, messages: false})
        } else if (props.menu === 'address') {
            setStateMenu({personnel: false, address: true, orders: false, image: false, favoris: false, messages: false})
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

    //the hook allow us know the with of the screen for the responsive design
    const screenWidth = useWindowSize().width;

    return (  
        <div class="container-fluid page-profil-container">
            <div class="page-profil row flex-nowrap" >
                <div class="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-2 px-sm-2 px-0 bg-dark">
                    <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 mt-3">
                    {screenWidth > 576 ? <h4 className='text-light mt-3 mb-3'>Settings</h4> : <i class="fa-2x text-light mt-3 mb-3 fas fa-bars fs-xl"></i>}
                        <ul class="nav flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li class="nav-item">
                                <div class="nav-link align-middle px-0" role={'button'} title='Personnel' onClick={(e)=>handleMenu(e)}>
                                    <i class="text-white fas fa-user fa-1x" title='Personnel'></i> <span title='Personnel' class="ms-1 d-none d-sm-inline h6 text-white">Données Personnelles</span>
                                </div>
                            </li>
                            <li>
                                <div role={'button'} title='Adresses de livraison' class="home nav-link px-0 align-middle" onClick={(e)=>handleMenu(e)}>
                                    <i class="home text-white fas fa-house fa-1x" title='Adresses de livraison' /> <span title='Adresses de livraison' class="ms-1 d-none d-sm-inline h6 text-white">Adresses de livraison</span>
                                </div>
                            </li>
                            <li>
                                <div role={'button'} class="nav-link px-0 align-middle" title='My orders' onClick={(e)=>handleMenu(e)}>
                                    <i class="fa-sharp fa-solid fa-bag-shopping text-white fa-1x" title='My orders'></i> <span title='My orders' class="ms-1 d-none d-sm-inline h6 text-white">My orders</span>
                                </div>
                            </li>
                            <li>
                                <div role={'button'} class="nav-link px-0 align-middle" title='Image profil' onClick={(e)=>handleMenu(e)}>
                                    <i class="fa-solid fa-image-portrait text-white fa-1x" title='Image profil'></i> <span title='Image profil' class="ms-1 d-none d-sm-inline h6 text-white">Image profil</span>
                                </div>
                            </li>
                            <li>
                                <div role={'button'} class="nav-link px-0 align-middle" title='Favoris' onClick={(e)=>handleMenu(e)}>
                                    <i class="fa-sharp fa-solid fa-heart text-white fa-1x" title='Favoris'></i> <span title='Favoris' class="ms-1 d-none d-sm-inline h6 text-white">Favoris</span>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div role={'button'} className="nav-link align-middle px-0" title='Messagerie' onClick={(e)=>handleMenu(e)}>
                                    <i className="text-white fas fa-envelope fa-1x" title='Messagerie'></i> <span title='Messagerie' className="ms-1 d-none d-sm-inline h6 text-white">Messagerie</span>
                                    {<span style={{marginLeft:'10px'}} className="badge badge-danger mr-2 mb-3">{newMessages}</span>}
                                </div>
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