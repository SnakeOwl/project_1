"use client"
import FormWrapper from "@/_Components/FormWrapper";
import { Input } from "@/_Components/Inputs/Input";
import IStorage from "@/interfaces/IStorage";
import React, { useState } from "react";


interface IDataRequest {
    name: string
    name_en: string
    address: string
    address_en: string
    phone: string
    schedule: string
    schedule_en: string
}

interface IProps {
    storage?: IStorage
}


export default function StorageForm({ storage }: IProps) {

    const [data, setData] = useState<IDataRequest>({
        name: storage?.name || "",
        name_en: storage?.name_en || "",
        address: storage?.address || "",
        address_en: storage?.address_en || "",
        phone: storage?.phone || "",
        schedule: storage?.schedule || "",
        schedule_en: storage?.schedule_en || "",
    });


    const [errors, setErrors] = useState<any>();


    return (
        <div className="2xl:w-1/2 mx-auto">
            <FormWrapper
                data={data}
                createMode={storage == undefined}
                createURL="admin/storages"
                updateURL={ storage !== undefined? `admin/storages/${storage.id}`: ""}
                setGeneralErrors={setErrors}
            >
                <Input
                    id="name"
                    label="name"
                    value={data.name}
                    className="mb-2"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setData({ ...data, name: e.target.value })
                    }}

                    error={errors?.name ? errors.name : undefined}
                />

                <Input
                    id="name_en"
                    label="name_en"
                    value={data.name_en}
                    className="mb-2"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setData({ ...data, name_en: e.target.value })
                    }}

                    error={errors?.name_en ? errors.name_en : undefined}
                />

                <Input
                    id="address"
                    label="address"
                    value={data.address}
                    className="mb-2"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setData({ ...data, address: e.target.value })
                    }}

                    error={errors?.address ? errors.address : undefined}
                />


                <Input
                    id="address_en"
                    label="address_en"
                    value={data.address_en}
                    className="mb-2"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setData({ ...data, address_en: e.target.value })
                    }}

                    error={errors?.address_en ? errors.address_en : undefined}
                />

                <Input
                    id="phone"
                    label="phone"
                    value={data.phone}
                    className="mb-2"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setData({ ...data, phone: e.target.value })
                    }}

                    error={errors?.phone ? errors.phone : undefined}
                />

                <Input
                    id="schedule"
                    label="schedule"
                    value={data.schedule}
                    className="mb-2"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setData({ ...data, schedule: e.target.value })
                    }}

                    error={errors?.schedule ? errors.schedule : undefined}
                />

                <Input
                    id="schedule_en"
                    label="schedule_en"
                    value={data.schedule_en}
                    className="mb-4"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setData({ ...data, schedule_en: e.target.value })
                    }}

                    error={errors?.schedule_en ? errors.schedule_en : undefined}
                />

            </FormWrapper>
        </div>
    )
}
