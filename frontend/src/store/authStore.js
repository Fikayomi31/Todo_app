import { create } from "zustand";
import api from "../services/api";

const getStoredUser = () => {
    try {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error("Error parsing stored user:", error);
        return null;
    }
}

const useAuthStore = create((set) => ({
    user: getStoredUser(),
    token: localStorage.getItem("access_token"),
    loading: false,
    error: null,

    login: async (email, password) => {
        set({
            loading: true,
            error: null,
        })
        try {
            const response = await api.post("/login", { email, password });

            const {access_token, user} = response.data;
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("user", JSON.stringify(user));

            set({
                user: user,
                token: access_token,
                loading: false,
                error: null,
            })

            return{
                success: true,
                user: user,
                token: access_token
            }

        } catch (error) {
            const message =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Login failed. Please try again."

            set({
                loading: false,
                error: message,
            })

            return {
                success: false,
                error: message
            }
        }
    },

    register: async (username, email, password) => {
        set({
            loading: true,
            error: null,
        })
        try {
            const response = await api.post("register", {
                username,
                email,
                password,
                
            })
            set({
                loading: false,
                error: null,

            })
            return {
                success: true,
                data: response.data,
            }
        } catch (error) {
            const message =
                error.response?.data.error ||
                error.response?.data.message ||
                "Registration failed. Please try again"

            set({
                loading: false,
                error: message,
            })

            return {
                success: false,
                error: message,
            }

        }
    },

    logout: () => {
        localStorage.removeItem("access_token")
        localStorage.removeItem("user")

        set({
            user: null,
            token: null,
            error: null,
        })
    },

    clearError: () => {
        set({
            error: null,
        })
    },


}))

export default useAuthStore