import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../Component/Message'
import FormContainer from '../Component/FormContainer'
import Loader from '../Component/Loader'
import {register} from '../actions/userAction'
const RegisterScreen = ({location , history}) => {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [message,setMessage]=useState('')

    const redirect = location.search ? location.search.split('=')[1]:'/'
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const {loading,error,userInfo} = userRegister

    const submitHandler=(e)=>{
        e.preventDefault()
        if(password !==confirmPassword){
            setMessage('Password Do Not Match ')
        }
        else{
            dispatch(register(name,email,password))
        }
    }

    useEffect(() => {
       if(userInfo){
           history.push(redirect)
       }
        // eslint-disable-next-line
    }, [dispatch,userInfo,redirect])

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message&&<Message variant='danger'> {message}</Message>}
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
                    Register
                </Button>
            </Form>

            <Row className="py-3">
                <Col >
                Have An Account ? <Link to={redirect ? `/login?redurect=${redirect}`:'/login'} className="clrunset">
                <b>login</b>
                </Link>
                </Col>
            </Row>
            
        </FormContainer>
    )
}

export default RegisterScreen
