import React, { useState } from 'react';

import { Link } from 'react-router-dom';
 
export const BlogCard =(props)=> {
  const{ id ,title, description, date, image}=props

  return (
    <div className=' blog-card'>
        <div className='blog-card'>
          <div className='card-image'>
          <img 
              src={image ? image : "https://res.cloudinary.com/dxcmq30si/image/upload/v1697532794/web_fruit/wtgziabergdo8no5faxv.jpg"}
              alt="blogs"
              className='img-fluid w-100 '
          />
          </div>   
        </div>
        <div className='blog-content'>
            <p className='date'>{date}</p>
            <h5 className='title'>{title}</h5>
            <p className='des'
             dangerouslySetInnerHTML={{__html: description?.substr(0,70) + "...",}}></p>
             <Link to={'/blog/'+ id} className='button'>Xem Thêm</Link>      
        </div> 
                
        
    </div>
  )
}

export default BlogCard;
