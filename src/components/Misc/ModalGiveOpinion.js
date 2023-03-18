import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchemaOpinion } from '../Auth/validationSchemaYup/ValidationSchemaOpinion';
import { useSelector, useDispatch } from 'react-redux';
import { Rating } from 'react-simple-star-rating';
import { addNewDataOpinion } from '../../lib/service/service';
import { addNewOpinionData } from '../../lib/state/features/user.slice';
import serviceAdmin from '../../lib/service/serviceAdmin';

function ModalGiveOpinion(props) {

    const dispatch = useDispatch();
    const token = useSelector(state => ({...state.user.token}))
    const userId = useSelector(state => state.user.users.body)

    //ce state c'est pour faire en facon que ma modale se ferme correctement à la validation du formulaire grace  à la 
    //proprieté data-dismiss de la balise button de bootstrap
    const [dataDismiss, setDataDismiss] = useState(false);

    const { register, handleSubmit, formState, reset } = useForm({
		mode: "onBlur",
		defaultValues: { 
			name: "",
            opinion: "" 
		},
		resolver: yupResolver(validationSchemaOpinion),  
    });

	const { errors } = formState; 

    //fonction pour envoyer le formulaire donc le valider, et envoyer les données à la bdd, et au store redux
    //pour voir les maj en direct sans rafraichissement de la page
	const onSubmit = (data) => {
        props.hide();
        setDataDismiss(!dataDismiss)
        //fonction pour donner toujours un id opinion different
        const opinionNumber = userId.id.match(/\d+/g).join('') + userId.opinions.length +7; 
        const date = new Date();
        const dataFormat = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()
        const newData = {
            id: opinionNumber,
            nameProduct: props.product,
            opinion: data.opinion,
            userName: data.name,
            star: rating,
            date: dataFormat 
        }
        //envoie de l'avis vers la colection opinions (où l'on stocke tous les avis de tous les utilisateurs pour les afficher dans la dashboard admin)
        serviceAdmin.addOpinionAdminService(token.accessToken, newData)
        //envoie vers la collection user, donc vers le array opinions de l'utilisateur qui a envoyé l'opinion, et vers du coup le produit en question aussi (on fait les 2 requetes dans le meme controller)
        addNewDataOpinion(token.accessToken, newData); 
        dispatch(addNewOpinionData(newData))
	};

    //fonction pour ecouter le onchange et si length == à 4 on passe le dataDismiss à true pour aprés bien fermer notre
    //fenetre modal bootstrap (proprieté data-dismis balise bouton)
    function onchangetextArea(e) {
        if (e.target.value.length === 4) {
            setDataDismiss(!dataDismiss);
        }
    }

    //state et fonction afficher les étoiles de satisfaction de l'utilisateur
    const [rating, setRating] = useState(100) 
    const handleRating = (rate) => {
        setRating(rate)
    }

    return (
        <>
            <div class="modal fade" id='modalOpinionForm' tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header text-center w-100">
                            <div>
                                <h4 class="modal-title font-weight-bold">Ajouter un commentaire</h4>
                            </div>
                            <div>
                                <button type="button" onClick={()=>props.hide()} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                        </div>
                        <form className='m-3' >
                            <div className="form-row">
                                <div className="col form-group col-md" >
                                    <label>UserName</label>
                                    <input {...register("name")} type='text' name='name' className="form-control" onChange={(e)=>onchangetextArea(e)} />
                                    <small className="text-danger">
                                        {errors.name?.message}	
                                    </small>
                                </div>
                            </div> 
                            <div className="form-group">
                                <div className="col form-group col-md p-0" >
                                    <label>Donnez votre avis</label>
                                    <textarea {...register("opinion")} type='textArea' name='opinion' className="form-control" rows="3"></textarea>                                    
                                    <small className="text-danger">
                                        {errors.opinion?.message}
                                    </small>
                                </div>
                            </div>
                            <div>
                                <p>Le produit corresponds à vos attentes?</p>
                                <Rating
                                    // fillColor="#BADA55"
                                    // allowHalfIcon
                                    tooltipArray={['nul', 'bof', 'moyen', 'top', 'génial']}
                                    transition
                                    showTooltip
                                    onClick={handleRating}
                                    ratingValue={rating} /* Available Props */
                                />
                            </div> 
                            <div className="form-group d-flex mt-4 justify-content-md-end">
                                <button type="button" onClick={handleSubmit(onSubmit)} className={`col-md-2 mr-4 btn btn-primary`} data-dismiss={dataDismiss ? "modal" : ""} >Valider</button>
                                <button type="button" className="col-md-2 btn btn-danger" onClick={() => reset()}>Annuler</button>
                            </div>              
			            </form> 
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalGiveOpinion;