import React, { useContext, useEffect, useState } from 'react'
import { Appcontext } from '../../context/Appcontext'
import styles from '../cartPage/CartPage.module.css'
import emptycart from '../../components/Navbar/images/empty_bag.gif'
import { useNavigate } from 'react-router-dom'
const CartPage = () => {
  const {cartData,setCartData,productData}=useContext(Appcontext)
  
const [totalPrice,setTotalprice]=useState(0)
const Navigate=useNavigate()

// for deleting data
  const handleDelete=(id)=>{
    const choice = window.confirm("Are you sure you want to delete?");
    if(choice){
      const filterData=cartData.filter((el)=>el.id!=id)

      setCartData(filterData);
      alert("Product Deleted Successfully")
    }
   
  }
  // for total price 
  useEffect(()=>{
    let total_price=cartData?.reduce((acc,el)=>acc+el.quantity*el.price,0)
    setTotalprice(total_price)
  },[cartData])


// for increase qty 
  const increaseQty = (item) => {
    const product = productData.find(p => p.id === item.id);
    if (item.quantity < product.quantity) {
      const updatedCartData = [...cartData];
      updatedCartData.map((el) => {
        if (el.id === item.id) {
          el.quantity += 1;
        }
      });
      setCartData(updatedCartData);
    } else {
      alert(`Only ${product.quantity} items available.`);
    }
  };

  // for decrease qty 
  const decreaseQty = (item) => {
    const product = productData.find(p => p.id === item.id);
    if (item.quantity > 1 && item.quantity <= product.quantity) {
      const updatedCartData = [...cartData];
      updatedCartData.map((el) => {
        if (el.id === item.id) {
          el.quantity -= 1;
        }
      });
      setCartData(updatedCartData);
    } else {
      alert("Quantity can't be less than 1");
    }
  };
     
  if(cartData.length==0){
    return(
      <div className={styles.empty_cart}>Cart Is Empty <button onClick={()=>Navigate("/")}>Shop Now</button><img src={emptycart}/></div>
    )
  }
  return (
    <div className={styles.main_div} >
    <div className={styles.heading} ><p>Shopping Cart</p></div>
    {cartData?.map((el,i)=>(
      <div key={i} className={styles.product_div}>
        <img width={'70px'} src={el.imageURL} alt='err'/>
        <div className={styles.price}>
          <p>{el.name}</p>
          <h4> ₹ {+el.price}</h4>
        </div>
      <div><button  onClick={()=>decreaseQty(el)}>-</button><button onClick={()=>increaseQty(el)}>+</button>{+el.quantity}</div>
        <button onClick={()=>handleDelete(el.id)}>Remove</button>
      </div>
        
       
    ))}
   <hr/>
    <div className={styles.total_amount}><p>Total Amount</p> <p>₹ {totalPrice}</p></div>
    </div>
  )
}

export default CartPage
