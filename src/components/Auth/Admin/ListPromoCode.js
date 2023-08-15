import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import servicePromosCode from '../../../lib/service/servicePromosCode';
import { useSelector, useDispatch } from 'react-redux';
import { ValidationSchemaPromosCode } from '../validationSchemaYup/ValidationScemaPromosCode';
import { addNewPromosCodeAdmin, deletePromosCodeFromAdmin } from '../../../lib/state/features/PromosCode.slice';
import useModal from '../../../lib/hooks/useModal';
import ModalMessageSendOk from '../../Misc/ModalMessageSendOk';

function ListPromoCode(props) {
    const token = useSelector(state => ({...state.user.token}))
    const promosCode = useSelector(state => state.promosCodes.promosCode);

    const dispatch = useDispatch();

    const { register, handleSubmit, formState, reset } = useForm({ 
		mode: "onBlur",
		resolver: yupResolver(ValidationSchemaPromosCode),
    });

	const { errors } = formState;

    //fonction pour ajouter un code promo
	const onSubmit = (data) => {
        servicePromosCode.addNewDataPromosCode(token.accessToken, data)
            .then(data => {
                if (data.status == 200) {
                 //si le code promo a été ajouté correctement en bdd alors on affichera la modale qui confirme cela à l'admin
                 toggleInfo();
                 //on dispatch vers redux
                 dispatch(addNewPromosCodeAdmin(data.data.body))
                }
            })
        reset();
	};

    //fonction pour supprimer une category de la bdd
    function deletepromosCodeFunc(id, name) {
        servicePromosCode.deleteDataPromosCode(token.accessToken, id, name)
            .then(res => {
                if (res.status === 200) {
                    dispatch(deletePromosCodeFromAdmin(id))
                }
            })
    }

    //la modal de confirmation s'affichera si la category a été bien ajouté en bdd
    const {isShowing: isInfoShowed, toggle: toggleInfo} = useModal();

    //coté style on utiliser le meme fichier de style pour la liste des categories donc le /styles/auth/_listcategorysAdmin.scss
    return (
        <div className='list-categorys-div container-fluid'>  
            {isInfoShowed && <ModalMessageSendOk message1={'Ajouté en BDD'} message2={'parfait l\'ajout a été fait sans problèmes !'} hide={()=>toggleInfo()} />}
            <h2 className='m-3 text-center text-primary'>Liste des codes promo</h2>
            <br/>
            <div>
                <h5>Ajouter un code promotionnel</h5>
                <form className='' onSubmit={handleSubmit(onSubmit)} /*enctype="multipart/form-data"*/>
                    <div className='form-group'>
                        <label for="fullname-upload">Code promotionnel</label>
                        <input className='form-control col-6' {...register("code")} type='text' name='code' />
                        <small className="text-danger">
                            {errors.code?.message}	
                        </small>
                    </div>
                    <div className='form-group'>
                        <label for="fullname-upload">Prix à déduire, ou pourcentage</label>
                        <input className='form-control col-6' {...register("price")} type='text' name='price' />
                        <small className="text-danger">
                            {errors.price?.message}	
                        </small>
                    </div>
                    <div className='form-group'>
                        <label for="fullname-upload">Description</label>
                        <input className='form-control col-6' {...register("description")} type='text' name='description' />
                        <small className="text-danger">
                            {errors.description?.message}	
                        </small>
                    </div> 
                    <button className='btn btn-primary mb-3' type='submit'>Envoie en BDD</button>
                </form>
            </div>
            <h5 className='mt-3'>Liste des codes fonctionnels en BDD</h5>
            <div className='row mt-3'>
                    {promosCode.map((item, index) => {
                        console.log(item)
                        return(
                            <div style={index%2 == 0 ? {backgroundColor:'#ECEBEA'} : {backgroundColor:''}} className='col-lg-6 col-12'>
                                <hr/>
                                <div className='d-flex justify-content-between p-3'>
                                    <div className='d-flex'>
                                        <p className='text-primary'>{item.code}</p>
                                        <p className='ml-3'>reduction -{item.price} euros</p>
                                    </div>
                                    <div className='d-flex flex-column'>
                                        <i onClick={()=>deletepromosCodeFunc(item._id, item.code)} role='button' title='supprimer la catégorie' className="text-danger fa-solid fa-trash"></i>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    );
}

export default ListPromoCode;