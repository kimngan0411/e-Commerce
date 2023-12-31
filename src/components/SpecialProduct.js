import React from 'react'
import ReactStars from "react-rating-stars-component";
import{Link} from "react-router-dom"
const SpecialProduct = (props) => {
    const{ title,brand,totalrating,price,sold, quantity,id,images}=props
  return (
    <div className='col-6 mb-3'>
        <div className='special-product-card'>
            <div className='d-flex justify-content-between'>
                <div>
                    <img src={images} className='img-fluid' width={500} height={300}/>
                </div>
                <div className='special-product-content'>
                    <h5 className='brand'>{brand}</h5>
                    <h6 className='title'>{title}</h6>
                    <ReactStars
                        count={5}
                        value={totalrating}
                        edit={false}
                        size={24}
                        activeColor="#ffd700"
                    />
                    <p className='price'>
                        <span className='red-p'>{price} Đồng</span> &nbsp;
                        {/* <strike>65.000</strike> */}
                    </p>
                    <div className='discount-till d-flex align-content-center gap-10'>
                        <p className='mb-0'>
                            <b>5</b>ngày
                        </p>
                        <div className='d-flex gap-10 align-items-center'>
                            <span className='badge rounded-circle p-3 bg-danger'>1</span>:
                            <span className='badge rounded-circle p-3 bg-danger'>1</span>:
                            <span className='badge rounded-circle p-3 bg-danger'>1</span>
                        </div>
                        

                    </div>
                    <div className='prod-count my-3'>
                            <p>
                              Sản Phẩm:  { quantity}
                            </p>
                            <div className="progress">
                                <div className="progress-bar" 
                                    role="progressbar" 
                                    style={{width: quantity/ quantity + sold *100 + "%"}} 
                                    aria-valuenow={ quantity/ quantity + sold *100} 
                                    aria-valuemin={ quantity} 
                                    aria-valuemax={sold +quantity}></div>
                            </div>

                    </div>
                    <Link to={"/product/" + id} className='button'>Xem</Link>
                 </div>
            </div>
        </div>
      
    </div>
  )
}

export default SpecialProduct
