import AdminCardWrapper from "@/app/[lang]/user/admin/_Components/AdminCardWrapper";
import IOption from "@/interfaces/IOption";

interface IProps {
    shapeID: string
    option: IOption
}

export default function OptionCard({shapeID, option}: IProps){
    return (
        <AdminCardWrapper
            removeAPIPath={`admin/shapes/${shapeID}/options/${option.id}`}
            editLink={`/user/admin/categories/shapes/${shapeID}/options/form/${option.id}`}
        >
            <div className="mb-2">{option.value}</div>
            <div className="mb-2">{option.value_en}</div>
        </AdminCardWrapper>
    )
}