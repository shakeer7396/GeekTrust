import React, { useContext } from 'react'
import { Appcontext } from '../../context/Appcontext'
import styles from '../Navbar/Navbar.module.css'
import { HiOutlineShoppingBag } from "react-icons/hi";
import logo from '../Navbar/images/logo.jfif'
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const Navigate=useNavigate()
  const{cartData}=useContext(Appcontext)
  return (
    <div className={styles.navbar}>
      <div style={{cursor:"pointer"}} onClick={()=>Navigate('/')} className={styles.image}><img src={logo} alt='err' /></div>
      <div><h1>TEEREX-STORE</h1></div>
      <div style={{display:"flex"}}>
      <HiOutlineShoppingBag onClick={()=>Navigate("/cart")} cursor={'pointer'}  size={'1.5rem'} /><span
        className={styles.count}>{cartData?.length}</span></div>
    </div>
  )
}

export default Navbar
