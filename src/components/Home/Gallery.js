import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from './Product'; 
import Pagination from './Pagination';
import { fetchProducts, fetchProductsWithoutPagination, fetchproductsWithCategory } from '../../lib/service/service'
import { useLocation } from 'react-router-dom';
import { setPageIndex } from '../../lib/state/features/products.slice';

/*ici on créé 3 composants, le premier c'est pour afficher notre gallerie, si on a bien récuperé la data avec les produits
le deuxieme c'est pour afficher un message, si le tableau des datas est vide donc pas de produits a afficher dans la gallerie
le troisiémé c'est pour afficher un message loading, si par exemple ca mets du temps pour récuperer la data depuis le back
a savoir dans une fonction fleché (comme ici, on genere un composant avec cette fonction), si on mets les {}, on est 
obligé de mettre return sinon pas de return et pas de {} */ 
const Results = ({ items, pageIndex, toggle }) => {
	return (
		!!items.length && items[pageIndex].map(product => <Product toggle={toggle} key={product.id} {...product}/>)
	);
}
const Empty = ({ isVisible }) => !isVisible && <p style={{marginLeft: 18, fontSize: 18}}>No Listing available ... </p>
const Loading = ({ isLoading }) => isLoading && <p style={{marginLeft: 18, fontSize: 18}}>Loading... </p>

const Gallery = () => { 

	const dispatch = useDispatch();
	const location = useLocation();
	const state = useSelector(state => ({...state.products}));
	const categorys = useSelector(state => state.categorys.category)
	const {items, isLoading } = state; 

	//ici on stocke la valeur de la categorie qu'on a choisi depuis la navbar
	//on démarre toujours en visualisant tous les produits
	const [category, setCategory] = useState('All products')

	//appel de la fonction pour dispatche dans le store redux  
	useEffect(() => {
		//à chaque changement de catégory la pageindex sera la 0, pour ne pas avoir des erreurs, car si par exemple dans 
		//la categorie tv on est à la pageindex 1 (deuxième array de 9 products) et qu'on choisi la cat télécommande, et ici pas de deuxieme page
		//donc on a seulement un seul tableau car moins de 9 products, alors là on affichera un erreur
		//en mettant la pageindex toujours à 0 on est sur de ne pas avoir d'erreurs
		dispatch(setPageIndex(0));
		//je dispatch la liste de tous les produits sans tri de pagination
		dispatch(fetchProductsWithoutPagination());
		//je dispatch les produits dans le store avec tri de pagination, 9 product par array
	    /*j'utilise le location, car si le state du lacation n'est pas null, car on a utilisé le research dans une autre page
		alors on affichera directement les produits sorti lors de la recherche (voir composant /Layout/Nav)*/ 
		if (category !== 'All products') {
			dispatch(fetchproductsWithCategory(category))
		} else if (category === 'All products') {
			location.state === null && dispatch(fetchProducts()); 
		}
		//categorysReversed = categorys.reverse()
		//console.log(categorysReversed);
	}, [category])

	//on mets en place un système de toggle pour passer la gallerie d'affichage via une grid vers affichage via une liste
	const [toggle, setToggle] = useState(true)

	//state pour afficher/masquer la dropdown du choix des categories
	const [dropDown, setDropDown] = useState(false);

	return (
	<>
		<section className="mt-3 mb-5 section-gallery d-flex flex-column">
		<h3 className="title-section text-center mb-3">Nos produits</h3>
			<header className="section-heading mb-5 d-flex justify-content-between">
				<div className='div-categorys'>
				    <div className='div-category bg-primary' onClick={()=> setDropDown(!dropDown)}>
						<p className='m-0'>CATEGORIE : {category}</p> {dropDown ? <i className="ml-2 fa-solid fa-caret-up"></i> : <i className="ml-2 fa-solid fa-caret-down"></i>}
					</div>
					{dropDown ? <div className='div-list-categorys'>
					    { categorys.map(item => {
							return <div className='d-flex align-items-center' role={'button'} onClick={()=> {setCategory(item.name);setDropDown(false)}}><span className='p-category' >{item.name}</span><img src={'http://localhost:4000/uploads/imagesUsersProfil/' + item.image} /></div>
						}) }
					</div> : ""}
				</div>
				<div className='d-flex mr-3'> 
					<p className='mr-3'>Voir:</p>
					<i class="fa-solid fa-table mr-3 fa-2x" style={{color: toggle ? '#3B71CA' : 'black'}}  onClick={()=> setToggle(!toggle)}></i>
					<i class="fa-solid fa-list fa-2x" style={{color: toggle ? 'black' : '#3B71CA'}} onClick={()=> setToggle(!toggle)}></i>
				</div>
			</header>
			<div>
				<div className="row inside-gallery"> 
					<Loading isLoading={isLoading}/> 
					<Results toggle={toggle} {...state}/> 
					<Empty isVisible={!!items}/> 
				</div> 
				<div className="clearfix"></div>
			</div>
		</section>
		<Pagination />
	</>
	)
}
export default Gallery