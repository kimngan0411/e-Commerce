import { React, useEffect, useState } from "react";
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import Container from '../components/Container'
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../features/user/userSlice";
import { FaEdit } from "react-icons/fa";

let profileSchema = yup.object().shape({
    firstname: yup
        .string()
        .required("Chưa nhập họ"),
    lastname: yup.string().required("Chưa nhập tên"),
    email: yup.string().nullable().email("Email phải hợp lệ").required("Chưa nhập email"),
    mobile: yup.string().required("Chưa nhập số điện thoại"),
  });
const Profile = () => {
    const dispatch = useDispatch();
    const [edit,setEdit]= useState(true)
    const userState = useSelector((state) => state?.auth?.user);
   
    const formik = useFormik({
        enableReinitialize:true,
        initialValues: {
          firstname: userState?.firstname,
          lastname: userState?.lastname,
          email: userState?.email,
          mobile:userState?.mobile,
        },
        validationSchema: profileSchema,
        onSubmit: values => {
            dispatch(updateProfile(values))
            setEdit(true)
            // alert(JSON.stringify(values, null, 2));
        },
      });
  return (
    <>
      <BreadCrumb title=" ProFile"/>
      <Container class1='profile-wrapper home-wrapper-2 py-5'>
        <div className="row">
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="my-3">Thông tin người dùng hihi</h3>
                <FaEdit className="fs-3" onClick={()=>setEdit(false)}/>
            </div>
            <div className="col-12">
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="example1" className="form-label">Họ</label>
                    <input type="text" disabled={edit} name='firstname' className="form-control" id="example1" aria-describedby="example1"
                        value={formik.values.firstname}
                        onChange={formik.handleChange("firstname")}
                        onBlur={formik.handleBlur("firstname")}/>
                    <div className="error mt-2">
                                {formik.touched.firstname && formik.errors.firstname}
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="example2" className="form-label">Tên</label>
                    <input type="text" disabled={edit} name='lastname' className="form-control" id="example2" aria-describedby="example1"value={formik.values.lastname}
                             onChange={formik.handleChange("lastname")}
                             onBlur={formik.handleBlur("lastname")}
                            />
                            <div className="error mt-2">
                                {formik.touched.lastname && formik.errors.lastname}
                            </div>
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" disabled={edit} name='email'className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"value={formik.values.email}
                                onChange={formik.handleChange("email")}
                                onBlur={formik.handleBlur("email")}
                            />
                            <div className="error mt-2">
                                {formik.touched.email && formik.errors.email}
                            </div>
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword12" className="form-label">Số Điện Thoại</label>
                    <input type="number" disabled={edit} name='mobile' className="form-control" id="exampleInputPassword12"placeholder='Số Điện Thoại'value={formik.values.mobile}
                                onChange={formik.handleChange("mobile")}
                                onBlur={formik.handleBlur("mobile")}
                            />
                            <div className="error mt-2">
                                {formik.touched.mobile && formik.errors.mobile}
                            </div>
                </div>
                
                {
                    edit===false && <button type="submit" className="btn btn-primary">Lưu</button>
                }
                </form>

            </div>

        </div>
      </Container>
    </>
  )
}

export default Profile
