import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import { IoHome,IoInformationCircleSharp } from "react-icons/io5";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import Container from '../components/Container';
import CustomInput from '../components/CustomInput'
import * as yup from 'yup';
import { useFormik} from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { createQuery } from '../features/contact/contactSlice';
const contactSchema = yup.object().shape({
  name: yup.string().required("Chưa nhập tên"),
  email: yup.string().nullable().email("Email phải hợp lệ").required("Chưa nhập email"),
  mobile: yup.string().required("Chưa nhập số điện thoại"),
  comment: yup.string().required("Chưa nhập ghi chú"),
 
});
const Contact = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      
      name: '',
      email: '',
      mobile:'',
      comment:'',
      
    },
    validationSchema: contactSchema,
    onSubmit: values => {
       dispatch(createQuery({
        name:values.name,email:values.email,mobile:values.mobile,comment:values.comment,
       }));
      // alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
      <Meta title={" Blog"}/>
      <BreadCrumb title=" Blog"/>
      <Container class1='contact-wrapper py-5 home-wrapper-2'>
       
            <div className='row'>
                <div className='col-12'>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.471650721374!2d106.65929477373675!3d10.851686357803656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529d5dd3f1be1%3A0xc5e8855cc5af5773!2zMTAyNSDEkC4gTMOqIMSQ4bupYyBUaOG7jSwgUGjGsOG7nW5nIDE2LCBHw7IgVuG6pXAsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1698742719096!5m2!1svi!2s" 
                            width="1220" 
                            height="450" 
                            className="border:0; w-100" 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerpolicy="no-referrer-when-downgrade">

                  </iframe>
                    
                </div>
                <div className='col-12 mt-5'>
                  <div className='contact-inner-wrapper d-flex justify-content-between'>
                    <div>
                      <h3 className='contact-title mb-4'> LIÊN HỆ</h3>
                      <form action='' onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                          <CustomInput 
                                type='text' 
                                name="Firstname"
                                className='form-control' 
                                placeholder='Ho'
                                value={formik.values.name}
                                onChange={formik.handleChange("name")}
                                onBlur={formik.handleBlur("name")}
                                />
                                <div className="error mt-2">
                                    {formik.touched.name && formik.errors.name}
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
        
                                <textarea 
                                        name='comments'
                                        id=''
                                        className='w-100 form-control mt-4'
                                        cols={30}
                                        rows={6}
                                        placeholder='Ghi chú'
                                        value={formik.values.comment}
                                        onChange={formik.handleChange("comment")}
                                        onBlur={formik.handleBlur("comment")}
                                
                                ></textarea>
                                 <div className="error mt-2">
                                {formik.touched.comment && formik.errors.comment}
                            </div>
                                
                                <div>
                                    <button className="button border-0">Gửi</button>
                                </div>
                             
                              
                      </form>
                    </div>
                    <div>
                      <h3 className='contact-title mb-4'> ĐỊA CHỈ</h3>
                      <div>
                            <ul className='ps-0'>
                                <li className='  mb-4 d-flex gap-15 align-items-center'>
                                  <IoHome  className='fs-5'/>
                                  <address>1025, Lê Đức Thọ, Phường 16, Quận Gò Vấp, Thành phố Hồ Chí Minh</address>
                                </li>
                                <li className=' mb-4 d-flex gap-15 align-items-center'>
                                  <FaPhoneVolume  className='fs-5'/>
                                  <a  className=' mb-0' href='(+84) 033 5211 248'>(+84) 033 5211 248</a>
                                </li>
                                <li className=' mb-4 d-flex gap-15 align-items-center'>
                                  <IoIosMail  className='fs-5'/>
                                  <a href='Mail:Traicay24h@gamil.com'>Email: Traicay24h@gamil.com</a>
                                </li>
                                <li className=' mb-4 d-flex gap-15 align-items-center'>
                                  <IoInformationCircleSharp  className='fs-5'/>
                                  <p>Mon-Sat 9:00AM - 8:00PM</p>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                    
                  </div>
                </div>
               

            </div>
      
      </Container>
    </>
  )
}

export default Contact
