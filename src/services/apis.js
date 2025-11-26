import { toast } from "react-hot-toast";
import Axios from "./axiosClient";

export const registeruser = async (data) => {
    try {
        const res = await Axios.post(`/auth/register`, data)
        return res.data;
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message || error.response.data);
    }
}

export const loginuser = async (data) => {
    try {
        const res = await Axios.post(`/auth/login`, data)
        return res.data;
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message || error.response.data);
    }
}

export const refreshAccessToken = async () => {
    try {
        const res = await Axios.post(`/auth/refresh`);
        return res.data;
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message || error.response.data);
    }
}

export const logout = async () => {
    try {
        const res = await Axios.post(`/auth/logout`);
        return res.data;
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message || error.response.data);
    }
};

export const verifyUser = async () => {
    try {
        const res = await Axios.get(`/auth/verify`, { withCredentials: true });
        return res.data;
    } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
            return null;
        }
        // toast.error(error.response?.data?.message || "Something went wrong");
        return null;
    }
};

export const getProfile = async () => {
    try {
        const res = await Axios.get(`/profile/fetch`);
        return res.data;
    } catch (error) {
        console.log(error)
        // toast.error(error.response.data.message || error.response.data);
    }
}

export const createProfile = async (data) => {
    try {
        const res = await Axios.post(`/profile/create`, data);
        return res.data;
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message || error.response.data);
    }
}

export const imageUpload = async (data) => {
    try {
        const res = await Axios.post(`/upload`, data, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return res.data.imageUrl;
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message || error.response.data);
    }
}

export const createCategory = async (data) => {
    try {
        const res = await Axios.post('/category/create', data)
        return res.data
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message || error.response.data);
    }
}

export const fetchCategory = async () => {
    try {
        const res = await Axios.get('/category')
        return res.data;
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message || error.response.data);
    }
}

export const createProduct = async (data) => {
    try {
        const res = await Axios.post('/product/create', data)
        return res.data
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message || error.response.data);
    }
}

export const fetchProduct = async () => {
    try {
        const res = await Axios.get('/product')
        return res.data;
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message || error.response.data);
    }
}

export const fetchSingleProduct = async (id) => {
    try {
        const res = await Axios.get(`/product/${id}`)
        return res.data;
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message || error.response.data);
    }
}

export const deleteProduct = async (id) => {
    try {
        const res = await Axios.delete(`/product/delete/${id}`)
        return res.data;
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message || error.response.data);
    }
}

export const addToCart = async (data) => {
    try {
        const res = await Axios.post(`/cart/add`, data)
        return res.data;
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message || error.response.data);
    }
}

export const getCart = async () => {
    try {
        const res = await Axios.get(`/cart`)
        return res.data;
    } catch (error) {
        console.log(error)
        // toast.error(error.response.data.message || error.response.data);
    }
}

export const removeCart = async (data) => {
    try {
        const res = await Axios.delete(`/cart/remove`, {
            data: data
        })
        return res.data;
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message || error.response.data);
    }
}

export const updateCartQuantity = async (data) => {
    try {
        const res = await Axios.put(`/cart/update`, data);
        return res.data;
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message || error.response.data);
    }
};

export const clearCart = async () => {
    try {
        const res = await Axios.delete(`/cart/clear`);
        return res.data;
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message || error.response.data);
    }
}

export const createOrder = async (data) => {
    try {
        const res = await Axios.post('/order/create', data)
        return res.data;
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message || error.response.data);
    }
}

export const getUserOrder = async () => {
    try {
        const res = await Axios.get('/order/me')
        return res.data;
    } catch (error) {
        console.log(error);
        // toast.error(error.response.data.message || error.response.data);
    }
}

export const getOrders = async () => {
    try {
        const res = await Axios.get('/order')
        return res.data;
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message || error.response.data);
    }
}

export const updateOrderStatus = async (id, data) => {
    try {
        const res = await Axios.patch(`/order/update/${id}`, data);
        return res.data;
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message || error.response.data);
    }
}

export const deleteOrder = async (id) => {
    try {
        const res = await Axios.delete(`/order/delete/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message || error.response.data);
    }
}

export const cancelOrder =  async (id) => {
    try {
        const res = await Axios.put(`/order/cancel/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message || error.response.data);
    }
}

export const createPayment = async (data) => {
    try {
        const res = await Axios.post('/payment/create-checkout-session', data)
        return res.data;
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message || error.response.data);
    }
}