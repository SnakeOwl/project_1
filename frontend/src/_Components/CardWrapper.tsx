import { memo } from "react";

const CardWrapper = ({
    children,
    className=""
}: {
    children: React.ReactNode
    className?: string
}) => {
    return (
        <div className={`flex flex-col justify-between rounded-md p-1 border border-gray-200 dark:border-gray-800 ${className}`}>
            {children}
        </div>
    )
}


export default memo(CardWrapper)