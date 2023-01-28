import React, { createContext, useState } from 'react'

export const Appcontext=createContext()

const AppcontextProvider = ({children}) => {
const [cartData,setCartData]=useState([])
const[productData,setProductData]=useState([])

const[loading,setLoading]=useState(false)
 // for getting data from api GET Request 
async function getData() {
  try {
   setLoading(true)
   
   
    const response = await fetch('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json');
    const data = await response.json();
    console.log(data);
    setLoading(false)
    setProductData(data)
  } catch (error) {
    console.error('Error:', error);
    setLoading(false)
  } finally {
    
    setLoading(false)
  }
}
  return (
    <Appcontext.Provider value={{cartData,setCartData,getData,productData,loading,
      setLoading,
      setProductData}}>
      {children}
    </Appcontext.Provider>
  )
}

export default AppcontextProvider
