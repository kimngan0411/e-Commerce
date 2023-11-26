import React from 'react'
import ReactStars from "react-rating-stars-component";
import{Link, useLocation} from "react-router-dom"
import prodcompare from "../images/prodcompare.svg"
import view from '../images/view.svg'
import addcart from '../images/add-cart.svg'
import wish from '../images/wish.svg'
import { useDispatch, useSelector } from "react-redux";
// import { addToWishlist } from '../../../backend/controller/productCtrl';
import { addToWishlist } from '../features/products/productSlice';
const ProductCard = (props) => {
  const {grid,data} =props
  const dispatch = useDispatch();
  //console.log(data);
  let location = useLocation();
 
  const addToWish= (id) =>{
    
    dispatch(addToWishlist(id))
  }
 
  return (
   <>
    {
      data?.map((item,index) => {
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
            width={500}
            height={400}/>
          <img 
          src={item?.images?.[0]?.url}
          className='img-fluid mx-auto'
          alt='product image'
          width={300}
          height={300}/>
          {/* <img src='images/tab.jpg' className='img-fluid mx-auto'
            alt='product image'
            width={160}/> */}
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
            <Link to={"/product/" + item?._id} className='border-0 bg-transparent'> 
              <img src={view} alt='view'/>
            </Link>
           
            {/* <button className='border-0 bg-transparent'> 
              <img src={addcart} alt='add cart'/>
            </button> */}
          </div>
        </div>
      </div>
      
          </div>
        )
      })
    }
    
    
   </>
  )
}

export default ProductCard
