import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import serviceAdmin from '../../../lib/service/serviceAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProductAdmin, deleteInfosproductFromAdmin, setPriceReduction, updateProductFromAdmin } from '../../../lib/state/features/products.slice';
import { ValidationSchemaAddProduct } from '../validationSchemaYup/ValidationSchemaAddProduct';
import SelectInput from './SelectInputAddProduct';
import SelectInputAddReductionprice from './SelectInputAddReductionprice';
import service from '../../../lib/service/service';

function ModalAddProduct(props) {

    const [placeholder, setPlaceholder] = useState(props.data)
    const dispatch = useDispatch();
    const token = useSelector(state => ({...state.user.token}))
    const infosProduct = useSelector(state => state.products.infosProduct)
    const categorys = useSelector(state => state.categorys.category)

    const { register, handleSubmit, formState, reset } = useForm({
		mode: "onBlur",
        //ici on mets ce qu'on verra par défaut dans les input, pour les modifier
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
        console.log(data);
        const form = new FormData(); 
        form.append('name', data.name);
        form.append('category', data.category);
        form.append('description', data.description);
        form.append('price', data.price);
        form.append('picture', data.picture[0]);
        form.append('picture1', data.picture1[0]);
        form.append('picture2', data.picture2[0]);
        form.append('picture3', data.picture3[0]);
        //si une reduction du prix existe on l'ajoute à la bdd
        if (priceWithreduction !== null) {
            form.append('priceReduction', priceWithreduction.price);
            form.append('percentageReduction', priceWithreduction.percentage)
        }
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
        //on remet à null le setpriceReduction dans le store di redux, comme ca s'il a été modifié il repassera a null
        dispatch(setPriceReduction(null));
	};

    //passer de la page avec les info de l'image vers la page où l'utilisateur chargera les images du produit
    const [handleChangePage, setHandleChangePage] = useState(false);
    function handleChangeView(e) {
        e.preventDefault();
        setHandleChangePage(!handleChangePage);
    }

    //fonction pour prévisualiser une image (chargé avec l'input file) avant l'upload
    //on récupère le File du FileList (donc son index 0), puis on visualise l'image avec l'Objet Filereader de js
    const [picture1, setPicture1] = useState()
    const [picture2, setPicture2] = useState()
    const [picture3, setPicture3] = useState()
    const [picture4, setPicture4] = useState()
    function onChangePicture(e, picture) {
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.onload = () => {
            return picture === 'picture1' ?
                    setPicture1(reader.result) :
                    picture === 'picture2' ?
                    setPicture2(reader.result) :
                    picture === 'picture3' ?
                    setPicture3(reader.result) :
                    picture === 'picture4' ?
                    setPicture4(reader.result) : ""
        }
        reader.readAsDataURL(file)
    }

    /*pour la modification du prix, on a la possibilité d'ajouter une réduction par rapport au select, du coup le prix on l'affihera 
    dans une balise p, qui sera modifié selon la reduction choisit, sinon on ala possibilité d'appuyer sur le bouton modify
    pour modifier directement via un input le prix*/
    //on commence par la création d'un state, qui nous donne la possibilité de modifier le prix du produit sans passer par la réduction
    const [stateprice, setStatePrice] = useState(false);
    //tableau contenant la liste des reductions possibles pour le prix
    const arrayReduction = ['0%','10%','20%','30%','40%','50%','60%', '70%', '80%'];
    //ici on récupère notre prix aprés avoir choisi la reduction depuis le store redux 'products.pricereduction'
    const priceWithreduction = useSelector(state => state.products.priceReduction);


    return (
        <>
            <div className="modal fade" id={props.dataTarget} tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h4 className="modal-title w-100 font-weight-bold">{infosProduct !== null ? 'Modifier le produit' : 'Ajouter un nouveau produit'}</h4>
                            <button type="button" className="close" onClick={()=>{props.funcToggle();setPlaceholder(undefined);dispatch(deleteInfosproductFromAdmin());dispatch(setPriceReduction(null))}} data-dismiss="modal" aria-label="Close">
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
                                            <input id="picture" {...register("picture")} type="file" onChange={e=>onChangePicture(e, 'picture1')}/>
                                            {infosProduct !== null && (infosProduct.pictures[0] !== undefined ? <img style={{height:'50px'}} src={picture1 != undefined ? picture1 : 'http://localhost:4000/uploads/imagesUsersProfil/' + infosProduct.pictures[0].filename}></img> : <img style={{height:'50px'}} src={picture1}></img>)} 
                                            {(infosProduct === null && picture1 !== undefined) ? <img style={{height:'50px'}} src={picture1}></img> : ""}
                                        </div>
                                        <small className="text-danger">
                                            {errors.picture?.message}
                                        </small>
                                    </div>
                                    <div className="form-group col" >
                                        <div className='d-flex justify-content-between'>
                                            <input id="picture1" {...register("picture1")} type="file" onChange={e=>onChangePicture(e, 'picture2')}/>
                                            {infosProduct !== null && (infosProduct.pictures[1] !== undefined ? <img style={{height:'50px'}} src={picture2 != undefined ? picture2 : 'http://localhost:4000/uploads/imagesUsersProfil/' + infosProduct.pictures[1].filename}></img> : <img style={{height:'50px'}} src={picture2}></img>)} 
                                            {(infosProduct === null && picture2 !== undefined) ? <img style={{height:'50px'}} src={picture2}></img> : ""}
                                        </div> 
                                        <small className="text-danger">
                                            {errors.picture1?.message}
                                        </small>
                                    </div>
                                    <div className="form-group col" >
                                        <div className='d-flex justify-content-between'>
                                            <input id="picture2" {...register("picture2")} type="file" onChange={e=>onChangePicture(e, 'picture3')}/>
                                            {infosProduct !== null && (infosProduct.pictures[2] !== undefined ? <img style={{height:'50px'}} src={picture3 != undefined ? picture3 : 'http://localhost:4000/uploads/imagesUsersProfil/' + infosProduct.pictures[2].filename}></img> : <img style={{height:'50px'}} src={picture3}></img>)} 
                                            {(infosProduct === null && picture3 !== undefined) ? <img style={{height:'50px'}} src={picture3}></img> : ""}
                                        </div>
                                        <small className="text-danger">
                                            {errors.picture2?.message}
                                        </small>
                                    </div>
                                    <div className="form-group col" >
                                        <div className='d-flex justify-content-between'>
                                            <input id="picture3" {...register("picture3")} type="file" onChange={e=>onChangePicture(e, 'picture4')}/>
                                            {infosProduct !== null && (infosProduct.pictures[3] !== undefined ? <img style={{height:'50px'}} src={picture4 != undefined ? picture4 : 'http://localhost:4000/uploads/imagesUsersProfil/' + infosProduct.pictures[3].filename}></img> : <img style={{height:'50px'}} src={picture4}></img>)} 
                                            {(infosProduct === null && picture4 !== undefined) ? <img style={{height:'50px'}} src={picture4}></img> : ""}
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
                                            {stateprice ? <div><input {...register("price")} type='text' name='price' className="form-control" />
                                            <small className="text-danger">
                                                {errors.price?.message}
                                            </small></div> : stateprice === false && infosProduct !== null ? <div className='border  p-2 d-flex justify-content-between'>
                                                                <p className='ml-3'>{priceWithreduction !== null ? priceWithreduction.price : infosProduct.price} €</p>
                                                                <i role='button' onClick={()=>{setStatePrice(!stateprice); service.deletePricePercentageReduction(token.accessToken, infosProduct.id);}} className="fa-solid fa-pen-to-square text-info"></i>
                                                                <SelectInputAddReductionprice price={infosProduct.price} name={"priceReduction"} register={register} options={arrayReduction} label={'Choisir la réduction'}/>
                                                            </div> : <><input {...register("price")} type='text' name='price' className="form-control" /></>}
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
                                        <SelectInput name={"category"} register={register} options={categorys} label={'categorie'}/>
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