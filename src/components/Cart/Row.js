import React from 'react';  
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCart } from '../../lib/state/features/cart.slice';

const Row = ({ id, name, price, quantity}) => { 

    const dispatch = useDispatch();
    const removeFromcartAction = (e) => {
        e.preventDefault();
        dispatch(removeFromCart({ id }))
    }
    const updateCartAction = (e) => {
        e.preventDefault();
        const value = parseInt(e.target.value)
        return dispatch(updateCart({id, value}))
    }

    return (
        <tr>
            <td>
                <figure className="itemside">
                    <div className="aside"><img src={ `images/items/${name}.jpg`} className="img-sm" /></div>
                    <figcaption className="info">
                        <a href="#" className="title text-dark">{ name }</a>
                    </figcaption>
                </figure>
            </td>
            <td> 
                <select className="form-control" value={quantity} onChange={(e) => updateCartAction(e)}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select> 
            </td>
            <td>    
                <div className="price-wrap"> 
                    <span className="price">${price * quantity}</span> 
                </div>
            </td>
            <td className="text-right"> 
                <a data-original-title="Save to Wishlist" title="" href="" className="btn btn-light" data-toggle="tooltip" onClick={() => null}> <i className="fa fa-heart"></i></a> 
                <a href="" className="btn btn-light btn-round" onClick={(e) => removeFromcartAction(e)}> Remove</a>
            </td>
    </tr>)
}
export default Row 