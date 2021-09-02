import axios from 'axios';
import React, { useContext, useState ,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';
import Loading from '../../utils/loading/Loading';
import AOS from 'aos';
import 'aos/dist/aos.css'
import './orderForm.css'
const OrderForm = () => {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [address, setAddress] = useState('')
    const [token] = state.token
    const [phone, setPhone] = useState('')
    const [time, setTime] = useState('')
    const [enabletime, setEnabletime] = useState('')
    const [requirement, setRequirement] = useState('')
    const [total,setTotal] = useState(0)
    const [loading,setLoading] = useState(false)
    const history = useHistory()
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
    const orderSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            await axios.post('/api/payment', { cart, address, phone, time, enabletime, requirement,total }, {
                headers: { Authorization: token }
            })
            await setCart([])
            await addToCart([])
            // window.location.href="/history"
            await history.push('/history')
            setLoading(false)
            
        } catch (error) {
            alert(error.response.data.msg)
        }
    }
    if (loading) return <Loading />
    return (
        <div className="grid">
            <div className="order__form" data-aos="flip-up">
                <form className="form__order" onSubmit={orderSubmit}>
                    <h1 className="form__order-heading">Xác nhận thông tin</h1>
                    <div >
                        <input className="form__order-input" name="address" value={address} placeholder="Nhập địa chỉ người nhận" onChange={e => setAddress(e.target.value)} />
                    </div>
                    <div>
                        <input className="form__order-input" name="phone" value={phone} placeholder="Nhập số điện thoại người nhận" onChange={e => setPhone(e.target.value)} />
                    </div>
                    <div>
                        <input className="form__order-input" name="time" value={time} placeholder="Thời gian nhận hàng có thể" onChange={e => setTime(e.target.value)} />
                    </div>
                    <div>
                        <input className="form__order-input" name="enabletime" value={enabletime} placeholder="Khoảng thời gian giao" onChange={e => setEnabletime(e.target.value)} />
                    </div>
                    <div>
                        <textarea className="form__order-textarea" name="requirement" value={requirement} placeholder=" Yêu cầu thêm (nếu có): " onChange={e => setRequirement(e.target.value)} />
                    </div>
                    <div>
                        <button type="submit" className="form__order-submit">Xác nhận đặt hàng</button>
                    </div>



                </form>
            </div>
        </div>
    );
}

export default OrderForm;
