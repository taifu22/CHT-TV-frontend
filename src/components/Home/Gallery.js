import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from './Product'; 
import Pagination from './Pagination';
import { fetchProducts } from '../../lib/service/service'

/*ici on créé 3 composants, le premier c'est pour afficher notre gallerie, si on a bien récuperé la data avec les produits
le deuxieme c'est pour afficher un message, si le tableau des datas est vide donc pas de produits a afficher dans la gallerie
le troisiémé c'est pour afficher un message loading, si par exemple ca mets du temps pour récuperer la data depuis le back
a savoir dans une fonction fleché (comme ici, on genere un composant avec cette fonction), si on mets les {}, on est 
obligé de mettre return sinon pas de return et pas de {} */ 
const Results = ({ items, pageIndex }) => {
	//console.log(items);
	return !!items.length && items[pageIndex].map(product => <Product key={product.id} {...product}/>)
}
const Empty = ({ isVisible }) => !isVisible && <p style={{marginLeft: 18, fontSize: 18}}>No Listing available ... </p>
const Loading = ({ isLoading }) => isLoading && <p style={{marginLeft: 18, fontSize: 18}}>Loading... </p>

const Gallery = () => { 

	const dispatch = useDispatch();
	const state = useSelector(state => ({...state.products}));
	const {items, isLoading } = state; 

	//appel de la fonction pour dispatche dans le store redux 
	useEffect(() => {
	   dispatch(fetchProducts()) 
	}, [])

	return (
	<>
		<section className="mt-3 mb-5">
			<header className="section-heading mb-5">
				<h3 className="title-section">Products</h3>
			</header>
			<div className="row">
				<Loading isLoading={isLoading}/> 
				<Results {...state}/> 
				<Empty isVisible={!!items}/> 
			</div> 
			<div className="clearfix"></div>
		</section>
		<Pagination />
	</>
	)
}
export default Gallery