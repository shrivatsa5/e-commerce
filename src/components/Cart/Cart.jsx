
import { Button, Container } from '@material-ui/core';
import React from 'react';
import useStyles from "./styles"
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CartItem from "./CartItem/Cartitem"
import {Link} from "react-router-dom"

const Cart=({cart, handleUpdate, handleRemove,handleEmptyCart})=>{
    const classes=useStyles()
    
    const EmptyCart=()=>{
        return (
            <div>
                <Typography variant="h2">
                YOur cart is empty,
                <Link to="/"> Add some itemsS </Link>
                </Typography>
            </div>
        )

    }
    const FilledCart=()=>{
       
        return(
        <div>
        <Grid container spacing={3}>
       { cart.line_items.map((item )=>(
           <Grid item xs={12} sm={4} md={4} lg={3} key={item.id}>
                <div><CartItem item={item}
                    onUpdate={handleUpdate}
                    onRemove={handleRemove}
                    
                /></div>
           </Grid>
        ))}
        </Grid>

        <div  className={classes.cardDetails}>
            <Typography variant="h3" > Subtotal: {cart. subtotal.formatted_with_symbol}</Typography>
            <div>
                <Button onClick={handleEmptyCart} className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary">Empty Cart</Button>
                <Button component={Link} to="/checkout" className={classes.checkout } size="large" type="button" variant="contained" color="primary">Checkout</Button>
            </div>
        </div>
        
        </div>
)}

if(!cart.line_items)
return "Loading ..."
return(
        <Container>
        <Typography className={classes.title} gutterBottom variant="h3">Your Cart</Typography>
        {!cart.line_items.length?<EmptyCart/>:<FilledCart/>}
    </Container>)
      
 
    

}
export default Cart