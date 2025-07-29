// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({ 
	// baseURL: 'http://192.168.1.212/backend/api/task/', 
	baseURL: 'http://10.84.244.22/backend/api/task/', 
	// baseURL: 'https://api.cashtradepro.com/api/task/',
});

axiosInstance.interceptors.request.use((config) => {
	const token = localStorage.getItem('accessToken'); //  or 'refresh_token'
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default axiosInstance;
