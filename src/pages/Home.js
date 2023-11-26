
import { FaCarRear } from "react-icons/fa6";
import Marquee from "react-fast-marquee"
import BlogCard from '../components/BlogCard';
import ProductCard from '../components/ProductCard';
import SpecialProduct from '../components/SpecialProduct';
import Container from '../components/Container';
import {services} from '../utils/Data';
import moment from "moment"
import { useDispatch, useSelector } from "react-redux";
import {getAllBlogs} from "../features/blogs/blogSlice";
import { React, useEffect, useState } from "react";
import { getAllProducts } from '../features/products/productSlice';
import ReactStars from "react-rating-stars-component";
import{Link, useLocation,useNavigate} from "react-router-dom"
import prodcompare from "../images/prodcompare.svg"
import view from '../images/view.svg'
import addcart from '../images/add-cart.svg'
import wish from '../images/wish.svg'
import { addToWishlist } from '../features/products/productSlice';
const Home = () => {
  const blogState = useSelector((state) => state.blog?.blog);
  const productState = useSelector((state) => state.product.product);
  console.log(productState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getblogs();
    getallProducts();
  }, []);
  const getblogs=() => {
    dispatch(getAllBlogs());
  }
  const getallProducts =() =>{
    dispatch (getAllProducts());
  }
  const addToWish= (id) =>{ 
    dispatch(addToWishlist(id))
  }
  return (
    <>
      <Container class1="home-wrapper-1 py-5">
            <div className='row'>
                <div className='col-6'>
                    <div className='main-banner position-relative p-3'>
                      <img src='images/main.jpg' className='img-fluid rounded-3' alt='main banner'/>
                      <div className='main-banner-content position-absolute'>
                        <h4>TƯƠI MỚI MỖI NGÀY</h4>
                        <Link className='button'>Mua Ngay</Link>
                      </div>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='d-flex flex-wrap justify-content-between align-items-center'>
                      <div className='small-banner position-relative p-3'>
                        <img src='images/banne.jpg' className='img-fluid rounded-3' alt='small banner'/>
                        <div className='small-banner-content position-absolute'>
                          <h4>TƯƠI MỚI MỖI NGÀY</h4>
                          <Link className='button'>Mua Ngay</Link>
                        </div>
                      </div>
                      <div className='small-banner position-relative p-3'>
                        <img src='images/banne.jpg' className='img-fluid rounded-3' alt='small banner'/>
                        <div className='small-banner-content position-absolute'>
                          <h4>TƯƠI MỚI MỖI NGÀY</h4>
                          <Link className='button'>Mua Ngay</Link>
                        </div>
                      </div>

                    </div>
                </div>

            </div>
     
       </Container>
       <Container class1="home-wrapper-2 py-5">
            <div className='row'>
                <div className='col-12'>
                    <div className='servies d-flex align-items-center justify-content-between'>

                      {
                        services?.map((i,j) => {
                          return (
                            <div className='d-flex gap-10  align-items-center' key={j}>
                              <img src={i.image} alt='services'/>
                              <div className='mt-6'>
                                <h6>{i.title}</h6>
                                <p className='mb-0'>{i.tagline}</p>
                              </div>
                            </div>
                          )
                        })
                          
                      }
                      
                    </div>
                </div>
            </div>      
       </Container>
      <Container class1="home-wrapper-2 py-5" >
            <div className='row'>
                <div className='col-12'>
                   <div className='categories d-flex justify-content-between flex-wrap align-items-center'>
                    <div className='d-flex gap-10 align-items-center'>
                      <img src='images/laptop.jpg' alt='laptop'/>
                      <div>
                        <h6>Trái Cây Tươi</h6>
                        <p>10 Sản Phẩm</p>
                      </div>
                     
                    </div>
                    <div className='d-flex gap-10 align-items-center'>
                      <img src='images/laptop.jpg' alt='laptop'/>
                      <div>
                        <h6>Trái Cây Khô</h6>
                        <p>10 Sản Phẩm</p>
                      </div>
                     
                    </div>
                    <div className='d-flex gap-10 align-items-center'>
                      <img src='images/laptop.jpg' alt='laptop'/>
                      <div>
                        <h6>Trái Cây Nhập Khẩu</h6>
                        <p>10 Sản Phẩm</p>
                      </div>
                     
                    </div>
                    
                    <div className='d-flex gap-10 align-items-center'>
                      <img src='images/laptop.jpg' alt='laptop'/>
                      <div>
                        <h6>Quà Tặng Trái Cây</h6>
                        <p>10 Sản Phẩm</p>
                      </div>
                     
                    </div>
                    <div className='d-flex gap-10 align-items-center'>
                      <img src='images/laptop.jpg' alt='laptop'/>
                      <div>
                        <h6>Hộp Quà Trái Cây</h6>
                        <p>10 Sản Phẩm</p>
                      </div>
                     
                    </div>


                   </div>
                </div>
               

            </div>
       
      </Container>
      <Container  class1='featured-wrapper py-5 home-wrapper-2'>
          <div className='row'>
            <div className='col-12'>
              <h3 className='section-heading'>SẢN PHẨM NỔI BẬT</h3>

            </div>
            <div className='row'>
              {
                productState && productState?.map((item,index) =>{
                  if (item?.tags == "featured"){
                    return(
                      <div 
            key={index}
            className='col-3'>
              <div
                className='product-card position-relative'>
                <div className='wishlish-icon position-absolute'>
                  <button className='border-0 bg-transparent'  onClick={(e)=>{addToWish(item?._id)}}> 
                    <img src={wish} alt='wish list'/>
                  </button>
                </div>
                <div className='product-image'>
                  <img 
                    src={item?.images?.[0]?.url}
                    className='img-fluid mx-auto'
                    alt='product image'
                   width={500} height={300}/>
                  <img src='images/tab.jpg' className='img-fluid mx-auto'
                    alt='product image'
                    width={500} height={300}/>
                </div>
                <div className='product-details'>
                  <h6 className='brand'>{item?.brand}</h6>
                  <h5 className='product-title'>{item?.title}</h5>
                  <ReactStars
                    count={5}
                    value={item?.totalrating.toString()}
                    edit={false}
                    size={24}
                    activeColor="#ffd700"
                  />
                  <p className='price'>{item?.price}</p>
                </div>
                <div className='action-bar position-absolute'>
                  <div className='d-flex flex-column gap-15'>
                    {/* <button className='border-0 bg-transparent'> 
                      <img src={prodcompare} alt='compare'/>
                    </button> */}
                    <button className='border-0 bg-transparent'> 
                      <img onClick={()=>{navigate("/product/" + item?._id)}} src={view} alt='view'/>
                    </button>
                  
                    {/* <button className='border-0 bg-transparent'> 
                      <img src={addcart} alt='add cart'/>
                    </button> */}
                  </div>
                </div>
              </div>
      
          </div>
                        
                        
                      
                    )
                  }
                })
              }
              
                            
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
              {
                productState && productState?.map((item,index) =>{
                  if (item?.tags == "popular"){
                    return(
                      <div 
            key={index}
            className='col-3'>
              <div
                className='product-card position-relative'>
                <div className='wishlish-icon position-absolute'>
                  <button className='border-0 bg-transparent'  onClick={(e)=>{addToWish(item?._id)}}> 
                    <img src={wish} alt='wish list'/>
                  </button>
                </div>
                <div className='product-image'>
                  <img 
                    src={item?.images?.[0]?.url}
                    className='img-fluid mx-auto'
                    alt='product image'
                    width={600} height={300}/>
                  <img src='images/tab.jpg' className='img-fluid mx-auto'
                    alt='product image'
                    width={600} height={300}/>
                </div>
                <div className='product-details'>
                  <h6 className='brand'>{item?.brand}</h6>
                  <h5 className='product-title'>{item?.title}</h5>
                  <ReactStars
                    count={5}
                    value={item?.totalrating.toString()}
                    edit={false}
                    size={24}
                    activeColor="#ffd700"
                  />
                  <p className='price'>{item?.price}</p>
                </div>
                <div className='action-bar position-absolute'>
                  <div className='d-flex flex-column gap-15'>
                    {/* <button className='border-0 bg-transparent'> 
                      <img src={prodcompare} alt='compare'/>
                    </button> */}
                    <button className='border-0 bg-transparent'> 
                      <img onClick={()=>{navigate("/product/" + item?._id)}} src={view} alt='view'/>
                    </button>
                  
                    {/* <button className='border-0 bg-transparent'> 
                      <img src={addcart} alt='add cart'/>
                    </button> */}
                  </div>
                </div>
              </div>
      
          </div>
                        
                        
                      
                    )
                  }
                })
              }
              
                            
            </div>
      </Container>
      <Container class1='special-wrapper py-5 home-wrapper-2'>
      <div className='container-xxl'>
            <div className='row'>
              <div className='col-12'>
                <h3 className='section-heading'>SẢN PHẨM NỔI BẬT</h3>

              </div>             
            </div>
            <div className='row'>
              {
                productState && productState?.map((item,index) =>{
                  if (item?.tags == "special"){
                    return(
                      <SpecialProduct key={index}
                        title={item?.title}
                        id={item?._id}
                        brand={item?.brand} 
                        totalrating={item?.totalrating.toString()}
                        price={item?.price} 
                        sold={item?.sold}
                        quantity={item?.quantity}
                        images={item?.images?.[0]?.url}
                      />
                    )
                  }
                })
              }
              
                            
            </div>
      </div>
      </Container>
      <Container class1='marquee-wrapper-2 py-5 home-wrapper-2'>
      <div className='row'>
                <div className='col-12'>
                    <div className='marquee-inner-wrapper card-wrapper'>
                    <Marquee className='d-flex'>
                      <div className='mx-4 w-25'>
                        <img src='images/brand-05.png' alt='brand'/>
                      </div>
                      <div className='mx-4 w-25'>
                        <img src='images/brand-05.png' alt='brand'/>
                      </div>
                      <div className='mx-4 w-25'>
                        <img src='images/brand-05.png' alt='brand'/>
                      </div>
                      <div className='mx-4 w-25'>
                        <img src='images/brand-05.png' alt='brand'/>
                      </div>
                      <div className='mx-4 w-25'>
                        <img src='images/brand-05.png' alt='brand'/>
                      </div>
                      <div className='mx-4 w-25'>
                        <img src='images/brand-05.png' alt='brand'/>
                      </div>
                      <div className='mx-4 w-25'>
                        <img src='images/brand-05.png' alt='brand'/>
                      </div>
                      <div className='mx-4 w-25'>
                        <img src='images/brand-05.png' alt='brand'/>
                      </div>
                      
                    </Marquee>

                    </div>
                </div>

            </div>
      </Container>
      <Container class1='blog-wrapper py-5 home-wrapper-2'>
          <div className='row'>
              <div className='col-12'>
                <h3 className='section-heading'> BÀI VIẾT NỔI BẬT</h3>

              </div>
            </div>
            <div className='row'>
            { blogState&&
                  blogState?.map((item,index) => {
                  if(index <3){
                    return (
                      <div className='col-3 ' key={index}>
                        <BlogCard  
                          id={item?._id} 
                          title={item?.title} 
                          description={item?.description } 
                          image={item?.images?.[0]?.url}
                          date={moment(item?.createdAt).format(
                            'MMMM Do YYYY, h:mm:ss a')
                          }
                        />
                      </div>
                    )
                  }
            })
          }      
          </div>
      </Container>
    </>
  )
}

export default Home
