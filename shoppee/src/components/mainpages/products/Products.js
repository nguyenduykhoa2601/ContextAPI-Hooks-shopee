import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import Loading from '../utils/loading/Loading';
import Product from '../utils/product/Product';
import Filter from './filter/Filter';
import './products.css';


function Products() {
    const state = useContext(GlobalState)
    const [products, setProducts] = state.productsAPI.products
    const [categoryProducts, setCategoryProducts] = useState([])
    const [categories] = state.categoriesAPI.categories
    const [token] = state.token
    const [isAdmin] = state.userAPI.isAdmin
    const [callback, setCallback] = state.productsAPI.callback
    const [activeCategory, setActiveCategory] = useState('')
    const [isCheck, setIsCheck] = useState(false)
    const [loading] = useState(false)
    const [page, setPage] = state.productsAPI.page

    useEffect(() => {
        setCategoryProducts(products)
    }, [products])
    const handClickCategory = (category) => {
        if (category) {
            const categoryItem = products.filter(product => {
                return product.category === category._id
            })
            setCategoryProducts(categoryItem)
            setActiveCategory(category._id)
        }

    }
    console.log(products)

    const handleCheck = (id) => {
        products.forEach(product => {
            if (product._id === id) product.checked = !product.checked
        })
        setProducts([...products])
    }
    const selectAll = () => {
        products.forEach(product => {
            product.checked = !isCheck
        })
        setProducts([...products])
        setIsCheck(!isCheck)
    }
    const delectAll = () => {
        products.forEach(product => {
            if (product.checked) deleteProduct(product._id, product.images.public_id)
        })
    }

    const deleteProduct = async (id, public_id) => {
        try {

            const destroyImg = axios.post('/api/destroy', { public_id }, {
                headers: { Authorization: token }
            })
            const deleteProduct = axios.delete(`/api/products/${id}`, {
                headers: { Authorization: token }
            })

            await destroyImg
            await deleteProduct
            setCallback(!callback)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }



    if (loading) return <Loading />
    return (
        <div className="container">
            <div className="grid">
                <div className="grid__row">
                    <div className="grid__column-2">
                        <nav className="menu">
                            <div className="menu__heading">
                                <i className="fas fa-bars"></i>
                                Danh mục
                            </div>
                            <ul className="menu__list-categorioes" >
                                {
                                    categories.map((category, index) => {
                                        return (
                                            <li className={`menu__category ${activeCategory === category._id ? 'menu__category--active' : ''}`} key={index} onClick={() => { handClickCategory(category) }}>
                                                <div className="menu__category-link">
                                                    {category.name}
                                                </div>
                                            </li>
                                        )

                                    })


                                }
                            </ul>


                        </nav>
                    </div>
                    <div className="grid__column-10">
                        <Filter products={products} />
                        {
                            isAdmin ?
                                <div className="grid__row grid__row--select">
                                    <button className="select-all" onClick={selectAll}>Chọn tất cả</button>
                                    <button className="detele-all" onClick={delectAll}>Xóa tất cả</button>
                                </div> : null
                        }
                        <div className="grid__row">

                            {
                                categoryProducts.map((product, index) => {
                                    return (
                                        <div className="grid__column-item-2" key={index}>
                                            <div className="item">
                                                <Product product={product} isAdmin={isAdmin} handleCheck={handleCheck} deleteProduct={deleteProduct} />
                                            </div>
                                        </div>
                                    )
                                })
                            }


                        </div>
                        <div className="pages">
                            {
                                products.length >= page * 1000
                                    ?
                                <button className="pages__load-more" onClick={() => setPage(page + 1)}>Xem thêm ...</button> :""
                            }

                        </div>
                    </div>
                </div>

            </div>
        </div >
    );

}

export default Products;