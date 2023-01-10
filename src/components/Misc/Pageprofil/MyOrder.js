import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function MyOrder() {

    const [stateArray, setStateArray] = useState([])
    const dataOrders = useSelector(state => state.user.users.body.orders)

    //tableau et fonction pour calculer le total de chaque commande
    function TotalResult(array) {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i];
        }
        return sum/100;
    }

    return (
        <div className='container-fluid my-order'>
            {dataOrders.length ? dataOrders.map(item => {
                //console.log(item[1].key)
                let total = [];
                return (
                    <div className='card m-3'>
                        <div className='m-1 d-flex justify-content-between'>
                            <p><b>commande du {item[1].key}</b></p>
                        </div>
                        {item[0].map(item1 => {
                            total.push(item1.price_data.unit_amount * item1.quantity);
                            console.log(total)
                            console.log(item1.quantity)
                            return(
                            item1.price_data.product_data.name != "Shipping Cost" && 
                            <div className='card m-1'>
                                <div className='row no-gutters'>
                                    <div className='col-md-4'>
                                        <a href="#" className="img-wrap"> <img style={{height:'100px'}} src={ `images/items/${item1.price_data.product_data.name}.jpg`} /> </a> 
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='card-body'>
                                            <p class="card-title text-primary">{item1.price_data.product_data.name}  - <p className='text-dark'>x{item1.quantity}</p></p>
                                        </div>
                                    </div>
                                    <div className='col-md-2'>
                                        <div className='card-body'>
                                            <p class="card-title text-primary">{item1.price_data.unit_amount/100} Є </p>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                            )
                        })}
                        <div className='m-1 d-flex justify-content-between'>
                             <p><b>livraison {total[total.length-1]/100} Є</b></p>
                            <p><b>Total : {TotalResult(total)} Є</b></p>
                        </div>
                    </div>)
            }) : 'Your list of orders are empty'}
        </div>
    );
}

export default MyOrder;