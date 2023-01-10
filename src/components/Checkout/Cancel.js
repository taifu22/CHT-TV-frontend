
import React, { useEffect} from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import DataOrder from '../../lib/service/serviceOrder';

const styles = {
  height: '100vh',
  fontSize: 20
}
function Cancel() {

  const token = useSelector(state => ({...state.user.token}))
  
  useEffect(()=>{
    redirectHome();
  },[])

  const navigate = useNavigate();
  function redirectHome() {
    DataOrder.deleteNewOrder(token.accessToken);
    setTimeout(()=>{
      navigate('/');
    }, 3000)
  }

  return (
    <>
      <div style={styles} className='d-flex justify-content-center align-items-center'>
          <div className="alert alert-warning mt-3 mb-3">
            <p className="icontext"><i className="icon text-cancel fa fa-thumbs-up"></i>You will redirected in a few seconds ...</p>
        </div>
      </div>
    </>
  );
}
export default Cancel 