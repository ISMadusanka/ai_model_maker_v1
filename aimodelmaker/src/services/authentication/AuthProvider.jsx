import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null);

export default function AuthProvider({children}) {

    const [user,setUser] = useState(null);

    //check if the authtoken is in cookies 
    



  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuth = () =>{
    const context = useContext(AuthContext);

    if(context === undefined){
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
