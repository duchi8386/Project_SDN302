import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [paymentInfo, setPaymentInfo] = useState(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const responseCode = searchParams.get("vnp_ResponseCode");
        const transactionStatus = searchParams.get("vnp_TransactionStatus");

        const info = {
            amount: searchParams.get("vnp_Amount"),
            bankCode: searchParams.get("vnp_BankCode"),
            orderInfo: searchParams.get("vnp_OrderInfo"),
            payDate: searchParams.get("vnp_PayDate"),
            transactionNo: searchParams.get("vnp_TransactionNo"),
            responseCode,
            transactionStatus,
        };

        setPaymentInfo(info);
    }, [location]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
                {paymentInfo ? (
                    <>
                        {paymentInfo.responseCode === "00" && paymentInfo.transactionStatus === "00" ? (
                            <>
                                <h2 className="text-2xl font-bold text-green-600">Thanh toán thành công! 🎉</h2>
                                <p className="mt-2">Mã giao dịch: {paymentInfo.transactionNo}</p>
                                <p>Ngân hàng: {paymentInfo.bankCode}</p>
                                <p>Số tiền: {(paymentInfo.amount / 100).toLocaleString()} VND</p>
                                <p>Thời gian: {paymentInfo.payDate}</p>
                                <button
                                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
                                    onClick={() => navigate("/orders")}
                                >
                                    Xem đơn hàng của bạn
                                </button>
                            </>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold text-red-600">Thanh toán thất bại! ❌</h2>
                                <p className="mt-2">Vui lòng thử lại hoặc liên hệ hỗ trợ.</p>
                                <button
                                    className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg"
                                    onClick={() => navigate("/cart")}
                                >
                                    Quay lại giỏ hàng
                                </button>
                            </>
                        )}
                    </>
                ) : (
                    <p>Đang xử lý...</p>
                )}
            </div>
        </div>
    );
};

export default PaymentResult;
