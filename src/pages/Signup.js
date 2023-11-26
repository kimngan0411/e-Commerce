
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import { Link,useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'
import { useFormik} from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from '../features/user/userSlice'
import React, { useEffect } from 'react'


const SignupSchema = yup.object().shape({
    firstname: yup
        .string()
        .required("Chưa nhập họ"),
    lastname: yup.string().required("Chưa nhập tên"),
    email: yup.string().nullable().email("Email phải hợp lệ").required("Chưa nhập email"),
    mobile: yup.string().required("Chưa nhập số điện thoại"),
    password: yup.string().required("Chưa nhập mật khẩu"),
  });

const Signup = () => {
    const authState = useSelector((state) => state?.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
          firstname: '',
          lastname: '',
          email: '',
          mobile:'',
          password:'',
        },
        validationSchema: SignupSchema,
        onSubmit: values => {
            dispatch(registerUser(values));
            // alert(JSON.stringify(values, null, 2));
        },
      });
      useEffect(()=>{
        if(authState.createdUser !== null && authState.isError === false){
          navigate('/login')
        }
      },[authState])
   
  return (
    <>
        <Meta title={" Signup"}/>
        <BreadCrumb title=" Signup"/>
        <Container class1='login-wrapper home-wrapper-2 py-5'>
      
            <div className='row'>
                <div className='col-12'>
                    <div className='auth-card'>
                        <h3 className='text-center mb-3 mt-3'>Đăng Ký</h3>
                        <form action='' onSubmit={formik.handleSubmit} className='d-flex flex-column gap-30'>  
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
                                type='tel' 
                                name="mobile"
                                className='form-control' 
                                placeholder='Số Điện Thoại'value={formik.values.mobile}
                                onChange={formik.handleChange("mobile")}
                                onBlur={formik.handleBlur("mobile")}
                            />
                            <div className="error mt-2">
                                {formik.touched.mobile && formik.errors.mobile}
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
                                
                                <div className=' mt-3 d-flex justify-content-center gap-15 align-items-center'>
                                    <button className='button border-0'>Tạo</button>
                                    
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

export default Signup
