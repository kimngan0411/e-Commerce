import { React, useEffect, useState } from "react";
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import ProductCard from '../components/ProductCard'
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from 'react-image-zoom';
import Color from '../components/Color.js'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoGitCompareSharp } from "react-icons/io5";
import { FaRegHeart, FaSass } from "react-icons/fa";
import Container from '../components/Container';
import { addRating, getAProduct, getAllProducts } from '../features/products/productSlice';
import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-toastify"
import { addProdToCart, getUserCart } from "../features/user/userSlice.js";

const SingleProduct = () => {
  const [color, setColor]=useState(null)
  // console.log(color);
  const [quantity, setQuantity]=useState(1);
  const [alreadyAdded,setAlreadyAdded]=useState(false);
  const location = useLocation()
  const navigate = useNavigate()
  //console.log(quantity);
  const productState = useSelector((state) => state?.product?.singleproduct);
  const productsState = useSelector((state) => state?.product?.product);
  const cartState =useSelector((state) => state?.auth?.cartProducts);
  const getProductId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAProduct( getProductId));
    dispatch(getUserCart());
    dispatch(getAllProducts())
  }, []);
  useEffect(() =>{
    for (let index = 0; index < cartState?.length; index++) {
      if(getProductId===cartState[index]?.productId?._id){
        setAlreadyAdded(true)
      }
      
    }
  },[])
  const uploadCart =()=>{
    if (quantity == null){
      toast.error("Hãy chọn Số Lượng")
      return false
    }else{
      dispatch(addProdToCart({productId:productState?._id, quantity,price:productState?.price}))
      navigate('/cart')
    }
  }


  // const props = {width: 400, height: 500, zoomWidth: 600, 
  //     img: productState?.images[0]?.url ;
  const[orderedProduct, setorderedProduct] = useState(true);

  const[popularProduct, setPopularProduct ] =useState([])
  useEffect(() => {
    let data=[]
    for (let index = 0; index < productsState?.length; index++) {
      const element = productsState[index];
      if(element?.tags =='popular'){
        data.push(element)
      }
      setPopularProduct(data)
    }
  }, [productState]);
  console.log(popularProduct);

  const [star, setStar]= useState(null)
  const [comment, setComment]=useState(null)
  const addRatingToProduct=()=>{
    if(star===null){
      toast.error("Bạn hãy đánh giá")
      return false
    } else if(comment=== null){
      toast.error("Bạn hãy Bình Luận về Sản Phẩm")
      return false
    }else{
      dispatch(addRating({ star: star, comment: comment, prodId: getProductId}));
      setTimeout(()=>{
        dispatch(getAProduct( getProductId));
      },100)
      return false
    }
    return false
  }


  return (
    <>
      <Meta title={" Product Name"}/>
      <BreadCrumb title={productState?.title}/>
      <Container class1='main-product-wrapper home-wrapper-2 py-5'>
     
            <div className='row'>
                <div className='col-6'>
                  <div className='main-product-image'>
                    <div>
                      {/* <ReactImageZoom {...props} /> */}
                      </div>
                  </div>
                  <div className='orther-product-image d-flex flex-wrap gap-15'>
                    <img src={productState?.images?.[0]?.url}/>
                    
                  </div>
                    
                </div>
                <div className='col-6'>
                    <div className='main-product-details'>
                      <div className='border-bottom'>
                        <h3 className='title'>{productState?.title}</h3>
                      </div>
                      <div className='border-bottom py-3' > 
                        <p className='price'>{productState?.price}</p>
                        <div className='d-flex align-items-center gap-10'> 
                          <ReactStars
                          count={5}
                          value={productState?.totalrating.toString()}
                          edit={false}
                          size={24}
                          activeColor="#ffd700"
                        />
                        <p className='mb-0 t-review'> (2 Đánh giá)</p>
                        </div>
                        <div>
                          <a className='review-btn' href='#review'> Đánh Giá Và Bình Luận</a>
                        </div>
                      </div>
                      <div className='border-bottom py-3'>
                        <div className='d-flex gap-10 align-items-center my-2'>
                          <h3 className='product-heading'>Xuất xứ:</h3>
                           <p className='product-data'>{productState?.brand}</p>
                        </div>
                        <div className='d-flex gap-10 align-items-center my-2'>
                          <h3 className='product-heading'>Danh Mục:</h3>
                           <p className='product-data'>{productState?.category}</p>
                        </div>
                        {/* <div className='d-flex gap-10  my-2'>
                          <h3 className='product-heading'>Avai</h3>
                           <p className='product-data'>Instockc</p>
                        </div> */}
                        {/* <div className='d-flex gap-10 flex-calign-items-centerolumn my-2'>
                          <h3 className='product-heading'>size</h3>
                           <p className='product-data'>Instockc</p>
                        </div> */}
                       {
                        // alreadyAdded == false && <>
                        //  <div className='d-flex gap-10 flex-column my-2'>
                        //   <h3 className='product-heading'>Màu Sắc</h3>
                        //    <Color setColor={setColor} colorData={productState?.color}/>
                        // </div>
                        
                        // </>
                       }
                        <div className='d-flex gap-30 align-items-center mt-2 mb-3'>
                          {
                            alreadyAdded === false && <>
                              <h3 className='product-heading'>Số lượng: </h3>
                            <div className=''>
                              <input 
                                className="form-control"
                                type="number" 
                                name='' 
                                min={1} 
                                max={20} 
                                style={{width:"70px"}} 
                                id=''
                                onChange={(e)=>setQuantity(e.target.value)}
                                value={quantity}
                              />
                          </div>
                            </>
                          }
                          <div className={alreadyAdded ? "ms-0": "ms-5" + 'd-flex align-items-center gap-30 ms-5'}>
                            <button 
                              className='button border-0'
                              // data-bs-toggle="modal"
                              // data-bs-target="staticBackdrop" 
                              type='button'
                              onClick={()=>{alreadyAdded? navigate('/cart'): uploadCart()}}
                            >
                              {alreadyAdded? "Giỏ Hàng" : "Thêm Giỏ Hàng"}
                            </button>
                            {/* <button className='button signup'>Mua Hàng</button> */}
                          </div>
                           
                        </div>
                        <div className='d-flex  align-items-center gap-15 my-2'>
                          <div>
                            <a  href=''><IoGitCompareSharp className='fs-5 me-2'/>Add compare</a>
                          </div>
                          <div>
                            <a  href=''><FaRegHeart className='fs-5 me-2'/>Thêm Yêu Thích</a>
                          </div>
                       
                        </div>
                        {/* <div className="d-flex gap-10 align-items-center gap-15 my-2">
                          <h3 className='product-heading'>Link Sản Phẩm:</h3>
                          <a href="javarscrip:void(0);"
                            onClick={()=>{
                              copyToClipboard(window.location.href);
                            }}
                          >Sao Chép Link Sản Phẩm</a>
                        </div>

                      </div> */}
                    </div>
                </div>
              </div>
            </div>

        </Container>
      <Container class1='description-wrapper py-5 home-wrapper-2'>
       
            <div className='row'>
                <div className='col-12'>
                    <h4>Mô tả sản phẩm</h4>
                    <div className='bg-white p-3'>
                      
                      <p dangerouslySetInnerHTML={{__html: productState?.description,}}
                      >
                      
                       
                      </p>
                    </div>
                </div>
                
            </div>
          
      </Container>
      <Container  class1='reviews-wrapper py-5 home-wrapper-2'>
          <div className='row'>
              <div className='col-12'>
                <h3 id='review'>Đánh Giá</h3>
               <div className='review-inner-wrapper'> 
                <div className='review-head d-flex justify-content-between align-items-end'>
                    <div>
                      <h4 className='mb-2'> Đánh Giá Của Khách Hàng</h4>
                      <div className='d-flex align-items-center gap-10'> 
                        <ReactStars
                          count={5}
                          value={3}
                          edit={false}
                          size={24}
                          activeColor="#ffd700"
                        />
                        <p className='mb-0'>2 người Review</p>
                      </div>
                    </div>
                    {orderedProduct &&(
                      <div>
                        <a  className="text-dark text-decoration-underline"href=''> Viết Bình Luận</a>
                      </div>)}
                </div>
                <div  className='review-form py-4'>
                <h4 className='mb-2'>Đánh Giá Và Viết Bình Luận</h4>
                 
                    <div>
                      <ReactStars
                          count={5}
                          value={3}
                          edit={true}
                          size={24}
                          activeColor="#ffd700"
                          onChange={(e)=>{
                            setStar(e);
                          }}
                        />
                    </div>
                                
                    <div>
                      <textarea 
                              name=''
                              id=''
                              className='w-100 form-control mt-4'
                              cols={30}
                              rows={6}
                              placeholder='Ghi chú'
                              onChange={(e)=>{
                                setComment(e.target.value);
                              }}
                      
                      ></textarea>
                    </div>
                    <div className="d-flex justify-content-end mt-3">
                        <button  onClick={addRatingToProduct} className="button border-0" type="button">Gửi</button>
                    </div>
                      
                 
                </div>
                <div className='reviews mt-4'>
                  {
                    productState && productState?.ratings?.map((index, item) =>{
                      return(
                        <div className="review" key={index}>
                          <div className='d-flex gap-10 align-items-center ' >
                            <ReactStars
                              count={5}
                              value={item?.star}
                              edit={false}
                              size={24}
                              activeColor="#ffd700"
                              
                            />

                          </div>
                          <p className='mt-3'>{item?.comment}</p>
                          

                        </div>
                      )
                    })
                  }
                </div>
                </div>
                  
              </div>
              
          </div>
        
      </Container>
      <Container class1='popular-wrapper py-5 home-wrapper-2'>
      
            <div className='row'>
              <div className='col-12'>
                <h3 className='section-heading'>SẢN PHẨM PHỔ BIẾN</h3>

              </div>
            </div>
            <div className='row'>
              <ProductCard data={popularProduct} />

              
            </div>
       

      </Container>
    </>
  )
}

export default SingleProduct
