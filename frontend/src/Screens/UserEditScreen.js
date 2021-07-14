import React,{useState,useEffect} from 'react'
import {Form,Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../Component/Message'
import FormContainer from '../Component/FormContainer'
import Loader from '../Component/Loader'
import {getUserDetails,updateUser} from '../actions/userAction'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({history,match}) => {
    const userId = match.params.id
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    

    
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading,error,user} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {loading:loadingUpdate,error:errorUpdate,success:successUpadate} = userUpdate

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(updateUser({_id:userId,name,email,isAdmin}))
    }

    useEffect(() => {
       if(successUpadate){
        dispatch({type:USER_UPDATE_RESET})
        history.push('/admin/userlist')
       }
       else{
        if(!user || user._id !== userId){
            
            dispatch(getUserDetails(userId))
        }
        else{
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
       }
        
    }, [dispatch,user,userId,history,successUpadate])

    return (
        <>
        <Button variant="dark" className="my-3" onClick={()=>history.goBack()}>Go Back</Button>
        <FormContainer>
            <h1>Edit User</h1>
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message variant='danger'> {errorUpdate}</Message>}
            {loading ? <Loader/> : error ? <Message variant='danger'> {error}</Message>:(
                <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name"></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"></Form.Control>
                </Form.Group>
                <Form.Group controlId='isAdmin'>
                    <Form.Check type='checkbox' label="Is Admin" checked={isAdmin} onChange={(e)=>setIsAdmin(e.target.checked)} ></Form.Check>
                </Form.Group>
                
                <Button type="submit" variant="dark" >
                    Update
                </Button>
            </Form>

            ) }
           
            
        </FormContainer>
        </>
    )
}

export default UserEditScreen
