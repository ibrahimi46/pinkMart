import { useState } from "react";

interface CartItem {
    id: number,
    cartId: number,
    productId: number,
    quantity: number,
    price: string | null,
}

interface UseOrderProps {
    cartItems: CartItem[],
    finalCheckoutPrice: string,
    selectedDeliveryDate: string
}


const useOrder = () => {
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState<number | null>(null);
    

   const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;



    const placeOrder = async ({finalCheckoutPrice, selectedDeliveryDate, cartItems} : UseOrderProps) => {
        if (!finalCheckoutPrice || !selectedDeliveryDate || !cartItems) return;

        try {
            setLoading(true);
            if (!token) return;
            const res = await fetch("/api/orders", {
                method: "POST", 
                headers: {
                   "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    cartItems, finalCheckoutPrice, selectedDeliveryDate
                })
            })

            const data = await res.json();
            setOrderId(data.orderId);
            return (data);


        } catch(err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }


    return {placeOrder, loading}
}

export default useOrder