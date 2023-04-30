import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import serviceCategory from '../../../lib/service/serviceCategory';
import { useSelector, useDispatch } from 'react-redux';
import { ValidationSchemaCategory } from '../validationSchemaYup/ValidationSchemaCategory';
import { addNewCategoryAdmin, deleteCategoryFromAdmin } from '../../../lib/state/features/category.slice';
import useModal from '../../../lib/hooks/useModal';
import ModalMessageSendOk from '../../Misc/ModalMessageSendOk';

function ListCategorys(props) {

    const token = useSelector(state => ({...state.user.token}))
    const categorys = useSelector(state => state.categorys.category);

    const dispatch = useDispatch();

    const { register, handleSubmit, formState, reset } = useForm({ 
		mode: "onBlur",
		resolver: yupResolver(ValidationSchemaCategory),
    });

	const { errors } = formState;

	const onSubmit = (data) => {
        const form = new FormData()
        form.append('name', data.name);
        form.append('picture', data.picture[0]);
        serviceCategory.addNewDataCategory(token.accessToken, form)
            .then(data => {
                if (data.status == 200) {
                 //si la cat a été ajouté correctement en bdd alors on affichera la modale qui confirme cela à l'admin
                 toggleInfo();
                 //on dispatch vers redux
                 dispatch(addNewCategoryAdmin(data.data.body))
                }
            })
        reset();
	};

    //fonction pour supprimer une category de la bdd
    function deleteCategory(id) {
        serviceCategory.deleteDataCategory(token.accessToken, id)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    dispatch(deleteCategoryFromAdmin(id))
                }
            })
    }

    //la modal de confirmation s'affichera si la category a été bien ajouté en bdd
    const {isShowing: isInfoShowed, toggle: toggleInfo} = useModal();

    return (
        <div className='list-categorys-div container-fluid'>  
            {isInfoShowed && <ModalMessageSendOk message1={'Ajouté en BDD'} message2={'parfait l\'ajout a été fait sans problèmes !'} hide={()=>toggleInfo()} />}
            <h2 className='m-3 text-center text-primary'>Liste des categories</h2>
            <br/>
            <div>
                <form className='' onSubmit={handleSubmit(onSubmit)} /*enctype="multipart/form-data"*/>
                    <div className='form-group'>
                        <label for="fullname-upload">Nom de la catégorie</label>
                        <input className='form-control col-6' {...register("name")} type='text' name='name' />
                        <small className="text-danger">
                            {errors.name?.message}	
                        </small>
                    </div> 
                    <div className='form-group'>
                        <p className='m-0'><small>Vous pouvez télécharger l'icone depuis '<a href='https://icones8.fr/'>icones8</a>'</small></p>
                        <label role={'button'} className='text-primary mt-3 mr-3' htmlFor="picture">Cliquez ici pour charger l'icone</label>
                        <input id='picture' name="picture" {...register("picture")} type="file" className='image-profil-input' />
                        <small className="text-danger">
                            {errors.picture?.message}	
                        </small>
                    </div>
                    <button style={{marginTop:'-10px'}} className='btn btn-primary mb-3' type='submit'>Envoie en BDD</button>
                </form>
            </div>
            <div className='row'>
                    {categorys.map((item, index) => {
                        return(
                            <div style={index%2 == 0 ? {backgroundColor:'#ECEBEA'} : {backgroundColor:''}} className='col-lg-6 col-12'>
                                <hr/>
                                <div className='d-flex justify-content-between p-3'>
                                    <div className='d-flex'>
                                        <p>{item.name}</p>
                                        <img className='ml-3' style={{height:'20px'}} src={'http://localhost:4000/uploads/imagesUsersProfil/' + item.image} ></img>
                                    </div>
                                    <div className='d-flex flex-column'>
                                        {item.name === 'All products' ? '' : <i onClick={()=>deleteCategory(item._id)} role='button' title='supprimer la catégorie' className="text-danger fa-solid fa-trash"></i>}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    );
}

export default ListCategorys;