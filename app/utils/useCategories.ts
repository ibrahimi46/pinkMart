"use client"
import { useEffect, useState } from "react";

const useCategories = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
                {
                    cache: "no-store",
                });
            const data = await res.json();
            console.log(data)
            console.log("am in usecatgoeies")
            if (data) setCategories(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    return {loading, categories, refetchCategories: fetchCategories};
}

export default useCategories;