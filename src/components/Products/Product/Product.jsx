
import React from 'react'

import { Card, CardMedia, CardContent,CardActions,Typography,IconButton } from '@material-ui/core';
import {AddShoppingCart} from '@material-ui/icons'

import useStyles from './styles'

const Product=({product,onAddToCart})=>{
//console.log(product)



    const classes=useStyles()
    return(
        <div>
            <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.media.source} title={product.name}/>
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom></Typography>
                    {product.name}
                    <Typography variant="h5"></Typography>
                    {product.price.formatted_with_symbol}
                </div>
                <Typography dangerouslySetInnerHTML={{__html:product.description}} variant="body2" color="textSecondary" /> 
            </CardContent>
            <CardActions disableSpacing  className={classes.cardActions}>
                <IconButton onClick={()=>onAddToCart(product.id,1)}>
                    <AddShoppingCart/>
                </IconButton>
            </CardActions>

            </Card>
        </div>
    )
}
export default Product