import { React, useEffect, useState } from "react";
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import Container from '../components/Container'
//import Color from '../components/Color'
import { useDispatch, useSelector } from "react-redux";
import { getUseProductrWishlist } from '../features/user/userSlice';
import { addToWishlist } from "../features/products/productSlice";
const Wishlist = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        getWishlistFromDb();
      }, []);
      const getWishlistFromDb=() =>{
        dispatch( getUseProductrWishlist());
      }
      const WishlistState = useSelector((state) => state?.auth?.wishlist?.wishlist);
      const removeFromWishlist = (id)=>{
        dispatch(addToWishlist(id));
        setTimeout(() => {
            dispatch( getUseProductrWishlist());
        }, 300);
      }
      console.log(WishlistState);
  return (
    <>
     <Meta title={" Wishlist"}/>
      <BreadCrumb title=" Wishlist"/>
      <Container class1='wishlist-wrapper home-wrapper-2 py-5'>
        <div className='row'>
            {
                WishlistState && WishlistState.length  === 0 && <div className="text-center">Không có sản phẩm nào</div>
            }
            {
                WishlistState && WishlistState?.map((item,index)=>{
                    return(
                        
                        <div className='col-3 d-flex mt-3 gap-30'  key={index}>
                                <div className='wishlist-card position-relative'>
                                    <img onClick={()=>{removeFromWishlist(item?._id)}} src='images/cross.svg' alt='cross' className='position-absolute cross img-fluid'/>
                                    <div className='wishlist-card-img bg-white'>
                                        <img src= {item?.images[0]?.url} width={160} className="img-fluid  d-block mx-auto" alt='watch'/>
                                    </div>
                                    <div className='py-3 px-3'>
                                        <h5 className='tittle'>{item?.title}</h5>
                                        <h6 className='price mb-3 mt-3'>{item?.price} Đồng</h6>
                                    </div>  
                                </div>
                                
                            </div>
                        

                    )
                })
            }
            </div>
           
        
      </Container>
    </>
    
  )
}

export default Wishlist
