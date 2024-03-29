"use client"

import IUser from "@/interfaces/IUser";
import AdminCardWrapper from "../../_Components/AdminCardWrapper";


export default function UserCard({
    user,
    className=""
}: { 
    user: IUser 
    className?: string
}){
    return (
        <AdminCardWrapper
            removeAPIPath={`api/admin/users/${user.id}`}
            editLink=""
            className={className}
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