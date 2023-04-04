import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import serviceUser from '../../../lib/service/serviceUser';
import { deleteAddressData } from '../../../lib/state/features/user.slice';
import ModalAddress from '../ModalAddress';
import useModal from '../../../lib/hooks/useModal';

function AddressShipping(props) {

    const {isShowing: isInfoShowed, toggle: toggleInfo} = useModal();  
    const dispatch = useDispatch();
    const token = useSelector(state => ({...state.user.token}))
    const data = useSelector(state => ({...state.user.users.body.address}))
    let arrayAdresses = Object.keys(data).map((cle, index)=>{
        return [index, data[cle]]
    })
    function deleteAddress(id) { 
        console.log(id);
        serviceUser.deleteAddressUser(token.accessToken, id)
              .then(res => console.log(res))
        dispatch(deleteAddressData(id));
    }
    function editAddress(id) {
        toggleInfo();
        console.log('ciao'); 
    }

    return (
        <div className='section-content' >
            <h2 className='m-3 text-center text-primary'>Mes adresses de livraison</h2>
            <hr/>

            <button data-toggle="modal" data-target="#modalRegisterForm" onClick={()=>toggleInfo()} className='btn btn-primary m-3'>Ajouter une nouvelle adresse</button>
            {isInfoShowed && <ModalAddress funcToggle={()=>toggleInfo()} />}
            <div className='row m-2 addresses-list-user'>
                {
                arrayAdresses.map(item => {
                    return (<><div className="col col-md-6 col-sm-6 col-lg-4 mb-4">
                                <div className="card"> 
                                <div className="card-body">
                                    <h5 className="card-title">{item[1].firstname} {item[1].lastname}</h5>
                                    <p className="card-text">{item[1].street}</p>
                                    <p className="card-text">{item[1].city}</p>
                                    <p className="card-text">{item[1].country}</p>
                                    <div>
                                        <a onClick={()=>deleteAddress(Number(item[0]))} title='delete' className='pe-auto' style={{cursor: "pointer"}}><i className="mr-3 fa-solid fa-trash"></i></a>
                                        <a data-toggle="modal" data-target="#modalRegisterForm" onClick={()=>editAddress(Number(item[0]), item[1])} title='edit' className='pe-auto' style={{cursor: "pointer"}}><i className="fa-sharp fa-solid fa-file-pen"></i></a>
                                    </div>
                                </div>
                                </div>
                                {isInfoShowed && <ModalAddress data={item[1]} funcToggle={()=>toggleInfo()} />}
                            </div></>)
                })
                }
            </div>
        </div>
    );
}

export default AddressShipping;