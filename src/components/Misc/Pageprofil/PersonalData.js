import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import InputEmail from './inputEmail';
import InputFirstLastName from './InputFirstLastName';
import InputPassword from './InputPassword';

function PersonalData(props) {

    const token = useSelector(state => ({...state.user.token}))
    const data = useSelector(state => ({...state.user.users.body}))
    const [toggleData, setToggleData] = useState(false);
    const [togglePassword, setTogglePassword] = useState(false);
    const [toggleEmail, setToggleEmail] = useState(false);

    function handleData(params) {
        setToggleData(!toggleData);
    }
    function handlePassword(params) {
        setTogglePassword(!togglePassword);
    }
    function handleEmail(params) {
        setToggleEmail(!toggleEmail);
    }

    return (
        <div className='personal-data'>
            <h2 className='text-primary m-3 text-center'>Données personnelles</h2>
            <div className='container-fluid'>
                 <hr/><br/>
                <div className='row d-flex justify-content-center'>
                    <div className='col-md-7'>
                        <div className='text-center'>
                            {toggleData == false && 
                                <>
                                    <div className="card">
                                        <div className="card-body">
                                            <p className='text-center'>{data.firstname + ' ' + data.lastname}</p>
                                        </div>
                                    </div>
                                    <br/>
                                    <button onClick={()=>handleData()} className='btn-primary text-center'>Modifier le nom et prenom</button>
                                </>
                            }
                            {toggleData && <InputFirstLastName token={token} func={handleData} />}
                        </div>
                    </div>
                </div>
                <br/>
                <div className='row d-flex justify-content-center'>
                    <div className='col-md-7'>
                        <div className='text-center'>
                            {togglePassword == false && 
                                <>
                                    <div className="card">
                                        <div className="card-body">
                                            <p className='text-center'>*************</p>
                                        </div>
                                    </div>
                                    <br/>
                                    <button onClick={()=>handlePassword()} className='btn-primary text-center'>Changer le mot de passe</button>
                                </>
                            }
                            {togglePassword && <InputPassword token={token} func={handlePassword} />}
                        </div>
                    </div>
                </div>
                <br/>
                <div className='row d-flex justify-content-center'>
                        <div className='col-md-7 '>
                            <div className='text-center'>
                                {toggleEmail == false && 
                                    <>
                                        <div className="card">
                                            <div className="card-body">
                                                <p className='text-center'>{data.email}</p>
                                            </div>
                                        </div>
                                        <br/>
                                        <button onClick={()=>handleEmail()} className='btn-primary text-center'>Changer l'adresse email</button>
                                    </>
                                }
                                {toggleEmail && <InputEmail token={token} func={handleEmail} />}
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default PersonalData;