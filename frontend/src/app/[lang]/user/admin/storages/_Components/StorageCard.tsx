"use client"

import IStorage from "@/interfaces/IStorage";
import CardWrapper from "../../_Components/AdminCardWrapper";


export default function StorageCard({
    storage,
    className=""
} : {
    storage: IStorage
    className: string
}) {
    return (
        <CardWrapper
            className={className}
            removeAPIPath={`admin/storages/${storage.id}`}
            editLink={`/user/admin/storages/form/${storage.id}`}
        >
            <div className="mb-2">
                {storage.name}
            </div>

            <div className="mb-2">
                {storage.address}
            </div>

            <div className="mb-2">
                {storage.phone}
            </div>
        </CardWrapper>
    )
}