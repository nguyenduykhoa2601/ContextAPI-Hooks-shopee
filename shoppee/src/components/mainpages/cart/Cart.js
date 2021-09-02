import React, { useContext, useEffect, useState } from 'react';
import './Cart.css'
import { GlobalState } from '../../../GlobalState'
import {Link} from 'react-router-dom'
import emptyCart from '../../../img/empty-cart.jpg'

import axios from 'axios';
import AOS from 'aos';
import "aos/dist/aos.css"

function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)
    useEffect(()=>{
        AOS.init({duration: 1000})
    },[])
    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)
            setTotal(total)
        }
        getTotal()
    }, [cart])
    const addToCart = async (cart) => {
        await axios.patch('/user/addcart', { cart }, {
            headers: { Authorization: token }
        })
    }
    const increment = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity += 1
            }
        })
        setCart([...cart])
        addToCart(cart)

    }
    const decrement = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }
    const deleteItem = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không ?")) {
            cart.forEach((item, index) => {
                if (item._id === id) {
                    cart.splice(index, 1)
                }
            })
            setCart([...cart])
            addToCart(cart)
        }

    }
    // const tranSuccess = async (payment) => {
    //     const { paymentID, address } = payment;

    //     await axios.post('/api/payment', { cart, paymentID, address }, {
    //         headers: { Authorization: token }
    //     })

    //     setCart([])
    //     addToCart([])
    //     alert("Bạn đã thanh toán thành công")
    // }
    const isEmpty = () => {
        if (cart.length === 0) {
            return (
                <div className="empty-cart">
                    <img src={emptyCart} alt="" />
                </div>
            )
        }
        else {
            return (
                <table className="detail__cart">
                    <thead>
                        <tr className="detail__cart-heading">
                            <th className="cart__heading-ordinal">STT</th>
                            <th className="cart__heading-detail-item">Thông tin sản phẩm</th>
                            <th className="cart__heading-price-item">Đơn giá</th>
                            <th className="cart__heading-numberous">Số lượng</th>
                            <th className="cart__heading-total">Thành tiền</th>
                            <th className="cart__heading-action">Thao tác</th>
                        </tr>
                        <tr><th colSpan="6" className="line-spacing"></th></tr>
                    </thead>
                    <tbody className="detail__cart-body">
                        {
                            cart.map((item, index) => {
                                return (
                                    <tr className="detail__item" data-aos="fade-in" key={index}>
                                        <td>{index + 1}</td>
                                        <td className="detail__item-summarize">
                                            <img className="detail__item-img" src={item.images.url} alt="" />
                                            <div className="detail__item-info">
                                                <div className="detail__item-title">{item.title}</div>
                                                <div className="detail__item-description">{item.description}</div>
                                            </div>
                                        </td>
                                        <td>{Intl.NumberFormat().format(item.price)} đ</td>
                                        <td className="detail__item-control-numberous">
                                            <span className="decrement" onClick={() => decrement(item._id)}>-</span>
                                            <span className="current">{item.quantity}</span>
                                            <span className="increment" onClick={() => increment(item._id)}>+</span>
                                        </td>
                                        <td>
                                            {Intl.NumberFormat().format(item.price * item.quantity)} đ
                                        </td>
                                        <td className="detail__item-delete" onClick={() => deleteItem(item._id)}>
                                            Xóa
                                        </td>

                                    </tr>

                                )
                            })
                        }

                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="detail__cart-total-text">Tổng tiền : </td>
                            <td className="detail__cart-total-number"><span>{Intl.NumberFormat().format(total)}</span> đ</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td colSpan="6" data-aos="flip-up">
                                <Link to="/order" className="orderNow">
                                    Thanh toán ngay
                                </Link>
                            </td>
                        </tr>
                    </tbody>

                </table>
            )
        }
    }
    return (
        <div className="grid">
            <div className="cart">
                <div className="cart__heading">{cart.length === 0 ? 'Giỏ hàng của bạn đang rỗng' : 'Thông tin giỏ hàng'}</div>
                {isEmpty()}



            </div>


        </div>
    );
}

export default Cart;
