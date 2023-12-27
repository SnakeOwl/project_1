import { memo } from "react";

const CardWrapper = ({
    children,
    className=""
}: {
    children: React.ReactNode
    className?: string
}) => {
    return (
        <div className={`rounded-md p-1 border border-gray-200 dark:border-gray-800 ${className}`}>
            {children}
        </div>
    )
}


export default memo(CardWrapper)