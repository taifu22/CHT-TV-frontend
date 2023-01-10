import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { returnProductsArrays } from "../../lib/service/service";
import { getProductsSuccess } from "../../lib/state/features/products.slice";
import { deleteDataUser } from '../../lib/state/features/user.slice';
import { fetchProducts } from "../../lib/service/service";

const Nav = (props) => {

  const [valueInput, setValueInput] = useState("");
  const {items} = useSelector((state) => ({...state.cart}));
  const products = useSelector(state => ({...state.products}))
	const quantity = items.length > 0 ? items.length : '';
  const productsSorted = []
  let image;

  useEffect(() => { 
    console.log(valueInput.length);
    //console.log(productTotal);
    products.items.map(item => {
      item.map(item1 => {
        if (item1.name.toLowerCase().includes(valueInput)) {
          productsSorted.push(item1)
        }
      })
    })
    if (valueInput.length === 0 && valueInput === "") {
      fetchProducts();
      //dispatch(getProductsSuccess(productTotal[0]));
    } else {
      const productsArrayPagination = returnProductsArrays(productsSorted);
      dispatch(getProductsSuccess(productsArrayPagination));
    }
    //const productsArrayPagination = returnProductsArrays(productsSorted);
      //dispatch(getProductsSuccess(productsArrayPagination));
    //console.log(products.items);
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
      dispatch(deleteDataUser());
      naviagte('/'); 
  }

  //function to sorted gallery products with the value of input
  function onChangeInput(e) {
    setValueInput(e.target.value.toLowerCase())
  }

  const links = ["Home", "About"];
  return (
    <nav className={"navbar navbar-expand-lg navbar-dark bg-primary"}>
      <Link className="navbar-brand" to={"/"}>
        <b>CHT-TV-Marketplace</b>
      </Link>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse " id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto menu">
          {links.map((link) => {
            return (
              <li className="mr-4" key={link} onClick={() => {}}>
                <Link to={`/${link == "Home" ? "" : link}`}>{link}</Link>
              </li>
            );
          })}
        </ul>
        <div className="input-group-prepend mr-3">
          <div className="form-outline">
            <input onChange={e => onChangeInput(e)} value={valueInput} id="search-focus" type="search" placeholder="search" className="form-control" />
          </div>
          <button type="button" className="btn btn-primary">
            <i className="fas fa-search"></i>
          </button>
        </div>
        {data ? <><Link to={'/cart'} className="nav-link"><i className="text-light fas fa-xl fa-shopping-cart"></i></Link><span style={{marginLeft:'-10px'}} className="badge badge-danger mr-2 mb-3">{quantity}</span></> : ""}
        <div className="dropdown">
          <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {!!data ? <img className='img-profil rounded-circle' src={image}/> : <i class="fas fa-user mx-1"></i>}{!!data ? <span><b>Hi, {data.firstname.charAt(0).toUpperCase() + data.firstname.slice(1)}</b></span> : 'My account'} 
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {!!data ? 
              <>
                <a class="dropdown-item" href="#"><Link to={'/pageprofile'}>Settings</Link></a>
                <a class="dropdown-item" href="#" onClick={() => LogOutHandle()}><Link to={'/pageprofile'}>LogOut</Link></a>
              </> :
              <>
                <a class="dropdown-item" href="#"><Link to={'/register'}>Register</Link></a>
                <a class="dropdown-item" href="#"><Link to={'/login'}>Login</Link></a>
              </>
            }
          </div>
        </div> 
      </div>
    </nav>
  );
};
export default Nav;
