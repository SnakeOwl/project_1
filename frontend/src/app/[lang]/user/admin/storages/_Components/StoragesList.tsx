"use client"

import IStorage from "@/interfaces/IStorage"
import StorageCard from "./StorageCard";
import BigPlusLink from "../../../_Components/BigPlusLink";


interface IProps {
    storages: IStorage[]
}


export default function StoragesList({
    storages
}: IProps ) {
    return (
        <div className="flex space-around space-x-4">
            <div className="2xl:w-1/6 px-2"> 
                <BigPlusLink href="/user/admin/storages/form" />
            </div>

            {storages.map(storage=>{
                return (
                <div className="2xl:w-1/6" key={storage.id}> 
                	<StorageCard storage={storage} /> 
                	</div> 
                	)
            })
            }
        </div>
    )
}
