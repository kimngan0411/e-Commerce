import React from 'react'
//import { MdEmail } from "react-icons/md";
import { SiMinutemailer } from "react-icons/si";
import { Link } from 'react-router-dom';
//import { BsSearch } from 'react-icons/bs'
import { SlSocialInstagram,SlSocialSkype,SlSocialFacebook } from "react-icons/sl";
import { FaYoutube } from "react-icons/fa";
const Footer = () => {
  return (
    <>
      <footer className='py-4'>
      <div className='container-xxl'>
            <div className='row'>
                <div className='col-5'>
                  <div className='footer-top-data d-flex gap-30 align-items-center'>
                    <SiMinutemailer  color='white' size={40}/>
                    <h2 className='mb-0 text-white'>Đăng ký để nhận bản tin</h2>
                  </div>
                </div>
                <div className='col-7'>
                    <div>
                        <div className="input-group ">
                            <input 
                                type="text" 
                                className="form-control py-2" 
                                placeholder="Email" 
                                aria-label="Email" 
                                aria-describedby="basic-addon2"/>
                            <span className="input-group-text p-2" id="basic-addon2"> Đăng Ký 
                                {/* < MdEmail className='fs-3'/> */}
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>

      </footer>
      <footer className='py-4'>
        <div className='container-xxl'>
            <div className='row'>
                <div className='col-5'>
                    <h4 className="text-white mb-4">Liên Hệ </h4>
                    <div>
                        <address className="text-white fs-6">1025, Lê Đức Thọ, Phường 16, Quận Gò Vấp, <br />Thành phố Hồ Chí Minh</address>
                        <a className="text-white mt-2 d-block mb-3" href='Sdt: (+84) 033 5211 248'>Liện Hệ: (+84) 033 5211 248</a>
                        <a className="text-white mt-2 d-block mb-3" href='Mail:Traicay24h@gamil.com'>Email: Traicay24h@gamil.com</a>
                        <div className='social-icons d-flex align-items-center gap-30'>
                            <a href=''>< FaYoutube size={30}/></a>
                            <a href=''><SlSocialInstagram size={30}/></a>
                            <a href=''><SlSocialSkype size={30} /></a>
                            <a href=''><SlSocialFacebook size={30}/></a>
                        </div>
                    </div>
                </div>
                <div className='col-5'>
                    <h4 className="text-white mb-4">Thông Tin</h4>
                    <div className='footer-links d-flex flex-column'>
                        <Link className='text-white py-2 mb-1'>Giới Thiệu</Link>
                        <Link className='text-white py-2 mb-1'>Thắc Mắc</Link>
                        <Link className='text-white py-2 mb-1'>Liên Hệ</Link>
                        <Link className='text-white py-2 mb-1'>Bài Viết</Link>
                        
                    </div>
                </div>
                <div className='col-2'>
                    <h4 className="text-white mb-4">Tìm kiếm Nhanh</h4>
                    <div className='footer-links d-flex flex-column'>
                        <Link className='text-white py-2 mb-1'>Trái Cây Tươi</Link>
                        <Link className='text-white py-2 mb-1'>Trái Cây Nhập Khẩu</Link>
                        <Link className='text-white py-2 mb-1'>Trái Cây Sấy</Link>
                        <Link className='text-white py-2 mb-1'>Hộp Quà Trái Cây</Link>
                        <Link className='text-white py-2 mb-1'>Giỏ Quà Trái Cây</Link>
                    </div>
                </div>


            </div>
        </div>
      </footer>
      <footer className=' py-4'>
      <div className='container-xxl'>
            <div className='row'>
                <div className='col-12'>
                    <p className='text-center mb-0 text-white'>
                        &copy; {new Date().getFullYear()}. Tiệm Trái Cây
                    </p>
                    
                </div>

            </div>
        </div>
      </footer>
    </>
  )
}

export default Footer

