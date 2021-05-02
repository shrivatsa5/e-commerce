import React from "react"
import { Card, CardMedia, CardContent,CardActions,Typography,IconButton, Button } from '@material-ui/core';
import useStyles from "./styles"


const CartItem=({item,onRemove,  onUpdate})=>{
    const classes=useStyles();
    return(
        <div>
            <Card>
                    <CardMedia image={item.media.source} className={classes.media}/>
                    <CardContent className={classes.cardContent}>
                        <Typography variant="h5"> {item.name}</Typography>
                        <Typography variant="h5"> {item.line_total.formatted_with_symbol}</Typography>
                    </CardContent>
                    <CardActions className={classes.cartActions}>
                        <div className={classes.buttons}>
                         <Button onClick={()=>onUpdate(item.id,(item.quantity)-1)} type="button" size="small">-</Button>
                         <Typography>{item.quantity}</Typography>
                         <Button onClick={()=>onUpdate(item.id,item.quantity+1)} type="button" size="small">+</Button>

                        </div>
                        <Button  onClick={()=>onRemove(item.id)} size="small" color="secondary"> Remove</Button>
                       
                    </CardActions>

                   
            </Card>
        </div>

    )
}
export default CartItem