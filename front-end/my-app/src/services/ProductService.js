import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

export const getProductList = async ({ category = "", skinType = "", page = 1, limit = 8 }) => {
    try {
        const res = await axios.get(`${API_URL}/products`, {
            params: { category, skinType, page, limit }
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const createProduct = async (createProductRequest) => {
    try {
        const res = await axios.post(`${API_URL}/products`, createProductRequest, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token} `
            },
        });
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

export const updateProduct = async (id, updateProductRequest) => {
    try {
        const res = await axios.put(`${API_URL}/products/${id}`, updateProductRequest, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token} `
            },
        });
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

export const getProductDetail = async (id) => {
    try {
        const res = await axios.get(`${API_URL}/products/${id}`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}