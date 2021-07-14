import React,{useState} from 'react'
import {Form,Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { cartShippingAddress } from '../actions/cartAction'
import CheckOutSteps from '../Component/CheckOutSteps'
import FormContainer from '../Component/FormContainer'



const ShippingScreen = ({history}) => {

    const dispatch=useDispatch()
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)


    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(cartShippingAddress({address,city,postalCode,country}))
        history.push('/payment')
    }
    return (
        <FormContainer>
                <CheckOutSteps step1 step2/>
            <h1>SHIPPING</h1>
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type='text' value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Enter Address"></Form.Control>
            </Form.Group>
            <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control type='text' value={city} onChange={(e)=>setCity(e.target.value)} placeholder="Enter City"></Form.Control>
            </Form.Group>
            <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control type='text' value={postalCode} onChange={(e)=>setPostalCode(e.target.value)} placeholder="Enter Postal Code"></Form.Control>
            </Form.Group>
            <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control type='text' value={country} onChange={(e)=>setCountry(e.target.value)} placeholder="Enter Country"></Form.Control>
            </Form.Group>
            <Button type="submit" variant="dark" >
                    CONTINUE
            </Button>

            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
