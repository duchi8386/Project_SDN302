import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getOrderListByUser = async () => {
    try {
        const res = await axios.get(`${API_URL}/order`,
            {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const cancelOrder = async (orderId) => {
    try {
        const res = await axios.put(`${API_URL}/order/${orderId}/cancel`, {},
            {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}});
        return res.data;
    } catch (error) {
        console.log(error);
    }
}