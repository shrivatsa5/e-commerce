import React from 'react'
import Grid from '@material-ui/core/Grid';
import useStyles from "./styles"

import Product from "./Product/Product"



const Products=({products, onAddTocart})=>{
   // console.log("hi")
    //console.log(products)
    const classes=useStyles()
    return(
    <main className={classes.content}>
    <div className={classes.toolbar}/>
        <Grid container justify="center" spacing={5}>
        {products.map((product)=>(
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={ onAddTocart}/>
            </Grid>
        ))}
     
      </Grid>
    </main>);
}

export default Products;