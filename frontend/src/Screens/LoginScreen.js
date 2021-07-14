import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../Component/Message'
import FormContainer from '../Component/FormContainer'
import Loader from '../Component/Loader'
import {login} from '../actions/userAction'
const LoginScreen = ({location , history}) => {
    const [email,setEmail]=useState('')
    const [password, setPassword] = useState('')

    const redirect = location.search ? location.search.split('=')[1]:'/'
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {loading,error,userInfo} = userLogin

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(login(email,password))
    }

    useEffect(() => {
       if(userInfo){
           history.push(redirect)
       }
        // eslint-disable-next-line
    }, [dispatch,userInfo,redirect])

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error&&<Message variant='danger'> {error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password </Form.Label>
                    <Form.Control type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password"></Form.Control>
                </Form.Group>
                <Button type="submit" variant="dark" >
                    Sign In
                </Button>
            </Form>

            <Row className="py-3">
                <Col >
                New Customer ? <Link to={redirect ? `/register?redurect=${redirect}`:'/register'} className="clrunset">
                <b>Register</b>
                </Link>
                </Col>
            </Row>
            
        </FormContainer>
    )
}

export default LoginScreen
