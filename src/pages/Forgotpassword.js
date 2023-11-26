import { React, useEffect, useState } from "react";
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import { Link } from 'react-router-dom'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordToken } from "../features/user/userSlice";
let emailSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email phải hợp lệ")
      .required("Email Chưa nhập"),
  });
const Forgotpassword = () => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
          email: "",
        },
        validationSchema: emailSchema,
        onSubmit: values => {
            dispatch(forgotPasswordToken(values));
              
          },
      });
  return (
    <>
      <Meta title={"Forgot Password"}/>
      <BreadCrumb title="Forgot Password"/>
      <Container class1='login-wrapper home-wrapper-2 py-5'>
      
            <div className='row'>
                <div className='col-12'>
                    <div className='auth-card'>
                        <h3 className='text-center mb-3 mt-3'>Lấy Lại Mật Khẩu</h3>
                        <p className='text-center mt-2 mb-3'>Bạn nhập Email để lấy lại mật khẩu</p>
                        <form action='' onSubmit={formik.handleSubmit} className='d-flex flex-column gap-30'>       
                        <CustomInput 
                                type='Email' 
                                name="name"
                                className='form-control' 
                                placeholder='Email'
                                value={formik.values.email}
                                onChange={formik.handleChange("email")}
                                onBlur={formik.handleBlur("email")}
                            />
                            <div className="error mt-2">
                                {formik.touched.email && formik.errors.email}
                            </div>
                            
                            <div>
                              
                                <div className=' mt-3 d-flex justify-content-center flex-column gap-15 align-items-center'>
                                    <button className='button border-0' type='submit'>Đăng Nhập</button>
                                    <Link to="/login">Trở Về</Link>
                                </div>
                            </div>
                            
                        </form>
                    </div>
                   
                </div>
            </div>
        
      </Container>
    </>
  )
}

export default Forgotpassword
