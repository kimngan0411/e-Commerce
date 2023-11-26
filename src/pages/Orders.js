import { React, useEffect, useState } from "react";
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import Container from '../components/Container'
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/user/userSlice";
const Orders = () => {
    const dispatch = useDispatch();
    const orderState = useSelector((state) => state?.auth?.getorderedProduct?.orders);
    //console.log(orderState);
    useEffect(() => {
        dispatch(getOrders());
      }, []);



  return (
    <>
       <Meta title={" My Orders"}/>
      <BreadCrumb title=" My Orders"/>
      <Container class1='cart-wrapper home-wrapper-2 py-5'>
        <div className='row'>
            <div className="col-12">
                <div className="row">
                    <div className="col-3">
                        <h5>SẢN PHẨM</h5>
                    </div>
                    <div className="col-3">
                        <h5>TỔNG TIỀN</h5>
                    </div>
                    <div className="col-3">
                        <h5>TỔNG THANH TOÁN</h5>
                    </div>
                    <div className="col-3">
                        <h5>TRẠNG THÁI</h5>
                    </div>

                </div>
                
            </div>
        
            <div className="col-12 mt-3">
                {
                    orderState && orderState?.map((index, item) =>{
                        return (
                            <div className="row" key={index}>
                                <div className="col-3">
                                    <p>{item?._id}</p>
                                </div>
                                <div className="col-3">
                                    <p>{item?.totalPrice}</p>
                                </div>
                                <div className="col-3">
                                    <p>{item?.totalPriceAfterDiscount}</p>
                                </div>
                                <div className="col-3">
                                    <p>{item?.orderStatus}</p>
                                </div>
                                <div className="col-12">
                                    <div className="row bg-secondary">
                                        <div className="col-3">
                                            <p>SẢN PHẨM</p>
                                        </div>
                                        <div className="col-3">
                                            <p>TỔNG TIỀN</p>
                                        </div>
                                        <div className="col-3">
                                            <p>TỔNG THANH TOÁN</p>
                                        </div>
                                        <div className="col-3">
                                            <p>TRẠNG THÁI</p>
                                        </div>

                                    </div>
                                    
                                </div>
                            </div>
                            
                            
                            

                        )
                    })
                }
            </div>
        </div>
      </Container>
    </>
  )
}

export default Orders
