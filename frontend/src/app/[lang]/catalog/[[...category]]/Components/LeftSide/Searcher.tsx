"use client"
import axiosClient from "@/axios-client";
import { Input } from "@/Components/Inputs/Inputs";
import { useState } from "react"
import ListOffers from "./Searcher/ListOffers";


export default function Searcher({
    dictionary
}: {
    dictionary: any
}){

    const [search, setSearch] = useState("");
    const [matches, setMatches] = useState([]);

    async function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        const val = e.target.value;
        setSearch(val);

        if (val.length < 3)
            return;


        const data = {name: e.target.value}
        await axiosClient.post('catalog/search', data)
            .then(({data})=>{
                setMatches(data);
            })
            .catch(error=>{
                // ошибки не нужно выводить
            })
    }

    
    return (
        <div className="mb-4">
            <Input
            labelText={dictionary["search"]}
                id="itemName"
                className="p-2"
                value={search}
                placeholder={dictionary["search"]}
                onChange={handleChange}
            />

            <ListOffers 
                matches={matches}
            />
        </div>
    )
}