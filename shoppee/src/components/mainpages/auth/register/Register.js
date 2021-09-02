import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';



Register.propTypes = {

};

function Register(props) {
    const [user,setUser] = useState({
        name: '',email: '',password: ''
    })
    const handleChangeInput = e =>{
        const {name, value}=e.target
        setUser({...user,[name]:value})
    } 
    const registerSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('/user/register',{...user})
            localStorage.setItem('firstLogin',true)
            window.location.href="/"
        } catch (error) {
            alert(error.response.data.msg)
        }
    }
    return (
        <div className="grid" onSubmit={registerSubmit}>
            <div className="register">

                <form className="register-form">
                    <h3>Đăng kí tài khoản</h3>
                    <input className="register-input"
                        type="text"
                        name="name"
                        placeholder="Nhập tên của bạn"
                        required 
                        value={user.name} 
                        onChange={handleChangeInput} />
                    <input
                        className="register-input"
                        type="text"
                        name="email"
                        placeholder="Nhập email của bạn"
                        required
                        value={user.email}
                        onChange={handleChangeInput} />
                    <input
                        className="register-input"
                        type="password"
                        name="password"
                        placeholder="Mật khẩu"
                        required
                        autoComplete="on"
                        value={user.password}
                        onChange={handleChangeInput} />
                    <button type="submit" className="register___btn-submit">Đăng kí</button>
                    <div className="register-form__footer">
                        <div className="register-policy">Bằng việc đăng kí, bạn đã đồng ý với Shopee về
                            <Link to="*" className="policy-link"> Điều khoản dịch vụ </Link>
                            &
                            <Link to="*" className="policy-link"> Chính sách bảo mật</Link>
                        </div>
                        <div className="redirect__login">
                            <span>Bạn đã có tài khoản?</span>&nbsp;&nbsp;
                            <Link className="redirect__login-link" to="/login">Đăng nhập</Link>
                        </div>

                    </div>

                </form>
                <div className="register__logo">
                    
                        <div className="register__logo-text">
                            Nền tảng thương mại điện tử &nbsp;  
                        </div>
                        <div>
                            <span className="register__logo-text-after">yêu thích ở Đông Nam Á & Đài Loan</span>
                        </div>
                        <img src="https://s3.amazonaws.com/beamtoday/2019/Mar/15/537d4745b467294276f78b4df62ebf27.jpeg" alt="" />
                </div>
                
            </div>


        </div>
    );
}

export default Register;