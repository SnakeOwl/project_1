"use client"

import IStorage from "@/interfaces/IStorage";
import CardWrapper from "../../_Components/AdminCardWrapper";

interface IProps {
    storage: IStorage
}

export default function StorageCard({storage} : IProps) {
    return (
        <CardWrapper
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