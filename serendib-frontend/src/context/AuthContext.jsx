import { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-hot-toast';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            setUserInfo(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await axiosInstance.post('/auth/login', { email, password });
            setUserInfo(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return data;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
            throw error;
        }
    };

    const register = async (name, email, password) => {
        try {
            const { data } = await axiosInstance.post('/auth/register', { name, email, password });
            return data;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
            throw error;
        }
    };

    const logout = () => {
        setUserInfo(null);
        localStorage.removeItem('userInfo');
    };

    const updateProfile = async (userData) => {
        try {
            const { data } = await axiosInstance.put('/auth/profile', userData);
            setUserInfo(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('Profile updated successfully');
            return data;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Update failed');
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ userInfo, login, register, logout, updateProfile, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
