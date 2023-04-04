import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function ModalOpinion(props) {

    const opinion = useSelector(state => state.opinions.opinion)

    return (
        <div class="modal fade" id='modalOpinionInfos' tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header text-center w-100">
                            <div>
                                <h4 class="modal-title font-weight-bold">User: {opinion.user}</h4>
                                <h5 class="modal-title text-primary mr-3">Product: {opinion.product}</h5>
                            </div> 
                            <div>
                                <button type="button" onClick={()=>props.hide()} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                        </div>
                        <div className='modal-body order-admin'>
                            <div>
                                <h5>Opinion</h5>
                                <p>{opinion.opinion}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default ModalOpinion;