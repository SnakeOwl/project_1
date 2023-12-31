export default function Modal({
    children,
    className = "",
    onClickWrapper,
}: {
    children: React.ReactNode
    className?: string
    onClickWrapper?: React.MouseEventHandler<HTMLDivElement>
}) {



    return (
        <div
            className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60"
            onClick={onClickWrapper}
        >
            <div
                className={className + " rounded-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:w-10/12 md:w-8/12 p-6 \
                    bg-white dark:bg-gray-900 "}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                    e.stopPropagation(); 
                    
                }}
            >
                {children}
            </div>
        </div >
    )
}