import React from 'react'
import Style from "./style.module.css"
import { NavLink, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { SET_PROFILE } from 'featurns/authentication/utils/action';
function Header() {
  const history = useHistory();
  const userProfile = useSelector((state) => state.auth.profile);
  const dispatch =useDispatch();
  const goToHome = () => {
    history.push("/")
  }
  const handleLogOut=(e)=>{
    e.preventDefault();
    localStorage.removeItem("token")
    dispatch({
      type:SET_PROFILE,
      payload:null,
    })
    goToHome();
  }
  const rederUserInfo = () => {
    if (userProfile) {
      return (
        <>
          <a href='#'>Hi, {userProfile.hoTen}</a>
          <a href="#" onClick={handleLogOut}>Log Out</a>
        </>
      )
    }
    return (
      <>
        <NavLink activeClassName={Style.active} to="signin">Sign In</NavLink>
        <NavLink activeClassName={Style.active} to="signup">Sign Up</NavLink>
      </>
    )
  }
  return (
    <div className={Style.header}>
      <span onClick={goToHome} to="/" className={Style.logo}>Movie</span>
      <nav className={Style.nabar}>
        <NavLink exact activeClassName={Style.active} to="/">Home</NavLink>
        <NavLink activeClassName={Style.active} to="/movies">Movies</NavLink>
        {rederUserInfo()}
      </nav>
    </div>
  )
}

export default Header