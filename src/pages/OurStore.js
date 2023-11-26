import { React, useEffect, useState } from "react";
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import ProductCard from '../components/ProductCard'
import Color from '../components/Color.js'
import Container from '../components/Container'
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from '../features/products/productSlice'
const OurStore = () => {
  const [grid, setGrid]= useState(4);
  const productState = useSelector((state) => state?.product?.product);
  // const catState = useSelector((state) => state.pCategory.pCategories);
  // const brandState = useSelector((state) => state.brand.brands);
  // console.log( productState);
  const[brands, setBrands]=useState([])
  const[categories, setCategories]=useState([])
  const [tags, setTags]=useState([])


  // tim kiem
  const [tag, setTag]=useState(null)
  const[category, setCategory]=useState(null)
  const[brand, setBrand]=useState(null)
  const [minPrice,setMinPrice]=useState(null)
  const [maxPrice,setMaxPrice]=useState(null)
  const [sort,setSort]=useState(null)
  console.log(sort);
  useEffect(() => {
    let newBrands=[]
    let category=[]
    let newtags=[]
   for (let index = 0; index < productState?.length; index++) {
    const element = productState[index];
    newBrands.push(element.brand)
    category.push(element.category)
    newtags.push(element.tags)
   } 
   setBrands(newBrands)
   setCategories(category)
   setTags(newtags)
  }, [productState]);

//  console.log([...new Set(brands)],[...new Set(categories)],[...new Set(tags)]);

  const gridSecter=(i)=>{
    setGrid(i)
  }
  const dispatch = useDispatch();
  useEffect(() => {
    getProducts();
  }, [sort,tag,brand,category,minPrice,maxPrice]);
  const getProducts=() =>{
    dispatch( getAllProducts({sort,tag,brand,category,minPrice,maxPrice}));
  }
  
  return (
    <>
      <Meta title={" Our Store"}/>
      <BreadCrumb title=" Our Store"/>
      <Container class1='store-wrapper home-wrapper-2 py-5'>
        
          <div className='row'>
                <div className='col-3'>
                    <div className='filter-card mb-3'>
                      <h3 className='filter-title'>Danh Mục</h3>
                        <div>
                          <ul className='ps-0'>
                          {/* console.log([...new Set(brands)],[...new Set(categories)],[...new Set(tags)]); */}
                          {
                            categories && [...new Set(categories)].map((index,item) =>{
                              return <li key={index} onClick={()=>setCategory(item)}>{item}</li>
                            })
                          }
                          
                          </ul>
                        </div>
                    </div>
                    <div className='filter-card mb-3'>
                      <h3 className='filter-title'>Tìm kiếm </h3>
                      <div>
                        <h5 className='sub-title'>Bởi</h5>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="" />
                            <label className="form-check-label" htmlFor="">Check me out</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="" />
                            <label className="form-check-label" htmlFor="">Check me out</label>
                        </div>
                      </div>
                      <h5 className='filter-title'>Giá Tiền</h5>
                      <div className='d-flex align-items-center gap-10'>
                        <div className="form-floating mb-3">
                          <input 
                            type="number" 
                            className="form-control py-1" 
                            id="floatingInput" 
                            placeholder="Từ" 
                            onChange={(e) =>setMinPrice(e.target.value)}
                          />
                          <label htmlFor="floatingInput">Từ</label>
                        </div>
                        <div className="form-floating mb-3">
                          <input 
                            type="number" 
                            className="form-control py-1" 
                            id="floatingInput1" 
                            placeholder="Đến" 
                            onChange={(e) =>setMaxPrice(e.target.value)}
                          />
                          <label htmlFor="floatingInput">Đến</label>
                        </div>
                      </div>
                      <h5 className='sub-title'>Thương Hiệu</h5> 
                        <div>
                        {
                            brands && [...new Set(brands)].map((index,item) =>{
                              return (
                                <span key={index} onClick={()=>setBrand(item)} className="badge bg-light text-secondary rounded-3 py-2 px-3">
                                  {item}

                                </span>

                              )
                            })
                          }
                        </div>
                      <h5 className='sub-title'>Tags</h5> 
                        <div>
                        {
                            tags && [...new Set(tags)].map((index,item) =>{
                              return (
                                <span key={index} onClick={()=>setTag(item)} className="badge bg-light text-secondary rounded-3 py-2 px-3">
                                  {item}

                                </span>

                              )
                            })
                          }
                        </div>
                      </div>
                       
                </div>
                    
                
                <div className='col-9'>
                   <div className='filter-sort-grid'>
                    <div className='d-flex justify-content-between align-items-center'>
                      <div className='d-flex align-items-center gap-10'>
                        <p className='mb-0 d-block'> Sort By:</p>
                        <select 
                          name="" 
                          
                          className='form-control form select' 
                          id=''
                          onChange={(e)=>setSort(e.target.value)}>
                          <option value="best-selling"> Bán Chạy</option>
                          <option value="manual">Featured</option>
                          <option value="title">A-Z</option>
                          <option value="-title">Z-A</option>
                          <option value="-price">Giá Cao-Thấp</option>
                          <option value="price">Giá Thấp-Cao</option>
                        </select>

                    </div>
                    </div>
                   </div>
                   <div className='product-list pd-5 mt-4'>
                    <div className='d-flex gap-10 flex-wrap'>
                      <ProductCard data={productState ? productState:[] } gird={grid}/>

                    </div>

                   </div>
                </div>
          </div>
        
      </Container>
      
    </>
  )
}

export default OurStore
