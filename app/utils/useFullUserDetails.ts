import { useCallback, useEffect, useState } from "react"

interface UserDetails {
    id: string
    fullName: string
    phone: string
    email: string
    password: string
}


const useFullUserDetails = (userId: string | null) => {
    
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

    const fetchUser = useCallback( async () => {
        if (!userId) return;
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/users?id=${userId}`, {
            headers: {Authorization: `Bearer ${token}`}
        });
        const userDetails = await res.json();
        setUserDetails(userDetails.user[0]);

        
    }, [userId])

    useEffect(() => {
        fetchUser();
    }, [fetchUser])


    return {userDetails, refetch: fetchUser}

}

export default useFullUserDetails