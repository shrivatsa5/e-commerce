import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import logo from "../../assets/favicon.png"
import {Link,useLocation} from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  image:{
      marginRight:'10px',
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',},
}));

export default function Navbar({totalItems}) {
  const classes = useStyles();
  const location=useLocation()

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          
          
         
          <Typography    variant="h6" className={classes.title}>
            <img src={logo} alt="as" height="25px" className={classes.image}/>
             <Link className={classes.link}  to="/">E-Commerce</Link> 
          </Typography>
          {location.pathname==="/" &&(
          <div>
            <IconButton   component={Link} to="/cart">
            <Badge badgeContent={totalItems} color="secondary">
            
            <ShoppingCartIcon/>
            </Badge>         
          
            </IconButton>
          </div>)}
        </Toolbar>
        

      </AppBar>
    </div>
  );
}
