import React from 'react';
import { Link } from 'react-router-dom'
import NotFoundImg from '../../../../img/notfound.png'
import './notfound.css'
const Notfound = () => {
    return (
        <div className="grid">
            <div className="not-found">
                <div className="not-found__page">
                    <img src={NotFoundImg} alt="" />
                    <div>
                        <h1 className="not-found__heading">OOPS</h1>
                        <span className="not-found__text">Không tìm thấy trang ~~~ <i className="fas fa-frown-open"></i></span><br />
                        <span className="not-found__text">Trang bạn đang tìm có thể đã bị gỡ hoặc nó đã bị đổi tên miền !!!!</span>
                        <br />
                        <button className="not-found__redirect"><Link to="/" className="not-found__link">Trở về trang chủ</Link></button>
                    </div>

                </div>
            </div>



        </div>
    );
}

export default Notfound;
