import React from 'react'
import { Navigate } from 'react-router-dom'
	
const useAuth=()=>{
    const user = sessionStorage.getItem('user')
	if(user){
	    return true;
	} else {
	    return false;
	}
}

const PrivateRoute=({ children }) =>{
    const auth = useAuth()
	return auth ? children : <Navigate to = "/Login" />;
}
	
export default PrivateRoute;