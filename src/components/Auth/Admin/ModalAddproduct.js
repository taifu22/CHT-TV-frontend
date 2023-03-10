import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import serviceAdmin from '../../../lib/service/serviceAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProductAdmin, deleteInfosproductFromAdmin, updateProductFromAdmin } from '../../../lib/state/features/products.slice';
import { ValidationSchemaAddProduct } from '../validationSchemaYup/ValidationSchemaAddProduct';

function ModalAddProduct(props) {

    const [placeholder, setPlaceholder] = useState(props.data)
    const dispatch = useDispatch();
    const token = useSelector(state => ({...state.user.token}))
    const infosProduct = useSelector(state => state.products.infosProduct)

    const { register, handleSubmit, formState, reset } = useForm({
		mode: "onBlur",
		defaultValues: { 
			category: infosProduct !== null ? infosProduct.category : "",
            description: infosProduct !== null ? infosProduct.description : "",
            name: infosProduct !== null ? infosProduct.name : "",
            price: infosProduct !== null ? infosProduct.price : "",
            picture: (infosProduct !== null && infosProduct.pictures !== undefined) ? infosProduct.pictures[0] : "",
            picture1: (infosProduct !== null && infosProduct.pictures !== undefined) ? infosProduct.pictures[1] : "",
            picture2: (infosProduct !== null && infosProduct.pictures !== undefined) ? infosProduct.pictures[2] : "",
            picture3: (infosProduct !== null && infosProduct.pictures !== undefined) ? infosProduct.pictures[3] : "",
		},
		resolver: yupResolver(ValidationSchemaAddProduct),
    });

	const { errors } = formState;

	const onSubmit = (data) => {
        /*je créé une constante form pour pouvoir créer un FormData, et pouvoir l'envoyer à mon back, comme ca, multer
        puisse recuperer la key picture dont l'index 0 contient l'image, et du coup créer une req.file*/ 
        const form = new FormData(); 
        form.append('name', data.name);
        form.append('category', data.category);
        form.append('description', data.description);
        form.append('price', data.price);
        form.append('picture', data.picture[0]);
        form.append('picture1', data.picture1[0]);
        form.append('picture2', data.picture2[0]);
        form.append('picture3', data.picture3[0]);
        //si on ouvre la modale pour modifier un produit, on envoie aussi à la bdd l'id du produit à modifier
        if (infosProduct !== null ) {
            form.append('id', infosProduct.id);
            serviceAdmin.updateProductAdminService(token.accessToken, form)
            //on supprime le produit du store redux, et on mets le nouveau avec les infos modifiés
                .then(res => {dispatch(updateProductFromAdmin(res.data.body))})
        } else {
            serviceAdmin.addProductAdminService(token.accessToken, form)
                .then(res => dispatch(addNewProductAdmin(res.data.body)))
                .catch(error => console.log(error));
		    props.funcToggle();
            dispatch(deleteInfosproductFromAdmin())
        }
	};

    //passer de la page avec les info de l'image vers la page où l'utilisateur chargera les images du produit
    const [handleChangePage, setHandleChangePage] = useState(false);
    function handleChangeView(e) {
        e.preventDefault();
        setHandleChangePage(!handleChangePage);
    }

    //fonction pour prévisualiser une image (chargé avec l'input file) avant l'upload
    //on récupère le File du FileList (donc son index 0), puis on visualise l'image avec l'Objet Filereader de js
    const [picture, setPicture] = useState()
    function onChangePicture(e) {
        console.log(e);
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.onload = () => {
            setPicture(reader.result)
        }
        reader.readAsDataURL(file)
    }

    return (
        <>
            <div className="modal fade" id={props.dataTarget} tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h4 className="modal-title w-100 font-weight-bold">{infosProduct !== null ? 'Modifier le produit' : 'Ajouter un nouveau produit'}</h4>
                            <button type="button" className="close" onClick={()=>{props.funcToggle();setPlaceholder(undefined);dispatch(deleteInfosproductFromAdmin())}} data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form className='m-3' >
                                <div className={handleChangePage ? 'modal-add-product-images-visible' : 'modal-add-product-images-none'}>
                                    <h6 className='ml-3 mr-3'>{infosProduct !== null ? 'Vous pouvez modifier une ou plusieurs images' : 'Vous pouvez choisir 1 à 4 images'}</h6>
                                    {infosProduct !== null ? <div className='mb-4 ml-3'>
                                                                <i class="text-danger fas fa-circle-info"></i>
                                                                <span className='text-secondary span-text-infos-update-product'>si vous modifiez une image il faudra recharger les autres aussi</span>
                                                            </div> : ""}
                                    <div className="form-group col" >
                                        <div className='d-flex justify-content-between'>
                                            <input id="picture" {...register("picture")} type="file" onChange={e=>onChangePicture(e)}/>
                                            {(infosProduct !== null && infosProduct.pictures[0] !== undefined) ? <img style={{height:'50px'}} src={picture != undefined ? picture : 'http://localhost:4000/uploads/imagesUsersProfil/' + infosProduct.pictures[0].filename}></img> : picture} 
                                            {(infosProduct === null && picture !== undefined) ? <img style={{height:'50px'}} src={picture}></img> : ""}
                                        </div>
                                        <small className="text-danger">
                                            {errors.picture?.message}
                                        </small>
                                    </div>
                                    <div className="form-group col" >
                                        <div className='d-flex justify-content-between'>
                                            <input id="picture1" {...register("picture1")} type="file" />
                                            {(infosProduct !== null && infosProduct.pictures[1] !== undefined) ? <img style={{height:'50px'}} src={'http://localhost:4000/uploads/imagesUsersProfil/' + infosProduct.pictures[1].filename}></img> : ""}
                                        </div> 
                                        <small className="text-danger">
                                            {errors.picture1?.message}
                                        </small>
                                    </div>
                                    <div className="form-group col" >
                                        <div className='d-flex justify-content-between'>
                                            <input id="picture2" {...register("picture2")} type="file" />
                                            {(infosProduct !== null && infosProduct.pictures[2] !== undefined) ? <img style={{height:'50px'}} src={'http://localhost:4000/uploads/imagesUsersProfil/' + infosProduct.pictures[2].filename}></img>: ""} 
                                        </div>
                                        <small className="text-danger">
                                            {errors.picture2?.message}
                                        </small>
                                    </div>
                                    <div className="form-group col" >
                                        <div className='d-flex justify-content-between'>
                                            <input id="picture3" {...register("picture3")} type="file" />
                                           {(infosProduct !== null && infosProduct.pictures[3] !== undefined) ?  <img style={{height:'50px'}} src={'http://localhost:4000/uploads/imagesUsersProfil/' + infosProduct.pictures[3].filename}></img> : "" }
                                        </div>
                                        <small className="text-danger">
                                            {errors.picture3?.message}
                                        </small>
                                    </div>
                                    <button onClick={(e)=>handleChangeView(e)} className='m-3 btn btn-info'>Modifier les infos</button>
                                </div>    
                                <div className={handleChangePage ? 'modal-add-product-none' : 'modal-add-product-visible'}>
                                    <div className="form-row">
                                        <div className="col form-group col-md" >
                                            <label>Name of product</label>
                                            <input defaultValue="tonio" {...register("name")} type='text' name='name' className="form-control"  />
                                            <small className="text-danger">
                                                {errors.name?.message}	
                                            </small>
                                        </div>
                                        <div className="col form-group col-md" >
                                            <label>Prix</label>
                                            <input {...register("price")} type='text' name='price' className="form-control" />
                                            <small className="text-danger">
                                                {errors.price?.message}
                                            </small>
                                        </div>
                                    </div> 
                                    <div className="form-group">
                                        <div className="col form-group col-md p-0" >
                                            <label>Description</label>
                                            <textarea {...register("description")} type='textArea' name='description' className="form-control" rows="3"></textarea> 
                                            <small className="text-danger">
                                                {errors.description?.message}
                                            </small>
                                        </div>
                                    </div> 	
                                    <div className='d-flex justify-content-between align-items-end'>
                                        <div className="" >
                                            <label>Category</label>
                                            <input {...register("category")} type='text' name='category' className="form-control" />
                                            <small className="text-danger">
                                                {errors.category?.message}	
                                            </small>
                                        </div>
                                        <button onClick={(e)=>handleChangeView(e)} className='h-50 btn btn-info'>{infosProduct !== null ? 'modifier les images' : 'Charger les images'}</button>
                                    </div>
                                </div>   
                            <div className="form-group d-flex mt-4 justify-content-md-end">
                                <button onClick={handleSubmit(onSubmit)} className={`col-md-2 mr-4 btn btn-primary`} data-dismiss="modal" >Valider</button>
                                <button type="button" className="col-md-2 btn btn-danger" onClick={() => reset()}>Annuler</button> 
                            </div>              
			            </form> 
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default ModalAddProduct;