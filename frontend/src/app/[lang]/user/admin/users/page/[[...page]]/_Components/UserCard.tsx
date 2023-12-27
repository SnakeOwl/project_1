"use client"

import { RedButtonReversed } from "@/_Components/Buttons/ColoredButtons";
import { BlueLinkReversed } from "@/_Components/Links/ColoredLinks";
import { RedText } from "@/_Components/text/borderedText";
import axiosClient from "@/axios-client";
import IUser from "@/interfaces/IUser";
import { useState } from "react";
import AdminCardWrapper from "../../../../_Components/AdminCardWrapper";


export default function UserCard( {user}: { user: IUser }){
    return (
        <AdminCardWrapper
            removeAPIPath={`api/admin/users/${user.id}`}
            editLink=""
        >
            <div className="mb-2">
                {`#${user.id} ${user.name}`}
            </div>

            <div className="mb-2">
                {user.email}
            </div>

            <div className="mb-2">
                {user.phone || ""}
            </div>
        </AdminCardWrapper>
    );
}