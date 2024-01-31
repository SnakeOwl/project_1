"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PageRefresher() {
    // эта нужно для обновления данных компонента, после изменения записи через форму.
    const router = useRouter();

    useEffect(() => {
        router.refresh();
    }, [])

    
    return null;
}