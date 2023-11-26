import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import Color from '../components/Color.js'
import Container from '../components/Container'
const CompareProduct = () => {
  return (
    <>
      <Meta title={"Compare products"}/>
      <BreadCrumb title="Compare products"/>
      <Container class1='compare-product-wrapper py-5 home-wrapper-2'>
        
            <div className='row'>
                <div className='col-3 d-flex mt-3 gap-30'>
                    <div className='compare-product-card position-relative'>
                        <img src='images/cross.svg' alt='cross' className='position-absolute cross img-fluid'/>
                        <div className='product-card-img'>
                            <img src='images/watch.jpg' alt='watch'/>
                        </div>
                        <div className='compare-product-details'>
                            <h5 className='tittle'>Dong ho gia re nam nu</h5>
                            <h6 className='price mb-3 mt-3'>100.000</h6>
                            <div className='product-detail'>
                                <h5>Màu Sắc</h5>
                                <Color />
                            </div>
                            <div className='product-detail'>
                                <h5>Xuất Xứ</h5>
                                <p>Việt Nam</p>
                            </div>

                        </div>
                        
                    </div>
                    <div className='compare-product-card position-relative'>
                        <img src='images/cross.svg' alt='cross' className='position-absolute cross img-fluid'/>
                        <div className='product-card-img'>
                            <img src='images/watch.jpg' alt='watch'/>
                        </div>
                        <div className='compare-product-details'>
                            <h5 className='tittle'>Dong ho gia re nam nu</h5>
                            <h6 className='price mb-3 mt-3'>100.000</h6>
                            <div className='product-detail'>
                                <h5>Màu Sắc</h5>
                                <Color />
                            </div>
                            <div className='product-detail'>
                                <h5>Xuất Xứ</h5>
                                <p>Việt Nam</p>
                            </div>

                        </div>
                        
                    </div>
                </div>
                

            </div>
      </Container>
    </>
  )
}

export default CompareProduct
