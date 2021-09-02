import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './product.css';


function Product({ product, isAdmin, deleteProduct, handleCheck }) {

    const params = useParams()
    const actionRouter = () => {
        return (
            <>
                <div className="home__product-label">
                    <i className="fas fa-check"></i>
                    Yêu thích
                </div>

                <div className="home__product-sale">
                    <span className="num-sale">{product.sale}%</span><br></br>
                    <span className="sale">Giảm</span>
                </div>
            </>
        )
    }
 
    return (
        <>
            {
                isAdmin? 
                <div className="home__product-check">
                    <input type="checkbox" checked={product.checked} 
                    onChange={()=>handleCheck(product._id)} />
                    <button onClick={()=>deleteProduct(product._id,product.images.url)}>Xóa sản phẩm</button>
                </div>:null
            }
            <Link to={`/detail/${product._id}`} className="home__product-link">

                <img src={product.images.url} alt="" className="home__product-img" />
                <div className="home__product-name">
                    {product.title}
                </div>
                <div className="home__product-desc">
                    {product.description}
                </div>
                <div className="home__product-price">
                    <span className="home__product-price-old">{Intl.NumberFormat().format(product.price)} đ</span>
                    <span className="home__product-price-new">{Intl.NumberFormat().format(Math.round(product.currentPrice/1000)*1000)} đ</span>
                </div>
                <div className="home__product-action">
                    <div className="home__product-like">
                        <i className="product-like-icon fas fa-heart"></i>
                    </div>
                    <div className="home__product-vote">
                        Đã bán  <span>x {product.sold}</span>
                    </div>
                </div>
                <div className="home__product-origin">
                    <div className="home__product-brand">{product.brand}</div>
                    <div className="home__product-country">{product.origin}</div>
                </div>

                {
                    Object.keys(params).length === 0 ? actionRouter() : ''
                }
            </Link>
        </>
    );
}


export default Product;

