import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {FaShoppingCart, FaUser, FaSearch, FaBars, FaSignOutAlt} from "react-icons/fa";
import "../style/header.css";
import {useAuth} from "../context/AuthContext.jsx";

export const Header = () => {
    const {user, logoutUser ,loading} = useAuth();

    const handleLogout = async () => {
        await logoutUser();
        navigate("/login");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
            <div className="container">
                {/* Logo */}
                <Link className="navbar-brand" to="/">
                    <h2>BeautyCare</h2>
                </Link>

                {/* Nút mở menu trên mobile */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <FaBars/>
                </button>

                {/* Danh mục và tìm kiếm */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">Sản phẩm</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/skincare-result">Lộ trình chăm sóc da</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Liên hệ</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">FAQ</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">About Us</Link>
                        </li>
                    </ul>

                    {/* Thanh tìm kiếm */}
                    <form className="d-flex search-bar">
                        <input className="form-control me-2" type="search" placeholder="Tìm sản phẩm..."/>
                        <button className="btn btn-primary" type="submit"><FaSearch/></button>
                    </form>

                    {/* Giỏ hàng và Đăng nhập */}
                    <div className="d-flex">
                        <Link to="/cart" className="btn btn-outline-dark me-3">
                            <FaShoppingCart/>
                        </Link>
                        {loading ? (
                            <p>Đang tải...</p>
                        ) : user ? (
                            <div className="user-info">
                                <span>Xin chào, {user.fullName}</span>
                                <button onClick={handleLogout} className="btn btn-outline-danger ms-2"><FaSignOutAlt/> Đăng xuất</button>
                            </div>
                        ) : (
                            <Link to="/login"><FaUser/> Đăng nhập</Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

