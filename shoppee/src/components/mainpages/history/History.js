import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
import './history.css';
import Loading from '../utils/loading/Loading'
import AOS from 'aos'
import "aos/dist/aos.css"
const History = () => {
    const state = useContext(GlobalState)
    const [history, setHistory] = useState([])
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = useState(false)
    const [filter, setFilter] = useState('-1')
    const [loading, setLoading] = useState(false)
    const [allHistory, setAllHistory] = useState([])
    console.log(typeof (filter))
    useEffect(()=>{
        AOS.init({duration : 2000})
    },[])
    useEffect(() => {
        if (token) {
            const getHistory = async () => {
                if (isAdmin) {

                    const res = await axios.get('/api/payment', {
                        headers: { Authorization: token }
                    })

                    setHistory(res.data)
                    setAllHistory(res.data.reverse())


                }
                else {

                    const res = await axios.get('/user/history', {
                        headers: { Authorization: token }
                    })
                    setHistory(res.data)
                    setAllHistory(res.data.reverse())

                }
            }
            getHistory()
        }
    }, [token, isAdmin, callback])
    useEffect(() => {

        if (filter === '1') {
            const confirmHistories = allHistory.filter(his => his.confirm === true)
            setHistory(confirmHistories)
        }
        else if (filter === '0') {
            const confirmHistories = allHistory.filter(his => his.confirm === false)
            setHistory(confirmHistories)
        }
        else {
            setHistory(allHistory)
        }
    }, [filter, allHistory])
    const deleteHistory = async (id) => {

        try {
            if (window.confirm('Bạn có chắc muốn xóa đơn này?')) {
                await axios.delete(`/api/payment/${id}`, {
                    headers: { Authorization: token }
                })
                alert('Xóa thành công')
                setCallback(!callback)
            }

        } catch (error) {
            alert(error.response.data.msg)
        }
    }
    const confirmOrder = async (id, confirm) => {
        try {
            setLoading(true)
            await axios.put(`/api/payment/${id}`, { confirm }, {
                headers: { Authorization: token }
            })
            setCallback(!callback)
            setLoading(false)

        } catch (error) {
            alert(error)
        }


    }
    if (loading) return <Loading />
    return (
        <div className="grid">
            <div className="history">
                <div className="history-heading" data-aos="flip-down">Thông tin đơn hàng</div>
                <div className="filter" data-aos="fade-left">
                    <select className="history-filter" value={filter} onChange={e => {
                        const valueFilter = e.target.value

                        setFilter(valueFilter)

                    }}>
                        <option value={-1}>Tất cả</option>
                        <option value={1}>Đã xác nhận</option>
                        <option value={0}>Chưa xác nhận</option>
                    </select>
                </div>

                <table className="history-detail" data-aos="fade-down">
                    <thead className="history__title">
                        <tr className="title">
                            <td className="STT">STT</td>
                            {
                                isAdmin ?
                                    <td style={{ width: "14%" }}>
                                        Thông tin người đặt
                                    </td> : null
                            }
                            <td className="address">Địa chỉ</td>
                            <td className="infor__contact">Thông tin liên lạc</td>
                            <td className="detail__order">Thông tin đơn hàng</td>
                            <td className="total__money">Thành tiền</td>
                            <td className="more__requirement">{isAdmin ? "Hành động" : "Tình trạng đơn hàng"}</td>
                        </tr>
                        <tr>
                            <td colSpan={isAdmin ? "7" : "6"} className="line"></td>
                        </tr>
                    </thead>


                    {
                        history.map((item, index) => {
                            return (
                                <tbody key={index}>
                                    <tr className={item.confirm ? 'history__order history__order--confirm' : 'history__order'} >
                                        <td className="history__oridinal">
                                            {index + 1}
                                        </td>
                                        {
                                            isAdmin ?
                                                <td className="history__user">
                                                    <div className="user__email">Email: <span>{item.email}</span></div>
                                                    <div className="user__name">Tên: <span>{item.name}</span></div>
                                                    <div className="user__requirement">Yêu cầu : <span>{item.requirement === '' ? 'Không' : item.requirement}</span></div>
                                                </td> : null
                                        }
                                        <td className="history__address">
                                            {item.address}
                                        </td>
                                        <td className="history__contact">
                                            <div className="history__phone">Số điện thoại người nhận : <span>0{item.phone}</span></div>
                                            <div className="history__time">Thời gian nhận hàng : <span>{item.time}</span></div>
                                            <div className="history__enabletime">Thời gian giao : <span>{item.enabletime}</span></div>

                                        </td>
                                        <td>
                                            <ul>
                                                {
                                                    item.cart.map((product, index) => {
                                                        return (
                                                            <li key={index} className="history__order-item">
                                                                <img src={product.images.url} alt="" className="history__order-img" />
                                                                <div className="history__order-desc">
                                                                    <div className="history__order-title"> {product.title}</div>
                                                                    <div className="history__order-price">
                                                                        <span>{Intl.NumberFormat().format(product.price)} đ</span>
                                                                        <span> x {product.quantity}</span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </td>
                                        <td className="history__order-total">
                                            {Intl.NumberFormat().format(item.total)} đ
                                        </td>
                                        <td className={item.confirm ? "confirmed" : "history__order-requirement"}>
                                            {isAdmin ?
                                                <div className="action__confirm">
                                                    <button className="action__confirm-delete" onClick={() => deleteHistory(item._id)}>Xóa đơn hàng</button>
                                                    <button
                                                        className={item.confirm ? 'action__confirm-unconfirmed' : 'action__confirm-confirmed'}
                                                        onClick={() => confirmOrder(item._id, item.confirm)
                                                        }>
                                                        {item.confirm ? 'Hủy xác nhận' : 'Xác nhận đơn hàng'}
                                                    </button>

                                                </div>
                                                : item.confirm ? 'Đã xác nhận !!!' : 'Đơn hàng của bạn đang được xử lí ....'
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={isAdmin ? "7" : "6"} className="line"></td>
                                    </tr>
                                </tbody>
                            )
                        })
                    }

                </table>
            </div>
        </div>
    );
}

export default History;
