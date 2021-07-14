import React,{useState} from 'react'
import {Form,Button,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { savePaymentMethod } from '../actions/cartAction'
import CheckOutSteps from '../Component/CheckOutSteps'
import FormContainer from '../Component/FormContainer'



const PaymentScreen = ({history}) => {

    const dispatch=useDispatch()
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    if(!shippingAddress)
    { 
        history.push('/shipping')
    }
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    


    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
    return (
        <FormContainer>
                <CheckOutSteps step1 step2 step3/>
            <h1>PAYMENT METHOD</h1>
            <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                <Form.Check type='radio' id='PayPal' label='PayPal or Credit Card' name="paymentMethod" value='PayPal' onChange={(e)=>setPaymentMethod(e.target.value)} checked></Form.Check>
                {/* <Form.Check type='radio' id='PayPal' label='Stripe' name="paymentMethod" value='Stripe' onChange={(e)=>setPaymentMethod(e.target.value)} ></Form.Check> */}
                </Col>
            </Form.Group>
            <Button type="submit" variant="dark" >
                    CONTINUE
            </Button>

            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
