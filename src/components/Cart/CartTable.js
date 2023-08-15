import React from 'react';  
import CartFooter from './CartFooter'
import Row from './Row';
import { useSelector } from 'react-redux'; 
import useWindowSize from '../../lib/hooks/useScreenSize';

const CartTable = (props) => { 

    const {items} = useSelector((state) => ({...state.cart}))

    const screenWidth = useWindowSize().width; 

    return (
    <>
    <div className="card">
        <div className="table table-borderless table-shopping-cart">      
            <div>
            { items.length <= 0 ? (<tr><p className='ml-3' style={{fontSize: 20}}>
				Your Cart is Empty
			</p></tr>) :
			items.map((item) => {
			    return <Row key={item.id} {...item} />
            })}
            </div>
        </div>
		<CartFooter data={props.dataUser}/>
		</div>
		<div className="alert alert-success mt-3">
			<p className="icontext"><i className="icon text-success fa fa-truck"></i> Free Delivery within 1-2 weeks</p>
        </div>
    </>
)}
export default CartTable