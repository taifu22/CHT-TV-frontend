import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function ModalAdminInfoOrder(props) { 

    const order = useSelector(state => state.user.order);
    const [viewPriceReduction, setViewPriceReduction] = useState(true);

    return (
        <div class="modal fade" id='modalOrderInfos' tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header text-center w-100">
                            <div>
                                <h4 class="modal-title font-weight-bold">informations de la commande</h4>
                            </div> 
                            <div>
                                <button type="button" onClick={()=>props.hide()} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                        </div>
                        <div className='modal-body order-admin'>
                            <div>
                                <h5>Produit</h5>
                                {order[0].map(item => {
                                    return (
                                        <p className='p-nameproduct'>{item.nameProduct }</p>
                                    )
                                })}
                            </div>
                            <div>
                                <h5>Qté</h5>
                                {order[0].map(item => {
                                    return (
                                        <p className='p-nameproduct text-center'>x{item.quantity}</p>
                                    )
                                })}
                            </div>
                            <div>
                                <h5>Prix</h5>
                                {order[1].map((itemPrix, index) => {
                                    if(index !== 0){
                                        return(<><p className='p-nameproduct'>{itemPrix/100} €</p></>)
                                    }
                                })}
                            </div>
                            <div>
                                <h5>Réduc.</h5>
                                {order[0].map((item, index) => {
                                        if(item.priceReduction !== null){
                                            return(<><p className='p-nameproduct text-center'>{item.percentageReduction}</p></>)
                                        }
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default ModalAdminInfoOrder;