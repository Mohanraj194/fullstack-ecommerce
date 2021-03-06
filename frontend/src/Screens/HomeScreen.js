import React,{useEffect} from 'react'
import Product from '../Component/Product'
import { Col, Row,Button } from 'react-bootstrap'
import { useDispatch,useSelector } from "react-redux";
import { listProducts } from "../actions/productAction";
import Loader from '../Component/Loader';
import Paginate from '../Component/Paginate';
import Message from '../Component/Message';
import ProductCarousel from '../Component/ProductCarousel';
const HomeScreen = ({history,match}) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    
    const dispatch = useDispatch()
    const productList = useSelector(state=>state.productList)
    const {products,loading,error,page,pages}=productList

   useEffect(() => {
    dispatch(listProducts(keyword,pageNumber))
   }, [dispatch,keyword,pageNumber])
   

   
    return (
        <>
        {!keyword ? <ProductCarousel/>:(<Button variant="dark" className="my-3" onClick={() => history.goBack()}>Go Back</Button>)}
         <h1>Latest product</h1>
         {loading ? (<Loader/>):
         error ? (<Message variant='danger'>{error}</Message>):(
          <>
            <Row>
            {products.map(product=>(
               <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                   <Product product={product}/>
               </Col>
            ))}
            </Row>
            <Paginate page={page} pages={pages} keyword={keyword ? keyword : ''} />
          </>     
            )}
          
          
        </>
    )
}

export default HomeScreen
