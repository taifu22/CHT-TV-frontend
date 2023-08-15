import React, { useEffect, useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import useModal from '../../../lib/hooks/useModal';
import useWindowSize from '../../../lib/hooks/useScreenSize';
import serviceAdmin from '../../../lib/service/serviceAdmin';
import { getAllOrdersFromAdmin, setAddressInfosOrders, setOrderFromAdmin } from '../../../lib/state/features/user.slice';
import ModalInfosDelivery from '../../Misc/ModalInfosDelivery';
import ModalAdminInfoOrder from './ModalAdminInfoOrder';
 
function ListOrders(props) {

    const [valueInput, setValueInput] = useState("");
    const token = useSelector(state => ({...state.user.token}));
    const orders = useSelector(state => state.user.orders)
    let ordersSorted = [];
    const dispatch = useDispatch();

    //function to sorted gallery products with the value of input
    function onChangeInput(e) {
        setValueInput(e.target.value)
    }

    //in this useEffect we sort the store redux of produits by ration of input's value
    useEffect(() => { 
        if (valueInput.length === 0 && valueInput === "") {
            serviceAdmin.getAllOrders(token.accessToken)
                .then(res => dispatch(getAllOrdersFromAdmin(res.data.data)))
        } else {
            orders.map(item => {
                if (item.orderNumber[0].includes(valueInput)) {
                    ordersSorted.push(item)
                }
            })
            console.log(ordersSorted);
            dispatch(getAllOrdersFromAdmin(ordersSorted));
        }
    },[valueInput])

    //fonction pour calculer le total d'une commande, sachant qu'on a un tableau avec pour chaque index le prix du produit comandé
    //le premier index c'est toujours le prix de la livraison donc soit 0 soit 20 euros
    function NumberPurchases(arrayTotal) {
        let result = []
        let sum = 0
        arrayTotal.map(item => {
            result.push(item) 
        })
        for (let i = 0; i < result.length; i++) {
            sum+= result[i]
        } 
        return sum/100
    }

    //modal pour affciehr les informations de livraison
    const {isShowing: isInfoShowed, toggle: toggleInfo} = useModal();
    function ToggleModalDelivery(item, item1) {
        //item c'est l'adresse de livraison de cette commande, et item1 c'est le montant de la livraison
        const newItem = [item, item1]
        dispatch(setAddressInfosOrders(newItem))
        toggleInfo()
    }

    //modal pour afficher les informations de la commande
    const {isShowing: isInfoShowed2, toggle: toggleInfo2} = useModal();
    function ToggleModalInfos(item, item1) {
        //item c'est les infos produits de cette commande, et item1 c'est le montant de chaque produit
        const newItem = [item, item1]
        //on dispatch dans le state.user.order
        dispatch(setOrderFromAdmin(newItem))
        toggleInfo2()
    }

    const screenWidth = useWindowSize().width;

    useEffect(()=>{
         //console.log(screenWidth);
    },[])

    return (
        <div className='list-orders-admin'>
            <h2 className='m-3 text-center text-primary'>Liste des commandes</h2> 
            <br/>
            <div className='div-search-button-add'>
                <div className="input-group-prepend mr-3">
                    <div className="form-outline">
                        <input onChange={e => onChangeInput(e)} value={valueInput} id="search-focus" type="search" placeholder="search" className="form-control" />
                    </div>
                    <button type="button" className="btn btn-primary">
                        <i className="fas fa-search"></i>
                    </button> 
                </div>
            </div>
            <div className='d-flex justify-content-between title-order-admin'>
                <div className='commande-total'>
                    <h5>Commande</h5>
                    <h5 className='total'>Totale</h5>
                </div>
                <div className='user-action'>
                    <h5>User</h5>
                    <h5 className='action'>Action</h5>
                </div>
            </div>
            <hr/>
            <div className='total-list-order'>
                {orders.length ? (orders !== null && orders.length > 0 && orders.map(item =>{
                    return(
                        <>   
                            <div className='infos-order-number-total'>
                                <div className='infos-name'>
                                    <div>
                                        <p className='p-nameproduct'>{item.orderNumber[0]}</p>
                                        <p className='p-nameproduct'>passée le : {item.orderNumber[1]}</p>
                                    </div>
                                    <div className='total-price'>
                                        {/*si on a un code promo qui a été utilisé lors d'une commande on le verra ici, le résultat sera soutrait du montant du code promo*/}
                                        <p>{screenWidth < 992 ? 'Total: ' : ''} {NumberPurchases(item.total) - (item.promo !== null ? item.promo : 0)} € {item.promo !== null ?<p className='text-danger small'><em>&#40;{item.promo} Є code promo&#41;</em></p> : ""}</p>
                                    </div>
                                </div>
                                <div className='infos-user'>
                                    <div>
                                        <p className='p-nameproduct'>{item.userEmail}</p>
                                        <p className='p-nameproduct'>{item.delivery.lastname.charAt(0).toUpperCase() + item.delivery.lastname.slice(1) } {item.delivery.firstname.charAt(0).toUpperCase() + item.delivery.firstname.slice(1)}</p>
                                    </div>
                                    <div className='btn-infos mr-3'>
                                        <i role={'button'} title='infos livraison' data-toggle="modal" data-target="#modalDeliveryInfos" onClick={()=>ToggleModalDelivery(item.delivery, item.total[0])} className="fa-solid fa-truck mr-3 fa-lg text-info" ></i>
                                        {isInfoShowed && <ModalInfosDelivery hide={()=>toggleInfo()} />}
                                        <i data-toggle="modal" data-target="#modalOrderInfos" onClick={()=>ToggleModalInfos(item.product, item.total)} role={'button'} title='infos commande' className="fa-brands fa-shopify fa-lg text-success"></i>
                                        {isInfoShowed2 && <ModalAdminInfoOrder hide={()=>toggleInfo2()} />}
                                    </div>
                                </div>
                            </div>
                            <div className='order-admin'>  
                                
                            </div>
                            <hr/>
                        </>)
                })) : 'la liste des commandes est vide'}
            </div>
        </div>
    );
}

export default ListOrders;