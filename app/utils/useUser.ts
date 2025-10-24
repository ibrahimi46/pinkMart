import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"

interface User { 
    userId: string
    isAdmin: boolean
    full_name?: string
}


export const useUser = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (token) {
            try {
                const decoded = jwtDecode<User>(token)
                setUser(decoded)
                
            } catch (err) {
                console.error("Invalid token", err)
                setUser(null)
            }
        }
        else {
            setUser(null)
        }



    }, [])


        const isLoggedIn = !!user;

        const logout = () => {
            localStorage.removeItem("token");
            setUser(null);
            window.location.href = "/"

        }

        return {user, isLoggedIn, logout};
}