import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPriceReduction } from '../../../lib/state/features/products.slice';

function SelectInputAddReductionprice(props) {

    const [selected, setSelected] = useState(props.options[0]);

    //on dispatch le prix avec la reduction dans le store redux, pour pouvoir aprés l'envoyer en bdd
    const dispatch = useDispatch();
    const calculatepricewithReduction = (percentage) => {
        const taux = parseFloat(percentage) / 100;
        const reduction = props.price * taux;
        //on ne veut pas de decimales donc virgules dans notre prix aprés réduction
        const pricenextreduction = Math.floor(props.price - reduction);
        //dispatch le prix dans le store
        if (percentage === '0%') {
            dispatch(setPriceReduction(null));
        } else {
            const obj = {price: pricenextreduction, percentage: percentage}
            dispatch(setPriceReduction(obj));
        }
    }

    return (
        <div className='col form-group col-md-6 mb-0 pl-0'>
            <label>{props.label}</label>
            <select {...props.register(props.name)} name={props.name} value={selected} className="form-control" onChange={(e) => {setSelected(e.target.value); calculatepricewithReduction(e.target.value)}}>
                {props.options.map((value) => {
                    return (
                        <option value={value} key={value}>
                            {value}
                        </option>
                    )
                })} 
            </select>
        </div>
    );
}

export default SelectInputAddReductionprice;