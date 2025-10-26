import { useState } from "react";

interface Address {
    type: string;
    streetAddress: string;
    aptNumber: string;
    zipCode: string;
}

interface UseAddressesProps {
    type: string;
    streetAddress: string;
    aptNumber: string;
    zipCode: string;
}

const useAddresses = () => {
    const [loading, setLoading] = useState(false);
    const [addresses, setAddresses] = useState<Address[]>([]);

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const addAddress = async ({ type, streetAddress, aptNumber, zipCode }: UseAddressesProps) => {
        if (!type || !streetAddress || !aptNumber || !zipCode) return;

        try {
            setLoading(true);
            if (!token) return;
            const res = await fetch("/api/addresses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ type, streetAddress, aptNumber, zipCode })
            });

            const data = await res.json();
            return data;

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getAddresses = async () => {
        try {
            setLoading(true);
            if (!token) return;
            const res = await fetch("/api/addresses", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();
            setAddresses(data.addresses);
            return data.addresses;

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteAddress = async (id: number) => {
    if (!token) return;
    try {
        setLoading(true);
        const res = await fetch(`/api/addresses/${id}`, {
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

    return { addresses, addAddress, getAddresses, deleteAddress, loading };
};

export default useAddresses;