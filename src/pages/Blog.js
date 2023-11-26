import { React, useEffect, useState } from "react";
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import BlogCard from '../components/BlogCard'
import { useDispatch, useSelector } from "react-redux";
import {getAllBlogs} from "../features/blogs/blogSlice"
import moment from "moment"
import Container from "../components/Container";

const Blog = () => {
  const blogState = useSelector((state) => state.blog?.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    getblogs();
  }, []);
  const getblogs=() => {
    dispatch(getAllBlogs());
  }
  return (
    <>
      <Meta title={" Blog"}/>
      <BreadCrumb title=" Blog"/>
      <Container class1='store-wrapper home-wrapper-2 py-5'>
        <div className='row'>
            <div className='col-3'>
                    <div className='filter-card mb-3'>
                      <h3 className='filter-title'>Danh Mục</h3>
                        <div>
                          <ul className='ps-0'>
                            <li>Trái Cây Tươi</li>
                            <li>Trái Cây Khô</li>
                            <li>Trái Cây Nhập Khẩu</li>
                            <li>Quà Tặng Trái Cây</li>
                            <li>Hộp Quà Trái Cây</li>
                          </ul>
                        </div>
                    </div>
            </div>
            <div className='col-9'>
              <div className='row'>
                  
                { blogState&&
                  blogState?.map((item,index) => {
                  return (
                    <div className='col-6 mb-3' key={index}>
                      <BlogCard  
                        id={item?._id} 
                        title={item?.title} 
                        description={item?.description } 
                        image={item?.images?.[0]?.url}
                        date={moment(item?.createdAt).format(
                          'MMMM Do YYYY, h:mm:ss a')
                        }
                      />
                    </div>
                  )
            })
          }
          
          
        </div>
                        
        </div>
        </div>

      </Container>
       
      
    </>
  )
}

export default Blog
