import { React, useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { IoArrowBackOutline } from "react-icons/io5";
import watch from "../images/watch.jpg"
import Container from '../components/Container';
import { useDispatch, useSelector } from "react-redux";
import { useFormik} from 'formik';
import * as yup from 'yup';
import CustomInput from '../components/CustomInput'
import Paypal from '../components/Paypal'



const ShippingSchema = yup.object().shape({
  firstname: yup
      .string()
      .required("Chưa nhập họ"),
  lastname: yup.string().required("Chưa nhập tên"),
  address: yup.string().required("Chưa nhập Địa chỉ"),
  country: yup.string().required("Chưa nhập Thành Phố"),
});
const Checkout = () => {
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      address: '',
      country:'',
    },
    validationSchema: ShippingSchema,
    onSubmit: values => {
        //dispatch(registerUser(values));
        setShippingInfor(values)
    },
  });
  const[shippingInfor,setShippingInfor]=useState(null)
  const dispatch = useDispatch();
  const cartState = useSelector((state)=> state.auth.cartProducts)
  const [totalAmount, setTotalAmount]=useState(null)
  useEffect(()=>{
    let sum= 0;
    for (let index = 0; index < cartState?.length; index++) {
     sum= sum+(Number(cartState[index].quantity)*cartState[index].price)
     setTotalAmount(sum)
      
    }
  },[cartState])
  return (
    <>
      <Container class1='checkout-wrapper py-5 home-wrapper-2'>
      
            <div className='row'>
                <div className='col-7'>
                    <div className='checkout-left-data'>
                      <h3 className='website-name'> Trai Cay</h3>
                      <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-itemt"><Link className='text-dark' to="/cart">Giỏ Hàng</Link></li> &nbsp; /
                            <li class="breadcrumb-item active" aria-current="page">Thông tin</li>
                            <li class="breadcrumb-item active" aria-current="page">Giao Hàng</li>
                            <li class="breadcrumb-item active" aria-current="page">Thanh Toán</li>
                      </ol>
                      </nav>
                      <h4 className='title total'>Thông tin Liên Hệ</h4>
                      <p className='user-details total'>sdcs</p>
                      <h4 className='mb-3'>Địa Chỉ Giao Hàng</h4>
                      <form action='' onSubmit={formik.handleSubmit} className='d-flex flex-wrap gap-15 justify-content-between'>
                        <div className='w-100'>
                          <select 
                            className='form-control form-select' 
                            value={formik.values.country}
                            onChange={formik.handleChange("country")} 
                            onBlur={formik.handleBlur("country")}
                            name='country' 
                            id=''>
                            <option value="" selected disabled>
                              Chọn Thành Phố
                            </option>
                            <option value="" >
                              Hồ Chí Minh
                            </option>
                          </select>
                          <div className="error ms-2 my-1">
                                {formik.touched.country && formik.errors.country}
                          </div>
                        </div>
                        <div className='flex-grow-1'>
                        <CustomInput 
                             type='text' 
                             name="Firstname"
                             className='form-control' 
                             placeholder='Ho'
                             value={formik.values.firstname}
                             onChange={formik.handleChange("firstname")}
                             onBlur={formik.handleBlur("firstname")}
                            />
                          <div className="error mt-2">
                              {formik.touched.firstname && formik.errors.firstname}
                          </div>
                        </div>
                        <div className='flex-grow-1'>
                          <CustomInput 
                             type='text' 
                             name="lastname"
                             className='form-control' 
                             placeholder='Tên'
                             value={formik.values.lastname}
                             onChange={formik.handleChange("lastname")}
                             onBlur={formik.handleBlur("lastname")}
                            />
                            <div className="error mt-2">
                                {formik.touched.lastname && formik.errors.lastname}
                            </div>
                        </div>
                        <div className='w-100'>
                        <CustomInput 
                             type='text' 
                             name="lastname"
                             className='form-control' 
                             placeholder='Địa chỉ'
                             value={formik.values.address}
                             onChange={formik.handleChange("address")}
                             onBlur={formik.handleBlur("address")}
                            />
                            <div className="error mt-2">
                                {formik.touched.address && formik.errors.address}
                            </div>
                        </div>
                       <div className='w-100' >
                        <div className='d-flex  justify-content-between align-items-center'>
                          <Link to="/cart" className='text-dart'><IoArrowBackOutline/>Trở Về Giỏ Hàng</Link>
                          <Link to="/cart" className='button'>Tiếp tục </Link>
                          

                        </div>

                       </div>
                      </form>
                    </div>
                </div>
                <div className='col-5'>
                  <div className='border-bottom py-4'>
                    {
                      cartState && cartState?.map((item, index) =>{
                        return(
                          <div key={index} className='d-flex gap-10 mb-2 justify-content-between align-items-center'>
                          <div className='w-75 d-flex gap-10'>
                            <div className='w-25 position-relative'>
                              <span style={{top:"-10px", right:"2px"}} className='badge bg-secondary text-white rounded-bottom-circle p-3 position-absolute'>{item?.quantity}</span>
                              <img className="img-fluid" src= {item?.productId?.images[0]?.url} width={100} height={100} alt='' />
                            </div>
                            <div>
                              <h5 className='total-price'>{item?.productId?.title}</h5>
                              {/* <p className='total-price'> s / # dxgf</p> */}
                            </div>
                          </div>
                          
                          <div className='flex-grow-1'>
                            <h5 className='total'>{item?.price * item?.quantity}</h5>
                          </div>
                        </div>

                        )
                      })
                    }
                   

                  </div>
                  <div className='border-bottom py-4'>
                    <div className='d-flex justify-content-between align-items-center'>
                      <p className='total'>Tổng Mua</p>
                      <p className='total-price'>{totalAmount?totalAmount : "0"}</p>
                    </div>
                  
                  
                    <div className='d-flex justify-content-between align-items-center'>
                      <p className='total'>Phí Vận Chuyển</p>
                      <p className='total-price'>5</p>
                    </div>
                  </div>
                  
                  
                  <div className='d-flex justify-content-between align-items-center py-4 '>
                    <h4 className='total'>Tổng Thanh Toán</h4>
                    <h5 className='total-price'>{totalAmount?totalAmount+5 : "0"}</h5>
                  </div>
                  <div>
                    <Paypal />
                  </div>
                    
                </div>

            </div>
        </Container>
    
    </>
  )
}

export default Checkout
