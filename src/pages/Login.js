import React, { useEffect } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import { Link, useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from '../features/user/userSlice'

let schema = yup.object().shape({
    email: yup
      .string()
      .email("Email phải hợp lệ")
      .required("Email Chưa nhập"),
    password: yup.string().required("Chưa nhập Số điện thoại"),
  });
const Login = () => {
  const authState = useSelector((state) => state?.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
          email: "",
          password: "",
        },
        validationSchema: schema,
        onSubmit: values => {
            dispatch(loginUser(values));
                 
          },
      });
    useEffect(()=>{
      if(authState.user !== null && authState.isError === false){
        navigate('/')
      }
    },[authState])
  return (
    <>
      <Meta title={" Login"}/>
      <BreadCrumb title=" Login"/>
      <Container class1='login-wrapper home-wrapper-2 py-5'>
     
            <div className='row'>
                <div className='col-12'>
                    <div className='auth-card'>
                        <h3 className='text-center mb-3 mt-3'>Đăng Nhập</h3>
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
        
                            <CustomInput 
                            type='password' 
                            className='form-control' 
                            placeholder='Mật Khẩu'value={formik.values.password}
                            onChange={formik.handleChange("password")}
                            onBlur={formik.handleBlur("password")}
                            />
                            <div className="error mt-2">
                                {formik.touched.password && formik.errors.password}
                            </div>
                            <div>
                                <Link to="/forgot-password">Bạn Quên Mật Khẩu?</Link>
                                <div className=' mt-3 d-flex justify-content-center gap-15 align-items-center'>
                                    <button className='button border-0' type='submit'>Đăng Nhập</button>
                                    <Link to="/signup" className='button signup'>Đăng ký</Link>
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

export default Login
