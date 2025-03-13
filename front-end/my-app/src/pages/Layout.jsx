import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Products from "./ProductList.jsx";
import { Footer } from "../components/Footer.jsx";
import { Header } from "../components/Header.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import ProductDetail from "./ProductDetail.jsx";
import { ProductManagement } from "./admin/ProductManagement.jsx";
import { AddProductForm } from "./admin/ProductForm.jsx";
import Forbidden from "./Forbidden.jsx";
import { useAuth } from "../context/AuthContext.jsx"; // Import useAuth để lấy user
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Home.jsx";
import QuizPage from "./QuizPage.jsx";
import SkincareResult from "./SkincareResult.jsx";
import Cart from "./Cart.jsx";
import OrderList from "./OrderList.jsx";
import PaymentResult from "./PaymentResult.jsx";

const Layout = () => {
    const {role} = useAuth();
    // console.log(role);
    // console.log(typeof role,role);
    // console.log("role === 'ADMIN':", role === "ADMIN");
    return (
        <div className="container-fluid d-flex flex-column min-vh-100">
            <ToastContainer position="top-right" autoClose={3000} />
            <Header />
            <div className="row flex-grow-1">
                <main className="col-md-9 mx-auto p-4">
                    <Routes>
                        {/* Kiểm tra role trước khi render trang admin */}
                        <Route
                            path="/admin/products/new"
                            element={
                                role === null
                                    ? <div>Loading...</div>
                                    : role === "ADMIN"
                                        ? <AddProductForm />
                                        : <Navigate to="/forbidden" replace />
                            }
                        />
                        <Route
                            path="/admin/products"
                            element={
                                role === null
                                    ? <div>Loading...</div>
                                    : role === "ADMIN"
                                        ? <ProductManagement />
                                        : <Navigate to="/forbidden" replace />
                            }
                        />

                        {/* Các route không yêu cầu quyền admin */}
                        <Route path="/skincare-result" element={<SkincareResult/>}/>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/quiz" element={<QuizPage/>}/>
                        <Route path="/products" element={<Products />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/products/:id" element={<ProductDetail />} />
                        <Route path="/forbidden" element={<Forbidden />} />
                        <Route path="/cart" element={<Cart/>} />
                        <Route path="/orders" element={<OrderList />} />
                        <Route path="/cart/vnpay_return" element={<PaymentResult/>}/>
                    </Routes>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
