import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react'
import api from '../api/api';

const AuthContext = createContext(null);

export default function AuthProvider({children}) {

    const [user,setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const fetchMe = async ()=> {
            try {
                const response = await api.get('/auth/me');
                setToken(response.data.accessToken);
            } catch (error) {
                setToken(null);
            }
        }

        fetchMe();

    }, []);
    
    useLayoutEffect(() => {
        const intercepter = api.interceptors.response.use((config)=>{
            config.headers.Authorization = !config._retry && token ? `Bearer ${token}` : config.headers.Authorization;
            return config;
        });

        return () => {
            api.interceptors.response.eject(intercepter);
        }

    }, [token]);

    useLayoutEffect(() => {
        const refresIntercepter = api.interceptors.response.use(
            (response)=>response,
            async (error)=>{
                const originalRequest = error.config;

                if(error.response.status === 403 && error.response.data.message === 'Unauthorized'){
                    try {
                        const response = await api.get('/auth/refreshtoken');
                        setToken(response.data.accessToken);

                        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
                        originalRequest._retry = true;

                        return api(originalRequest);
                    } catch (error) {
                        setToken(null);
                    }
                }
                return Promise.reject(error);
            }
            );

        return () => {
            api.interceptors.response.eject(refresIntercepter);
        }

    }, [token]);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuth = () =>{
    const context = useContext(AuthContext);

    if(context === undefined){
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
