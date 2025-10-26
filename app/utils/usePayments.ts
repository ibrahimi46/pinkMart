import { useState } from "react";

interface PaymentMethod {
    id?: number,
    type: string,
    provider: string,
    cardNumber: string,
    expiryDate: string,
    cvv: string,
    isDefault?: boolean
}

const usePayments = () => {
    const [loading, setLoading] = useState(false);
    const [methods, setMethods] = useState<PaymentMethod[]>([]);

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const addPaymentMethod = async ({type, provider, cardNumber, expiryDate, cvv, isDefault} : PaymentMethod) => {
        if (!type || !provider || !cardNumber || !expiryDate || !cvv) return;

        try {
            setLoading(true);
            if (!token) return;
            const res = await fetch("/api/paymentMethods", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({type, provider, cardNumber, expiryDate, cvv, isDefault})
            });
            const data = await res.json();
            return data;
        } catch(err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const getPaymentMethods = async () => {
        try {
            setLoading(true);
            if (!token) return;
            const res = await fetch("/api/paymentMethods", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            setMethods(data);
            return data;
        } catch(err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const deletePayment = async (id: number) => {
        if (!token) return;
        try {
            setLoading(true);
            const res = await fetch(`/api/paymentMethods/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            return data;
        } catch(err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return {addPaymentMethod, getPaymentMethods, deletePayment, methods, loading}
}

export default usePayments