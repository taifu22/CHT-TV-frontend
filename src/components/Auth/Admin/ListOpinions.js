import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import serviceAdmin from '../../../lib/service/serviceAdmin';
import { deleteOpinionRedux, deleteReportopinion, setOpinionFromAdmin } from '../../../lib/state/features/opinion.slice';
import useModal from '../../../lib/hooks/useModal';
import ModalOpinion from './ModalOpinion';

function ListOrders(props) {

    const token = useSelector(state => ({...state.user.token}));
    const [valueInput, setValueInput] = useState('tous les avis')
    const opinions = useSelector(state => state.opinions.items)
    const dispatch = useDispatch();

    //variable pour stocker les avis signalés dans un array au chargement de la page
    let arrayOpinionsReport = [];

    //function to sorted list opinions with the value of input
    function onChangeInput(e) {
        setValueInput(e.target.value) 
    }

    const options = [
        "tous les avis",
        "avis signalés"
    ]

    //function pour valider quand meme un avis signalé par un user (il peut y avoir un user qui signale pour rien, ou un erreur de la part de l'user)
    function deleteReport(id, email) {
        serviceAdmin.deleteReportOpinion(token.accessToken, id, email)
           .then(res => dispatch(deleteReportopinion(id)))
    }

    //fonction pour supprimer une opinion, donc un avis utilisateur
    function deleteOpinion(item) {
        const data = {
            id: item.id,
            email: item.user,
            nameProduct: item.nameProduct
        }
        serviceAdmin.deleteOpinionAdminService(token.accessToken, data)
            .then(res => dispatch(deleteOpinionRedux(item.id)))
    }

    //fonction pour afficher les étoile par rapport au avis des utilisateurs sur le produit
    function Viewstars(arrayStar, func) {
        return arrayStar.map((item, index) => { 
            return (
                    item <= func ? 
                    <i key={'key-etoile'+index} style={{color:'#FFD700'}} className=" fa fa-solid fa-star"></i> : 
                    <i key={'key-etoile'+index} style={{color:'#CCCCCC'}} className=" fa fa-solid fa-star"></i>)
        })
    }
    //tableau qui me sert pour afficher les étoiles dan la balise ul ci-dessous
    let star = [1,2,3,4,5]

    //modal pour afficher les informations d'opinion laissé par l'utilisateur
    const {isShowing: isInfoShowed, toggle: toggleInfo} = useModal();
    function ToggleModalInfos(opinion, user, product) {
        let item = {opinion: opinion, user: user, product: product}
        //item donc c'est l'objet qu'on dispatch dans le store pour la visualiser dans la modal
        dispatch(setOpinionFromAdmin(item))
        toggleInfo()
    }

    return (
        <div className='list-opinions-admin'>
        {opinions.map(item=>{
            //je stocke les avis signalés dans un array pour les visualiser si on choisit l'option de visualisation 'avis signalés'
            if (item.report.length ) {
                arrayOpinionsReport.push(item)
            }
        })}
            <h2 className='m-3 text-center text-primary'>Liste des avis</h2>
            <br/>
            <div className='div-search-button-add'>
                <div className='col form-group col-md-4'>
                    <select className="form-control" onChange={(e)=>onChangeInput(e)}>
                        {options.map((value, index) => (
                        <option value={value} key={index}>
                            {value}
                        </option>
                        ))} 
                    </select>
                </div>
            </div>
            <div className='total-list-opinions'>
                <div className='title-opinions'>
                    <div className='email'>
                        <h5>Email user</h5>
                        <h5 className='star'>Stars</h5>
                    </div>
                    <div className='products'>
                        <h5>Produit</h5>
                        <h5 className='action'>Action</h5>
                    </div>
                </div>
                <div className='list-opinions'>
                    {(valueInput === "tous les avis" && opinions.length) ? opinions.map((item,index) => {
                        return  (
                            <>
                            <div style={index%2 == 0 ? {backgroundColor:'#ECEBEA'} : {backgroundColor:''}} className='opinion'>
                                <div className='opinion-user'>
                                    <p className='p-elipsis'>{item.user}</p>
                                    <ul className="rating-stars mb-1 stars1">
                                        {Viewstars(star, item.star)} 
                                    </ul> 
                                </div>
                                <div className='opinion-action'>
                                    <p className='p-elipsis product'>{item.nameProduct}</p>
                                    <div>
                                        <i onClick={()=> ToggleModalInfos(item.opinion, item.user, item.nameProduct)} role={'button'} title="voir l'avis" data-toggle="modal" data-target="#modalOpinionInfos" className="fa-solid fa-eye mr-3"></i> 
                                        {isInfoShowed && <ModalOpinion hide={()=>toggleInfo()} />}
                                        <i role={'button'} title={"supprimer l'avis"} onClick={()=>deleteOpinion(item)} className="text-danger fa-solid fa-trash mr-3"></i>
                                        {item.report.length ? <i role={'button'} onClick={()=>deleteReport(item.id, item.user)} title="avis signalé, cliquez ici pour valider quand meme" className=" fa-solid fa-cancel text-danger"></i> : <i title='avis valide' className="text-success fa-solid fa-check-double"></i>}
                                    </div>
                                </div>
                            </div>
                            </> 
                        )
                    })
                    : (valueInput === "avis signalés" && arrayOpinionsReport.length) ? arrayOpinionsReport.map((item,index) => {
                        return  (
                            <>
                            <div style={index%2 == 0 ? {backgroundColor:'#ECEBEA'} : {backgroundColor:''}} className='opinion'>
                                <p>{item.user}</p>
                                <ul className="rating-stars mb-1">
                                    {Viewstars(star, item.star)}
                                </ul> 
                                <p>{item.nameProduct}</p>
                                <div>
                                    <i onClick={()=> ToggleModalInfos(item.opinion, item.user, item.nameProduct)} role={'button'} title="voir l'avis" data-toggle="modal" data-target="#modalOpinionInfos" className="fa-solid fa-eye mr-3"></i>
                                    {isInfoShowed && <ModalOpinion hide={()=>toggleInfo()} />}
                                    <i role={'button'} title={"supprimer l'avis"} onClick={()=>deleteOpinion(item)} className="text-danger fa-solid fa-trash mr-3"></i>
                                    {item.report.length ? <i role={'button'} onClick={()=>deleteReport(item.id, item.user)} title="avis signalé, cliquez ici pour valider quand meme" className=" fa-solid fa-cancel text-danger"></i> : <i title='avis valide' className="text-success fa-solid fa-check-double"></i>}
                                </div>
                            </div>
                            </>
                        )
                    }) : (valueInput === "avis signalés" && arrayOpinionsReport.length === 0) ? <p className='p-no-report'>Aucun avis signalé</p>
                    : (valueInput === "tous les avis" && opinions.length === 0) ? <p className='p-no-report'>Aucun avis utilisateur</p> : ""}
                </div>
            </div>
        </div>
    );
}

export default ListOrders;