import React, { useEffect, useState } from "react";
import { getCart, checkoutWithVNPay, checkoutWithCOD } from "../services/CartService";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [cart, setCart] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await getCart();
                setCart(response.data);
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };
        fetchCart();
    }, []);

    // Xử lý thanh toán qua VNPAY
    const handleVNPayCheckout = async () => {
        try {
            if (!cart || cart.items.length === 0) {
                alert("Giỏ hàng của bạn đang trống!");
                return;
            }
            const paymentUrl = await checkoutWithVNPay();
            window.location.href = paymentUrl; // Chuyển hướng đến trang thanh toán VNPAY
        } catch (error) {
            console.error("Lỗi thanh toán VNPAY:", error);
        }
    };

    // Xử lý thanh toán khi nhận hàng (COD)
    const handleCODCheckout = async () => {
        try {
            if (!cart || cart.items.length === 0) {
                alert("Giỏ hàng của bạn đang trống!");
                return;
            }
            const response = await checkoutWithCOD();
            if (response.status === 201) {
                alert("Đơn hàng của bạn đã được đặt thành công! Hãy chuẩn bị nhận hàng.");
                navigate("/orders");
            } else {
                alert("Đặt hàng thất bại. Vui lòng thử lại!");
            }
        } catch (error) {
            console.error("Lỗi thanh toán COD:", error);
        }
    };

    if (!cart) return <p className="text-center">Giỏ hàng bạn đang trống</p>;

    return (
        <div className="cart-container p-6 bg-white shadow-lg rounded-lg max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-center">Giỏ hàng của bạn</h1>

            {cart.items.length === 0 ? (
                <p className="text-center text-gray-600">Giỏ hàng trống.</p>
            ) : (
                <ul className="mt-4">
                    {cart.items.map((item) => (
                        <li key={item.product._id} className="flex items-center gap-4 p-3 border-b">
                            <img src={item.product.imageUrl} alt={item.product.name} className="w-12 h-12 object-cover rounded" />
                            <div>
                                <h4 className="text-lg font-semibold">{item.product.name}</h4>
                                <p className="text-gray-600">Số lượng: {item.quantity}</p>
                                <p className="text-green-600 font-semibold">
                                    Giá: {item.product.price.toLocaleString()} VND
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <div className="flex flex-col gap-4 mt-6">
                <button
                    onClick={handleVNPayCheckout}
                    className="bg-blue-500 text-black py-2 px-4 rounded-lg text-lg font-semibold w-full">
                    Thanh toán bằng VNPAY
                </button>
                <button
                    onClick={handleCODCheckout}
                    className="bg-green-500 text-black py-2 px-4 rounded-lg text-lg font-semibold w-full">
                    Thanh toán khi nhận hàng (COD)
                </button>
            </div>
        </div>
    );
};

export default Cart;
