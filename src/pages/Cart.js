import { React, useEffect, useState } from "react";
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import watch from '../images/watch.jpg';
import { AiFillDelete } from "react-icons/ai";
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import { useDispatch, useSelector } from "react-redux";
import { deleteCartPoduct, getUserCart, updateCartPoduct } from "../features/user/userSlice";

const Cart = () => {

  
  const dispatch = useDispatch();
  const [prodUpdateDetail, setProdUpdateDetail]= useState(null)
  const [totalAmount, setTotalAmount]=useState(null)

  const userCartState = useSelector((state)=> state.auth.cartProducts)

  useEffect(() => {
    dispatch(getUserCart( ));
  }, []);
  useEffect(() => {
    if(prodUpdateDetail !==null){
      dispatch (updateCartPoduct({cartItemId:prodUpdateDetail?.cartItemId,quantity:prodUpdateDetail?.quantity}))
    setTimeout(() =>{
      dispatch(getUserCart( ));
    }, 200)
    }
  }, [prodUpdateDetail]);
  //console.log(userCartState);
  const deleteACartProduct=(id) =>{
    dispatch (deleteCartPoduct(id))
    setTimeout(() =>{
      dispatch(getUserCart( ));
    }, 200)
  }
useEffect(()=>{
  let sum= 0;
  for (let index = 0; index < userCartState?.length; index++) {
   sum= sum+(Number(userCartState[index].quantity)*userCartState[index].price)
   setTotalAmount(sum)
    
  }
},[userCartState])


  return (
    <div>
      <Meta title={" Cart"}/>
      <BreadCrumb title=" Cart"/>
      <Container class1='cart-wrapper py-5 home-wrapper-2'>
            <div className='row'>
                <div className='col-12'>
                    <div className=' cart-header d-flex justify-content-between align-items-center'>
                        <h4 className='cart-col-1'>SẢN PHẨM</h4>
                        <h4 className='cart-col-2'>GIÁ</h4>
                        <h4 className='cart-col-3'>SỐ LƯỢNG</h4>
                        <h4 className='cart-col-4'>TỔNG TIỀN</h4>
                      </div>
                      {
                        userCartState && userCartState?.map((item, index) =>{
                          return (
                            <div key={index} className=' cart-data mb-2 d-flex justify-content-between align-items-center'>
                       <div className='cart-col-1 d-flex align-items-center'>
                         <div className='w-25'>
                            <img src={item?.productId?.images?.[0]?.url} className='img-fluid' alt=''/>
                         </div>
                         <div className='w-75'>
                            <p>Tên: {item?.productId?.title}</p>
                            {/* <p className="d-flex gap-3">Màu:  <ul className='colors ps-0'>
                                    <li                    
                                        style={{backgroundColor:item?.color?.title}} 
                                        key={index}>
                                    </li>                                  
                                             
                            </ul></p> */}
                            <p>Xuất Xứ: {item?.productId?.brand}</p>
                         </div>
                       </div>
                       <div className='cart-col-2'>
                         <h5 className='price'>{item?.price}</h5>
                       </div>
                       <div className='cart-col-3 d-flex align-items-center gap-15'>
                         <div>
                            <input 
                              className=" form-control" 
                              type='number' 
                              min={1} max={20} 
                              name='' id='' 
                              value={item?.quantity} 
                              onChange={(e)=>{setProdUpdateDetail({cartItemId:item?._id,quantity: e.target.value})}}
                            />
                         </div>
                         <div>
                            <AiFillDelete onClick={()=>{deleteACartProduct(item?.productId?._id)}} className='text-danger fs-5' />
                         </div>
                       </div>
                       <div className='cart-col-4'>
                        <h5 className='price'>{item?.price * item?.quantity}</h5>
                       </div>
                    </div>  

                          )
                        })
                      }
                </div>
                <div className='col-12 py-2 mt-4'>
                    <div className='d-flex justify-content- '>
                      <Link to="/product" className='button'>Tiếp Tục Mua</Link>
                    </div>
                    {
                      (totalAmount !== null || totalAmount !== 0) &&
                     
                    <div className='d-flex flex-column  align-items-end '>
                        <h4 >Tổng Thanh Toán: {totalAmount}</h4>
                        <p>Mã giãm giá và phí vận chuyển đã được tính</p>
                        <Link to="/checkout" className='button'> Mua Hàng</Link>
                    </div>
                    }  
                </div>

            </div>
      </Container>
    </div>
  )
}

export default Cart
