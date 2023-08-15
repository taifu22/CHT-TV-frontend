import React, { useState, useRef } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import serviceUser from '../../../lib/service/serviceUser';
import { ValidationSchemaImage } from '../../Auth/validationSchemaYup/ValidationSchemaImage';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfilImage } from '../../../lib/state/features/user.slice';

function ImageProfil(props) {
    
    const token = useSelector(state => ({...state.user.token}))
    const dataImage = useSelector(state => ({...state.user.users.body}))
    const dispatch = useDispatch();
    
    //fonction pour afficher l'image du profile (on l'utilisera dans le src de la balise img)
    const imageData = () => {
        let image1;
        //on verifie si la key image existe dans le body des info de l'user (voir bdd)
        if (dataImage['image'] !== undefined) {
            //si existe on affiche l'image stocké dans le dossier uploads du back (geré par multer)
            image1 = 'http://localhost:4000/uploads/imagesUsersProfil/' + dataImage.image.img.data;    
        } else {
            //sinon si l'user vient de s'enregister on mets une image profil par défaut
            image1 = "./images/avatars/avatar3.jpg"
        }
        return image1;  
    }

    const { register, handleSubmit, formState, reset } = useForm({ 
		mode: "onBlur",
		resolver: yupResolver(ValidationSchemaImage),
    });

	const { errors } = formState;

	const onSubmit = (data) => {
        console.log(data);
        /*je créé une constante form pour pouvoir créer un FormData, et pouvoir l'envoyer à mon back, comme ca, multer
        puisse recuperer la key picture dont l'indes 0 contient l'image, et du coup créer une req.file*/ 
        const form = new FormData()
        form.append('name', data.name);
        form.append('picture', data.picture[0]);
        console.log(form);
        serviceUser.uploadImageProfil(token.accessToken, form)
        .then(res => dispatch(updateUserProfilImage(res.data.body))) 
	};

    return (
        <div className='container-fluid'>
            <h2 className='m-3 text-center text-primary'>Changer l'image du profil</h2>
            <hr/>
            <div className='row'>
                <div className='col-6'>
                    <p>{dataImage['image'] !== undefined ? dataImage.image.name : "photo profil"}</p>
                    <img className='w-75' src={imageData()}/>
                </div>
                <div className='col-6'>
                    <form onSubmit={handleSubmit(onSubmit)} /*enctype="multipart/form-data"*/>
                        <div className='form-group'>
                            <label for="fullname-upload">Nom de l'image</label>
                            <input className='form-control' {...register("name")} type='text' name='name' />
                            <small className="text-danger">
							    {errors.name?.message}	
						    </small>
                        </div> 
                        <div className='form-group'>
                            <label role={'button'} className='text-primary mt-3' htmlFor="picture">Cliquez ici pour choisir une image</label>
                            <input id="picture" {...register("picture")} type="file" className='image-profil-input' />
                            <small className="text-danger">
							    {errors.picture?.message}	
						    </small>
                        </div>
                        <button style={{marginTop:'-10px'}} className='btn btn-primary' type='submit'>Affiche et envoie</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ImageProfil;