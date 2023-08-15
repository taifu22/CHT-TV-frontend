import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { returnProductsArrays } from "../../lib/service/service";
import { getProductsSuccess } from "../../lib/state/features/products.slice";
import { deleteDataUser } from '../../lib/state/features/user.slice';
import { getProducts } from "../../lib/service/service";
import useWindowSize from '../../lib/hooks/useScreenSize';
import { setLogOutDeleteCodesPromo } from "../../lib/state/features/PromosCode.slice";
import { checkOut } from "../../lib/state/features/cart.slice";

const Nav = () => {

  const [valueInput, setValueInput] = useState("");
  const {items} = useSelector((state) => ({...state.cart}));
  const products = useSelector(state => ({...state.products}))
  const user = useSelector(state => state.user.users)
	const quantity = items.length > 0 ? items.length : '';
  //if we have a new message received unread, then we will display in new red in the envelope 
  const newMessages = useSelector(state => {
    if (state.user.users !== null && state.user.users.body.newMessage === true) {
      return 'new'
    }  else {
      return ''
    } 
  })  

  //variable for store the product sorted with reacrh input
  const productsSorted = []
  let image; 

  //in this useEffect we sort the store redux of produits by ration of input's value
  useEffect(() => { 
    products.items.map(item => {
      item.map(item1 => {
        if (item1.name.toLowerCase().includes(valueInput)) {
          productsSorted.push(item1)
        }
      })
    })
    if (valueInput.length === 0 && valueInput === "") {
      getProducts()
      .then((response) => returnProductsArrays(response.data.data))
      .then((productData) => dispatch(getProductsSuccess(productData)))
    } else {
      const productsArrayPagination = returnProductsArrays(productsSorted);
      dispatch(getProductsSuccess(productsArrayPagination));
    }
  },[valueInput])

  //Data recovery from the redux store (user information and token)
  const data = useSelector((state) => { 
    if (state.user.users == null || state.user.users == undefined) {
        return null
    } else {
        //recovery from store redux the profil'image in a variable 
        if (state.user.users.body['image'] !== undefined) {
          image = 'http://localhost:4000/uploads/imagesUsersProfil/' + state.user.users.body.image.img.data;
        } else {
          //si y a pas la key image dans le body on affiche une image profil user par défaut
          image = './images/avatars/avatar3.jpg'
        }
        return state.user.users.body
    }
  })

  const naviagte = useNavigate(); 
  const dispatch = useDispatch();

	//function to logOut the user, and redirect him, to the home page
	function LogOutHandle() {
      //userdata ans promosCodesData is deleted from redux store
      dispatch(setLogOutDeleteCodesPromo());
      dispatch(deleteDataUser());
      dispatch(checkOut());
      naviagte('/'); 
  }

  //function to sorted gallery products with the value of input
  function onChangeInput(e) {
    setValueInput(e.target.value.toLowerCase())
  }
  function onClickButton(params) {
    /*si on click sur le button de research car on est pas dans la page home, on sera redirectionné vers /Home donc la racine du projet
    et on aura un state dans le location, du coup on va afficher directement nos produits rechercé (voir /Home)*/
    return naviagte('/', {state:{state: true}}); 
  }

  const screenWidth = useWindowSize().width;

  const links = [
                  {name:"Home", icon: "fa-solid fa-house"}, 
                  {name:"About", icon: "fa-solid fa-info"}, 
                  {name:"Contact", icon: "fa-solid fa-address-card"}
                ];
  return (
    <nav className={"navbar navbar-expand navbar-dark bg-primary nav-header pb-0"}>
      {screenWidth > 800 ? <Link className="navbar-brand" to={"/"}>
        {/* <b>CHT-TV-Market</b> */}
        <img style={{height:'40px', margin:0}} src="/CHT-TV-removebg-preview.png"></img>
      </Link> : ""}
      <div className="navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto menu">
          {links.map((link) => {
            return (
              <li className={"mr-4"} key={link.name} onClick={() => {}}>
                <i className={screenWidth < 800 ? link.icon : ""}></i>
                <Link to={`/${link.name == "Home" ? "" : link.name}`}>{link.name}</Link>
              </li>
            );
          })}
        </ul>
        { screenWidth > 600 ? <div className="input-group-prepend input-responsive mr-3">
          <div className="form-outline">
            <input onChange={e => onChangeInput(e)} value={valueInput} id="search-focus" type="search" placeholder="search" className="form-control" />
          </div>
          <button onClick={()=>onClickButton()} type="button" className="btn text-light">
            <i className="fas fa-search"></i>
          </button>
        </div> : ""}
          {user !== null ? <div className={screenWidth < 600 ? "navlink-messages nav-link d-flex text-light" : "nav-link-messages-xl"}><Link to={user.body.role === 'admin' ? '/dashboardAdmin/messaging' : 'pageprofil/messaging'}><i className="text-light fas fa-xl fa-solid fa-envelope"></i>{screenWidth < 600 ?<p className="text-light">Messages</p> : ""}</Link><span style={{marginLeft:'-15px' , marginTop:'-10px' }} className="badge badge-danger mr-2 mb-3">{newMessages}</span></div> : ""}
        <div className="panier-div d-flex flex-column justify-content-center align-items-center">
          {<div className="d-flex"><Link to={'/cart'} className="nav-link"><i className="text-light fas fa-xl fa-shopping-cart"></i></Link><span style={{marginLeft:'-10px'}} className="badge badge-danger mr-2 mb-4">{quantity}</span></div>}
          { screenWidth < 600 ? <p>Panier</p> : ""}
        </div>   
        <div className="dropdown">
          { screenWidth > 600 ? <button className="btn text-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {!!data ? <img className='img-profil rounded-circle' src={image}/> : <i className="fas fa-user mx-1"></i>}{!!data ? <span><b>Hi, {data.firstname.charAt(0).toUpperCase() + data.firstname.slice(1)}</b></span> : 'My account'} 
          </button> : <button className="btn text-light dropdown-toggle d-flex flex-column justify-content-center align-items-center" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {!!data ? <img className='img-profil rounded-circle' src={image}/> : <i className="icon-reponsive fas fa-user mx-1"></i>}{!!data ? <span><b>Hi, {data.firstname.charAt(0).toUpperCase() + data.firstname.slice(1)}</b></span> : <span>My account</span>} 
          </button> }
          <div className="dropdown-menu drop-menu-responvive" aria-labelledby="dropdownMenuButton">
            {!!data ? 
              <>
                <a className="dropdown-item" href="#"><Link to={data.role === 'admin' ? '/dashboardAdmin' :'/pageprofil'}>{data.role === 'admin' ? 'DashBoard' : 'Settings'}</Link></a>
                <a className="dropdown-item" href="#"><Link to={user.body.role === 'admin' ? '/dashboardAdmin/favoris' : 'pageprofil/favoris'}>Favoris</Link></a>
                <a className="dropdown-item" href="#" onClick={() => LogOutHandle()}><Link to={'/pageprofil'}>LogOut</Link></a>
              </> :
              <>
                <a className="dropdown-item" href="#"><Link to={'/register'}>Register</Link></a>
                <a className="dropdown-item" href="#"><Link to={'/login'}>Login</Link></a> 
              </>
            }
          </div>
        </div> 
      </div> 
    </nav>
  );
};
export default Nav;
