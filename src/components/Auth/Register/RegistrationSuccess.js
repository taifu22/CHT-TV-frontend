import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function RegistrationSuccess() {

    const dataUser = useLocation();
    //avec ces 2 constantes je mets la premiere lettre du nom et prenom en majuscule, si l'utilisateur les a mis en minuscule
    const firstName = dataUser.state.firstname.charAt(0).toUpperCase() + dataUser.state.firstname.slice(1);
    const lastName = dataUser.state.lastname.charAt(0).toUpperCase() + dataUser.state.lastname.slice(1);

    return (
         <div className="card mx-auto" style={{maxWidth:'520px', marginTop:'140px'}} >
           <article className="card-body">
			    <header className="mb-4"><h4 className="card-title">Votre inscription a été bien effectué !</h4></header>
                <p>Bienvenu {firstName} {lastName}</p>
                <p>pour vous connecter <Link to='/login'>cliquez ici</Link></p>
            </article>
        </div>
    );
}

export default RegistrationSuccess;