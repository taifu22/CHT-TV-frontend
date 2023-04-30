import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function ModalMessageSendOk(props) {

    const address = useSelector(state => state.user.address)

    return (
        <div id='modal' className="modals-message-send">
              <div className='modals-content'>
                <button onClick={() => props.hide()} href="#demo" class="modals-close">
                &times;
                </button>
                <div>
                <h3>{props.message1}</h3>
                <p>{props.message2}</p>
                </div>
            </div>
        </div>
    );
}

export default ModalMessageSendOk; 