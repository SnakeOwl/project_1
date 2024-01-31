"use client"

import IStorage from "@/interfaces/IStorage"
import StorageCard from "./StorageCard";
import BigPlusLink from "../../../_Components/BigPlusLink";


export default function StoragesList({
    storages
}: {
    storages: IStorage[]
}) {


    return (
        <div className="flex flex-wrap space-around gap-4">
            <div className="w-full 2xl:w-1/6">
                <BigPlusLink href="/user/admin/storages/form" />
            </div>

            {storages.map(storage =>
                <StorageCard
                    key={storage.id}
                    className="w-full 2xl:w-1/6"
                    storage={storage}
                />
            )
            }
        </div>
    )
}
