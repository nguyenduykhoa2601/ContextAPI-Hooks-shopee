import React from 'react';
import AppStore from '../../img/app_store.png';
import CHPlay from '../../img/CH-play.png';
import QRCode from '../../img/qr-code.png';
import './Footer.css';

function Footer() {
    
    return (
        <footer className="footer" >
            <div className="grid">
                <div className="grid__row">
                    <div className="grid__column-footer-2">
                        <div className="footer__customer">
                            <div className="footer__customer-heading">
                                Chăm sóc khách hàng
                            </div>
                            <ul className="footer__customer-list">
                                <li className="footer__custormer-item">Trung tâm trợ giúp</li>
                                <li className="footer__custormer-item">Shoppee Blog</li>
                                <li className="footer__custormer-item">Shoppee Mall</li>
                                <li className="footer__custormer-item">Hướng dẫn mua hàng</li>
                                <li className="footer__custormer-item">Hướng dẫn bán hàng</li>
                                <li className="footer__custormer-item">Thanh toán</li>
                                <li className="footer__custormer-item">Shoppee Xu</li>
                                <li className="footer__custormer-item">Vẫn chuyển</li>
                                <li className="footer__custormer-item">Trả hàng & hoàn tiền</li>
                                <li className="footer__custormer-item">Chăm sóc khách hàng</li>
                                <li className="footer__custormer-item">Chính sách bảo hành</li>
                            </ul>
                        </div>
                    </div>
                    <div className="grid__column-footer-2">
                        <div className="footer__customer">
                            <div className="footer__customer-heading">
                                Về Shopee
                            </div>
                            <ul className="footer__customer-list">
                                <li className="footer__custormer-item">Giới thiệu Về Shopee Việt Nam</li>
                                <li className="footer__custormer-item">Tuyển dụng</li>
                                <li className="footer__custormer-item">Điều khoản Shopee</li>
                                <li className="footer__custormer-item">Chính sách bảo mật</li>
                                <li className="footer__custormer-item">Chính hãng</li>
                                <li className="footer__custormer-item">Kênh người bán</li>
                                <li className="footer__custormer-item">Flash Sales</li>
                                <li className="footer__custormer-item">Liên hệ với truyền thông</li>
                            </ul>
                        </div>
                    </div>
                    <div className="grid__column-footer-2">
                        <div className="footer__payment">
                            <div className="footer__payment-heading">
                                Thanh toán
                            </div>
                            <ul className="footer__payment-list">
                                <li className="footer__payment-item">
                                    <img className="footer__payment-img" src="https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/visa-512.png" alt="" />
                                    <img className="footer__payment-img" src="https://www.mastercard.com.vn/content/dam/mccom/global/logos/logo-mastercard-mobile.svg" alt="" />

                                </li>
                                <li className="footer__payment-item">
                                    <img className="footer__payment-img" src="https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/visa-512.png" alt="" />
                                    <img className="footer__payment-img" src="https://www.mastercard.com.vn/content/dam/mccom/global/logos/logo-mastercard-mobile.svg" alt="" />

                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="grid__column-footer-2">
                        <div className="footer__follow-us">
                            <div className="footer__follow-heading">
                                Theo dõi tôi trên
                            </div>
                            <ul className="footer__follow-list">
                                <li className="footer__follow-item">
                                    <a href="https://www.facebook.com/profile.php?id=100019330931407" className="follow__item-link">
                                        <i className="fab fa-facebook"></i>
                                        Facebook
                                    </a>
                                </li>
                                <li className="footer__follow-item">
                                    <a href="https://www.instagram.com/nguyenduykhoa2601/" className="follow__item-link">
                                        <i className="fab fa-instagram"></i>
                                        Instagram
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="grid__column-footer-2">
                        <div className="footer__download-apps">
                            <div className="footer__download-heading">
                                Tải ứng dụng trên Shopee ngay
                            </div>
                            <div className="footer__download-link">
                                <img src={QRCode} alt="" className="QRCode" />
                                <div className="download-apps">
                                    <img src={CHPlay} alt="" />
                                    <img src={AppStore} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
}


export default Footer;