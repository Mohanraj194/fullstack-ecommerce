import React,{useState,useEffect} from 'react'
import {Form,Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../Component/Message'
import FormContainer from '../Component/FormContainer'
import Loader from '../Component/Loader'
import {listProductDetails,updateProduct} from '../actions/productAction'
import { PRODUCT_DETAILS_RESET, PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import axios from 'axios'


const ProductEditScreen = ({history,match}) => {
    const productId = match.params.id
    const [name,setName]=useState('')
    const [price,setPrice]=useState(0)
    const [image,setImage]=useState('')
    const [brand,setBrand]=useState('')
    const [category,setCategory]=useState('')
    const [countInStock,setCountInStock]=useState(0)
    const [description,setDescription]=useState('')
    const [uploading,setUploading]=useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading,error,product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {loading:loadingUpdate,error:errorUpdate,success:successUpdate} = productUpdate

    

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(updateProduct({
            _id:productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))
    }

    useEffect(() => {
       if(successUpdate){
            dispatch({type:PRODUCT_UPDATE_RESET})
            dispatch({type:PRODUCT_DETAILS_RESET})
            history.push('/admin/productlist')
       }
       else{
        if(!product || product._id !== productId){
            
            dispatch(listProductDetails(productId))
        }
        else{
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
        }
       }
       
        
    }, [dispatch,product,productId,history,successUpdate])

    const uploadFileHandler = async(e)=>{
        
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image',file)
        setUploading(true)
        try {
            const config={
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }
            const {data} = await axios.post('/upload',formData,config)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.log(error)
            setUploading(false)
        } 

    }

    return (
        <>
        <Button variant="dark" className="my-3" onClick={()=>history.goBack()}>Go Back</Button>
        <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message variant='danger'> {errorUpdate}</Message> }
            
            {loading ? <Loader/> : error ? <Message variant='danger'> {error}</Message>:(
                <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Product Name"></Form.Control>
                </Form.Group>
                <Form.Group controlId='price'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control type='number' value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Enter Product Price"></Form.Control>
                </Form.Group>
                <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type='text' value={image} onChange={(e)=>setImage(e.target.value)} placeholder="Enter Product Image URL"></Form.Control>
                    <Form.File id='image-file' label='Choose File' custom onChange={uploadFileHandler}></Form.File>
                    {uploading && <Loader/>}
                </Form.Group>
                <Form.Group controlId='brand'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type='text' value={brand} onChange={(e)=>setBrand(e.target.value)} placeholder="Enter Product Brand "></Form.Control>
                </Form.Group>
                <Form.Group controlId='category'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control type='text' value={category} onChange={(e)=>setCategory(e.target.value)} placeholder="Enter Product Category "></Form.Control>
                </Form.Group>
                <Form.Group controlId='countInStock'>
                    <Form.Label>Count In Stock</Form.Label>
                    <Form.Control type='number' value={countInStock} onChange={(e)=>setCountInStock(e.target.value)} placeholder="Enter Product CountInStock "></Form.Control>
                </Form.Group>
                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type='text' value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Enter Product Description "></Form.Control>
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

export default ProductEditScreen
