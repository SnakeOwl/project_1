import { Locale } from "@/i18n-config"

interface IOption {
    id: string
    name: string
    name_en: string
}

interface Props extends React.HTMLAttributes<HTMLSelectElement> {
    selectedID: string
    options: IOption[]
    lang: Locale
    label: string
    id: string
}


export default function Select({
    selectedID,
    options,
    lang,
    id, 
    label,
    ...other
}: Props) {
    const classes = "p-3 w-full rounded-md text-inherit bg-inherit \
        border-2 border-gray-150 \
        dark:border-gray-700 \
        focus:border-gray-300 ";
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <select 
                {...other} 
                value={selectedID}
                id={id}
                className={classes}
            >
                {options.map((op) => {
                    return <option 
                        value={op.id} 
                        key={op.id}
                        >
                        {lang == "ru" ? op.name : op.name_en}
                    </option>
                })
                }
            </select>
        </>
    )
}