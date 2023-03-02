import React from 'react';
import { Link } from 'react-router-dom';

function Erreur_404() {
    return (
        <div className='erreur-404'>
            <div className='erreur-404-container'>
                <p className='p-404'>404</p>
                <p className='p-404-text'>Oups! La page que vous demandez n'existe pas.</p>
            </div>
            <div className='back-to-home'> 
                 <Link style={{color:'#132344' , textDecoration:'none'}} to="/">Retourner sur la page d'accueil</Link>
            </div>
        </div> 
    );
}

export default Erreur_404;