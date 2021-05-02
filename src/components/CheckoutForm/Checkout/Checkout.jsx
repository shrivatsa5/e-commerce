import React ,{useState,useEffect} from "react"
import {Paper, Step,StepLabel,Typography,CircularProgress, Divider ,Button ,Stepper,CssBaseline} from "@material-ui/core"
import useStyles from "./styles"
import AddressForm from "../AddressForm"
import PaymentForm from "../PaymentForm"
import {commerce } from "../../../lib/commerce"
import {Link, useHistory} from "react-router-dom"

const Checkout=({cart, order, error, onCaptureCheckout})=>{
    const classes=useStyles();
    const [activeStep,setActiveStep]=useState(0)
    const steps=[' Shipping Address ','Payment']
    const history=useHistory()
    const [checkoutToken,setcheckoutToken]=useState(null)
    const [shippingData, setshippingData]=useState({})
    const[finished, setFinished]=useState(false)


useEffect(()=>{
    
    const generateToken=async()=>{
        try {
            const token=await commerce.checkout.generateToken(cart.id,{type:'cart'})
            setcheckoutToken(token)
            console.log(token)

            
        } catch (error) {
            if (activeStep !== steps.length) history.push('/');           
        }

    }

    generateToken();
},[cart])


const timeout=()=>{
    setTimeout(()=>{
        setFinished(true)

    },2000)
}
    let Confirmation=()=> 
        
        
        (order.customer?
        
            (
                
            <>
            <div>
            
             <Typography variant="h5">Thank You for you purchase, {order.customer.firstname} {order.customer.lastname}</Typography>  
             <Divider/>
             <Typography>order ref :{order.customer_reference}</Typography>
            </div>
            <br/>
            <Button component={Link} to="/" variant="outlined" type="button">Back to home</Button>

            
            </>
        ):finished?(
            <>
            <div>
            
             <Typography variant="h5">Thank You for you purchase</Typography>  
             <Divider/>
            
            </div>
            <br/>
            <Button component={Link} to="/" variant="outlined" type="button">Back to home</Button>

            
            </>

        ):
         (
            <div className={classes.spinner}>
            <CircularProgress/>
            </div>
        )
        )

        /*if(error)
        {
            Confirmation=()=>(
            <>
            <Typography>Error:{error}</Typography>
            <Button component={Link} to="/" variant="outlined" type="button">Back to home</Button>

            </>
            )
        }
    */

    const nextStep=()=>{
        setActiveStep((prevStep)=>prevStep+1)
    }

    const backStep=()=>{
        setActiveStep((prevStep)=>prevStep-1)
    }

    const next=(data)=>{
        setshippingData(data);
        nextStep()

    }

    const Form=()=>(
        activeStep===0?<AddressForm checkoutToken={checkoutToken}  next={next}/>:<PaymentForm 
        nextStep={nextStep}
        backStep={backStep}
         onCaptureCheckout={onCaptureCheckout} checkoutToken={checkoutToken}
         shippingData={shippingData}
         timeout={timeout}
         />
    )
    return(
        <>
        <CssBaseline/>
        <div className={classes.toolbar}/>
        <main className={classes.layout}>
        <Paper>
            <Typography variant="h4"> Checkout</Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step)=>(
                <Step key={step}>
                    <StepLabel>{step}</StepLabel>
                </Step>

            ))}

            </Stepper>
            {activeStep===steps.length ?<Confirmation/>:checkoutToken&& <Form/>}
        </Paper>

      </main>
        
        </>
    )

}
export default Checkout