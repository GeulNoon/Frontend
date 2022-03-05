import React from 'react'
import { Navigate } from 'react-router-dom'
	
const useAuth=()=>{
    const user = sessionStorage.getItem('user')
	if(user){
	    return false;
	} else {
	    return true;
	}
}

const PublicRoute=({ children }) =>{
    const auth = useAuth()
	return auth ? children : <Navigate to = "/" />;
}
	
export default PublicRoute;