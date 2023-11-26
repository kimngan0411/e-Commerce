import { React, useEffect, useState } from "react";
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useFormik} from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../features/user/userSlice";

const passwordSchema = yup.object().shape({
    password: yup.string().required("Chưa nhập mật khẩu"),
  });
const Resetpassword = () => {
    const dispatch = useDispatch();
    const navigate= useNavigate()
    const formik = useFormik({
        initialValues: {
          password:'',
        },
        validationSchema: passwordSchema,
        onSubmit: values => {
            dispatch(resetPassword({token:getToken,password:values?.password}));
           navigate('/login')
        },
      });
    const location = useLocation()
    const getToken=  location.pathname.split("/")[2];
    console.log(getToken);
  return (
    <>
      <Meta title={" Reset Password"}/>
      <BreadCrumb title=" Reset Password"/>
      <Container class1='login-wrapper home-wrapper-2 py-5'>
      
            <div className='row'>
                <div className='col-12'>
                    <div className='auth-card'>
                        <h3 className='text-center mb-3 mt-3'>Đặt Lại Mật Khẩu</h3>
                        <form action='' onSubmit={formik.handleSubmit} className='d-flex flex-column gap-30'>  
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
                                
                                <div className=' mt-3 d-flex justify-content-center gap-15 align-items-center'>
                                    <button className='button border-0'>Xong</button>
                                    
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

export default Resetpassword
