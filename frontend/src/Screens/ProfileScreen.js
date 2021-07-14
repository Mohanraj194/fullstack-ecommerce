import React,{useState,useEffect} from 'react'
import {Form,Button,Row,Col, Table} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../Component/Message'
import Loader from '../Component/Loader'
import {getUserDetails, updateUserProfile} from '../actions/userAction'
import {listMyOrders} from '../actions/orderAction'
import { LinkContainer } from 'react-router-bootstrap'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = ({history}) => {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [message,setMessage]=useState('')

   
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userDetails = useSelector(state => state.userDetails)
    const {loading,error,user} = userDetails

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    const orderMyList = useSelector(state => state.orderMyList)
    const {loading:loadingOrder,error:errorOrder,orders} = orderMyList

    const submitHandler=(e)=>{
        e.preventDefault()
        if(password !==confirmPassword){
            setMessage('Password Do Not Match ')
        }
        else{
            dispatch(updateUserProfile({id:user._id,name,email,password}))
        }
    }

    useEffect(() => {
       if(!userInfo){
           history.push('/login')
       }
       else{
           
        if(!user || !user.name || success)
        {
            dispatch({type:USER_UPDATE_PROFILE_RESET})
            dispatch(getUserDetails('profile'))
            dispatch(listMyOrders())
        }
        else{
             setName(user.name)
             setEmail(user.email)
             
         }
        }
         // eslint-disable-next-line
    }, [dispatch,userInfo,user,success])

    return (
        <Row>
            <Col md={3}>
            <h1>USER PROFILE</h1>
            {message&&<Message variant='danger'> {message}</Message>}
            {success&&<Message variant='success'>Profile Updated</Message>}
            {error&&<Message variant='danger'> {error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name"></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password </Form.Label>
                    <Form.Control type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password"></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password </Form.Label>
                    <Form.Control type='password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Confirm Password"></Form.Control>
                </Form.Group>
                <Button type="submit" variant="dark" >
                    Update
                </Button>
            </Form>

            </Col>
            <Col md={9}>
            <h1>MY ORDERS</h1>
            {loadingOrder ? <Loader/>:errorOrder ? <Message variant="danger">{errorOrder}</Message>:(
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>DETAILS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order=>(
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid? order.paidAt.substring(0,10):(<i className='fas fa-times' style={{color:'red'}}></i>)}</td>
                                <td>{order.isDelivered? order.deliveredAt.substring(0,10):(<i className='fas fa-times' style={{color:'red'}}></i>)}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className='btn-sm' variant='dark'>Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            </Col>
        </Row>
    )
}

export default ProfileScreen
