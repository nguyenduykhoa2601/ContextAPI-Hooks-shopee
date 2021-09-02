import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState'
import ItemsCarousel from 'react-items-carousel';
import { Link } from 'react-router-dom'
import './detailProduct.css'

import Product from '../utils/product/Product';
import AOS from 'aos'
import "aos/dist/aos.css"
function DetailProduct() {

    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const params = useParams()
    const addCart = state.userAPI.addCart
    const [isAdmin] = state.userAPI.isAdmin
    const [detailProduct, setDetailProduct] = useState([])
    const chevronWidth = 40;
    const [activeItemIndex, setActiveItemIndex] = useState(0)
    const scrollClass = useRef(null)
    const scrollItem = () => {
        scrollClass.current.scrollIntoView()
    }
    useEffect(()=>{
        AOS.init({duration:2000})
    },[])
    useEffect(() => {
       
        if (params.id) {
            products.forEach(product => {
                if (product._id === params.id) setDetailProduct(product)
            })
        }
    }, [params.id, products])

    if (detailProduct.length === 0) return null;

    const routerAdmin = () => {
        if (isAdmin) {
            return (
                <Link className="product__add-cart-link" to={`/edit_product/${detailProduct._id}`}>
                    <i className="product__add-icon fas fa-cart-plus"></i>
                    Sửa sản phẩm &nbsp;&nbsp;&nbsp;&nbsp;
                </Link>
            )
        }
        else {
            return (
                <div className="product__add-cart" onClick={() => addCart(detailProduct)}>
                    <i className="product__add-icon fas fa-cart-plus"></i>
                    Thêm vào giỏ hàng
                </div>
            )
        }
    }
    return (


        <div className="detail">
            <div className="grid" ref={scrollClass}>
                <div className="detail__product">
                    <div className="product__img" alt="" >
                        <img src={detailProduct.images.url} alt="" />
                    </div>
                    <div className="product__info">
                        <div className="product__info-title">{detailProduct.title}</div>
                        <div className="product__info-desc">{detailProduct.description}</div>
                        <div className="product__info-content">{detailProduct.content}</div>
                        <div className="product__info-price">
                            <div>{Intl.NumberFormat().format(Math.round(detailProduct.currentPrice))} đ</div>
                            <div>Đã bán <span>x {detailProduct.sold}</span></div>
                            </div>
                        <div className="product__info-action">
                            <div className="product__info-numberous">
                               
                               
                            </div>
                            {
                                routerAdmin()
                            }

                        </div>
                    </div>

                </div>
            </div>
            <div className="related__product" data-aos="fade-down">
                <div className="related__product-heading">Có thể bạn đang tìm?</div>
                <div style={{ padding: `0 ${chevronWidth}px` }}>
                    <ItemsCarousel
                        requestToChangeActive={setActiveItemIndex}
                        activeItemIndex={activeItemIndex}
                        numberOfCards={6}
                        gutter={20}
                        leftChevron={<button className="control-slider">{'<'}</button>}
                        rightChevron={<button className="control-slider">{'>'}</button>}
                        activePosition='right'
                        alwaysShowChevrons={true}
                        slidesToScroll={2}
                        outsideChevron
                        chevronWidth={chevronWidth}
                        

                    >
                        {
                            products.map(product => {
                                return product.category === detailProduct.category
                                    ?
                                    <div className="related-product" onClick={scrollItem} key={product._id}>
                                        <Product product={product} />
                                    </div>
                                    : null
                            })
                        }

                    </ItemsCarousel>
                </div>
            </div>
        </div>


    );
}

export default DetailProduct;
