import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Button,Row,Col,Card, ListGroup,Image} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import CheckOutSteps from '../Component/CheckOutSteps'
import Message from '../Component/Message'
import {createOrder} from '../actions/orderAction'



const PlaceOrderScreen = ({history}) => {
    const cart = useSelector(state => state.cart)

    const orderCreate = useSelector(state => state.orderCreate)
    const {success,error,order}=orderCreate

    useEffect(() => {
        
        if(success){
            history.push(`order/${order._id}`)
        }
        // eslint-disable-next-line
    }, [history,success])

    const dispatch=useDispatch()

    const decimal = (num)=>{
        return (Math.round(num*100)/100).toFixed(2)
    }
    cart.itemsPrice = decimal(cart.cartItems.reduce((acc,item)=>acc+item.qty*item.price,0))
    cart.shippingPrice = decimal(cart.itemsPrice > 100 ? 0:100)
    cart.taxPrice = decimal(Number((0.15*cart.itemsPrice).toFixed(2)))
    cart.totalPrice =(Number(cart.itemsPrice)+Number(cart.shippingPrice)+Number(cart.taxPrice)).toFixed(2)

    const placeOrderHandler = ()=>{
        dispatch(createOrder({
            orderItems:cart.cartItems,
            shippingAddress:cart.shippingAddress,
            paymentMethod:cart.paymentMethod,
            taxPrice:cart.taxPrice,
            shippingPrice:cart.shippingPrice,
            totalPrice:cart.totalPrice,
            itemPrice:cart.itemsPrice
        }))
    }
    return (
        <>
        <CheckOutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address:</strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.portalCode}, {cart.shippingAddress.country}</p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method:</strong>
                                {cart.paymentMethod}</p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length===0?(<Message variant="danger">Your Cart Is Empty</Message>):(
                                <ListGroup variant='flush'>
                                {cart.cartItems.map((item,index)=>(
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>
                                            <Col >
                                                <Link to={`/product/${item.product}`} className="clrunset">{item.name}</Link>
                                            </Col>
                                            <Col md={4}>{item.qty} x ${item.price} = ${item.price * item.qty}</Col>
                                            
                                        </Row>
        
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            )}
                        </ListGroup.Item>

                        
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                    <h2>Order Summary</h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Items</Col>
                                            <Col>${cart.itemsPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping</Col>
                                            <Col>${cart.shippingPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax</Col>
                                            <Col>${cart.taxPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total</Col>
                                            <Col>${cart.totalPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    
                                        {error&&
                                        <ListGroup.Item>
                                        <Message variant='danger'>{error}</Message>
                                        </ListGroup.Item>
                                        }
                                    
                                    <ListGroup.Item>
                                        <Button type='button' className='btn-block' variant='dark' onClick={placeOrderHandler} disabled={cart.cartItems===0}>
                                            Place Order
                                        </Button>
                                    </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>    
            </Row>   
        </>
    )
}

export default PlaceOrderScreen
