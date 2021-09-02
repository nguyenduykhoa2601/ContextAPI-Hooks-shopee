import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';


Login.propTypes = {

};

function Login(props) {
    const [user,setUser]=useState({
        email:'',password:''
    })
    const handleChangeInput = e =>{
        const {name,value} = e.target
        setUser({...user,[name]:value})
    }
    const loginSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('/user/login',{...user})
            localStorage.setItem('firstLogin',true)
            window.location.href="/"
        } catch (error) {
            alert(error.response.data.msg)
        }
    }
    return (
        <div className="grid">
            <div className="Login">

                <form className="Login-form" onSubmit={loginSubmit}>
                    <h3>Đăng nhập</h3>
                   
                    <input
                        className="Login-input"
                        name="email"
                        value={user.email}
                        type="text"
                        placeholder="Nhập email của bạn"
                        onChange={handleChangeInput}
                        required />
                    <input
                        className="Login-input"
                        type="password"
                        name="password"
                        value={user.password}
                        placeholder="Mật khẩu"
                        onChange={handleChangeInput}
                        required
                        autoComplete="on" />
                    <button type="submit" className="Login___btn-submit">Đăng nhập</button>
                    <div className="Login-form__footer">
                        <div className="Login-policy">Bằng việc đăng nhâp, bạn đã đồng ý với Shopee về
                            <Link to="*" className="policy-link"> Điều khoản dịch vụ </Link>
                            &
                            <Link to="*" className="policy-link"> Chính sách bảo mật</Link>
                        </div>
                        <div className="redirect__login">
                            <span>Bạn chưa có tài khoản?</span>&nbsp;&nbsp;
                            <Link className="redirect__login-link" to="/register">Đăng kí</Link>
                        </div>

                    </div>

                </form>
                <div className="Login__logo">
                    
                        <div className="Login__logo-text">
                            Nền tảng thương mại điện tử &nbsp;  
                        </div>
                        <div>
                            <span className="Login__logo-text-after">yêu thích ở Đông Nam Á & Đài Loan</span>
                        </div>
                        <img src="https://s3.amazonaws.com/beamtoday/2019/Mar/15/537d4745b467294276f78b4df62ebf27.jpeg" alt="" />
                </div>
                
            </div>


        </div>
    );
}

export default Login;