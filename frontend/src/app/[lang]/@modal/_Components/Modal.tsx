'use client'
import { useCallback, useRef, useEffect, MouseEventHandler } from 'react'
import { useRouter } from 'next/navigation'


// компонент зависит от ссылки в браузере.
// ВАЖНО: при перезагрузке страницы, нужно тестировать поведение.
// нужно дублировать пути (иначе при перезагрузке страницы, эта форма зависнет и перестанет закрываться (чувствительна к редиректам))
export default function Modal({ 
    children,
    className
}: { 
    children: React.ReactNode,
    className?: string
}) {
    const overlay = useRef(null)
    const wrapper = useRef(null)
    const router = useRouter()

    const onDismiss = useCallback(() => {
        router.back()
    }, [router])

    const onClick: MouseEventHandler = useCallback(
        (e) => {
            if (e.target === overlay.current || e.target === wrapper.current) {
                if (onDismiss) onDismiss()
            }
        },
        [onDismiss, overlay, wrapper]
    )

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') onDismiss()
        },
        [onDismiss]
    )

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [onKeyDown])

    return (
        <div
            ref={overlay}
            className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60"
            onClick={onClick}
        >
            <div
                ref={wrapper}
                className={ className + " rounded-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:w-10/12 md:w-8/12 p-6 \
                    bg-white dark:bg-gray-900 "}
            >
                {children}
            </div>
        </div>
    )
}