import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function ModalInfosDelivery(props) {

    const address = useSelector(state => state.user.address)

    return (
        <div class="modal fade" id='modalDeliveryInfos' tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content"> 
                        <div class="modal-header text-center w-100">
                            <div>
                                <h4 class="modal-title font-weight-bold">informations de livraison</h4>
                            </div> 
                            <div>
                                <button type="button" onClick={()=>props.hide()} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                        </div>
                        <div className='modal-body d-flex '>
                            <div className="col-sm-5 p-2">
                                <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title text-primary">{address[0].firstname} {address[0].lastname}</h5>
                                    <p className="card-text">{address[0].street}</p>
                                    <p className="card-text">{address[0].city}</p>
                                    <p className="card-text">{address[0].country}</p>
                                </div>
                                </div>
                            </div>
                            <div className='m-2'>
                                <h5 className='text-dark'>Méthode : <span className='text-primary'>{ address[1]/100 === 0 ? 'livraison gratuite' : 'livraison express'}</span></h5>
                                <h5 className='text-dark'>Cout : <span className='text-primary'>{address[1]/100} €</span></h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default ModalInfosDelivery;