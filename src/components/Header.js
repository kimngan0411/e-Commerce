import { React, useEffect, useState } from "react";
import { NavLink,Link, useNavigate } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
import compare from "../images/compare.svg"
import wislist from "../images/wishlist.svg"
import user from '../images/user.svg'
import cart from '../images/cart.svg'
import { useDispatch, useSelector } from "react-redux";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getAProduct } from "../features/products/productSlice";

const Header = () => {
    const dispatch = useDispatch();  
    const cartState = useSelector((state)=> state?.auth?.cartProducts)
    const productState = useSelector((state)=> state?.product?.product)
    const authState = useSelector((state) => state?.auth);
    const [total, setTotal]= useState(null)
    const [productOpt, setProductOpt]=useState([])
    const navigate= useNavigate()
    useEffect(() => {
        let sum= 0;
        for (let index = 0; index < cartState?.length; index++) {
            sum= sum+(Number(cartState[index].quantity)*Number(cartState[index].price));
            setTotal(sum)
        }
      }, [cartState]);

    const handleLogout = ()=>{
        localStorage.clear()
        window.location.reload()
    }
    const [paginate, setPaginate] = useState(true);
    //const options = range(0, 1000).map((o) => `Item ${o}`);

    useEffect(()=>{
        let data=[]
        for (let index = 0; index < productState?.length; index++) {
            const element = productState[index];
            data.push({id:index, prod:element?._id,name:element?.title})
        }
        setProductOpt(data)
    },[productState])
  return  (
  <>
    <header className='header-top-strip ' >
        <div className='container-xxl'>
            <div className='row'>
                <div className='col-6'>
                    <p className='text-white mb-0'>Liên hệ đặt hàng</p>
                </div>
                <div className='col-6'>
                    <p className='text-end text-white mb-0'> Hotline : <a  className='text-white mb-0' href='(+84) 033 5211 248'>(+84) 033 5211 248</a></p>
                </div>

            </div>
        </div>
    </header>
    <header className='header-upper py-3'>
        <div className='container-xxl'>
            <div className='row align-items-center'>
                <div className='col-2'>
                    <h1>
                        <Link className='text-white '> TRÁI CÂY</Link>
                    </h1>
                </div>
                <div className='col-5'>
                    <div className="input-group ">
                    <Typeahead
                        id="pagination-example"
                        onPaginate={() => console.log('Results paginated')}
                        onChange={(selected) =>{
                            navigate(`/product/${selected[0]?.prod}`)
                            dispatch(getAProduct(selected[0]?.prod))
                        }}
                        options={productOpt}
                        paginate={paginate}
                        labelKey={"name"}
                        minLength={2}
                        placeholder="Tìm Kiếm..."
                    />
                    <span className="input-group-text p-2" id="basic-addon2">
                        <BsSearch className='fs-3'/>
                    </span>
                </div>
                </div>
                <div className='col-5'>
                    <div className='header-upper-links d-flex align-items-center justify-content-between'>
                        <div>
                            {/* <Link  
                                to="/compare-product"
                                className='d-flex align-items-center gap-10 text-white'
                            >
                                <img src={compare} alt='compare'/>
                                 <p className='mb-0'>Làm  Mới</p>
                            </Link> */}
                        </div>
                        <div>
                            <Link  
                                to="/wishlist"
                                className='d-flex align-items-center gap-10 text-white'>
                                <img src={wislist} alt='wishlist'/>
                                 <p className='mb-0'>Yêu Thích</p>
                            </Link>
                        </div>
                        <div>
                            <Link  
                                to={ authState?.user===null ? "/login" : "/my-profile"}
                                className='d-flex align-items-center gap-10 text-white'>
                                <img src={user} alt='user' className=''/>  
                                 {
                                    authState?.user===null ? 
                                    <p className='mb-0'> Đăng Nhập</p> :
                                    <p className='mb-0'> Chào!, {authState?.user?.lastname}</p>
                                 }
                            </Link>
                        </div>
                        <div>
                            <Link 
                                 to="/cart"
                                className='d-flex align-items-center gap-10 text-white'>
                                <img src={cart} alt='cart'/>  
                                <div className='d-flex flex-column gap-10'>
                                    <span className='badge bg-white text-black'>{cartState?.length ? cartState?.length : 0}</span>
                                    <p className='mb-0' >{total? total : 0}</p>
                                    
                                </div>
                            </Link>
                        </div>

                    </div>
                </div>
            

            </div>
        </div>
    </header>
    <header className='header-button py-3 ' >
        <div className='container-xxl'>
            <div className='row'>
                <div className='col-12 '>
                    <div className='menu-bottom d-flex align-items-center gap-30'>
                        <div> 
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle bg-transparent border-0 " 
                                    type="button" 
                                    data-bs-toggle="dropdown" 
                                    aria-expanded="false"
                                >
                                    Danh Mục Sản Phẩm
                                </button>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="">Action</Link></li>
                                    <li><Link className="dropdown-item" to="">Another action</Link></li>
                                    <li><Link className="dropdown-item" to="">Something else here</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className='menu-links'>
                            <div className='d-flex align-items-center gap-15'>
                                <NavLink to="/">TRANG CHỦ</NavLink>
                                <NavLink to="/product">SẢN PHẨM</NavLink>
                                <NavLink to="/blog">BÀI VIẾT</NavLink>
                                <NavLink to="/contact">LIÊN HỆ</NavLink>
                                <NavLink to="/my-orders">CÁ NHÂN</NavLink>
                                <button onClick={handleLogout}className="border border-0 bg-transparent text-white text-upprecase" type="button">Đăng Xuất</button>
                            </div>
                        </div>


                    </div>

                </div>
            </div>
        </div>
    </header>
  </>
  );
}

export default Header
