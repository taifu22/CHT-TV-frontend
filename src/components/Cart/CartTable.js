import React from 'react';  
import CartFooter from './CartFooter'
import Row from './Row';
import { useSelector } from 'react-redux';

const CartTable = () => { 

    const {items} = useSelector((state) => ({...state.cart}))

    return (
    <>
    <div className="card">
        <table className="table table-borderless table-shopping-cart">
        <thead className="text-muted">
            <tr className="small text-uppercase">
                <th scope="col">Product</th>
                <th scope="col" width="120">Quantity</th>
                <th scope="col" width="120">Price</th>
                <th scope="col" className="text-right" width="200"> </th>
            </tr> 
            </thead>        
            <tbody>
            { items.length <= 0 && (<p className="d-flex justify-content-center align-items-center" style={{fontSize: 20}}>
				Your Cart is Empty
			</p>)}
			{items.map((item) => (
				<Row key={item.id} {...item} />
			))}
            </tbody>
        </table>
		<CartFooter />
		</div>
		<div className="alert alert-success mt-3">
			<p className="icontext"><i className="icon text-success fa fa-truck"></i> Free Delivery within 1-2 weeks</p>
        </div>
    </>
)}
export default CartTable