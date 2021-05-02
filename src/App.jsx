import React, { useEffect, useState } from 'react'
import {Products ,Navbar,Checkout} from "./components"
import Cart from './components/Cart/Cart';
import {commerce} from './lib/commerce'

import {BrowserRouter as Router, Switch ,Route} from 'react-router-dom'


const App=()=>{
    
const [products,setProducts]=useState([]);
const[cart,setCart]=useState({})
const[order,setOrder]=useState({})
const[errorMsg,seterrorMsg]=useState('')
const getProducts=async()=> {
    const {data}=await commerce.products.list();
    //console.log(data)
    setProducts(data);

    
}
const getCart=async()=>{
    setCart(await commerce.cart.retrieve())
    
}
const handleUpdate=async(productId,quantity)=>
{
    console.log("here")
        const {cart}=await commerce.cart.update(productId,{quantity})
        setCart(cart);
}

const handleRemove=async(productId)=>{
    const {cart}=await commerce .cart.remove(productId);
    setCart(cart);
}

const handleEmptyCart=async()=>{
    const {cart}=await commerce.cart.empty();
    setCart(cart);
}
 

const refreshCart=async()=>{
    console.log("calling refresh")
const newCart=await commerce.cart.refresh();
setCart(newCart)
}
const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
        console.log("error here lol")
      seterrorMsg(error.data.error.message);
    }
  };

    


useEffect(()=>{
    getProducts();
    getCart()
},[])

   

const handleAddToCart=async(productId, qty)=>
{
    const item=await commerce.cart.add(productId,qty);
    setCart(item.cart)
    console.log(item)


}




    return (
        <Router>
        <div>
            <Navbar totalItems={cart.total_items}/>
            <Switch>
                <Route exact path='/'>
                    <Products products={products} onAddTocart={handleAddToCart}/>
                </Route>
                <Route exact path='/cart'>
                <Cart cart={cart}
                handleUpdate={handleUpdate}
                handleRemove={handleRemove}
                handleEmptyCart={handleEmptyCart}             
                    
                />
                </Route>
                <Route exact path='/checkout'>
                <Checkout
                order={order}
                error={errorMsg}
                onCaptureCheckout={handleCaptureCheckout}
                 cart={cart}/>

                </Route>
            </Switch>
           
         
        </div>

        </Router>
        
    )
}
export default App

