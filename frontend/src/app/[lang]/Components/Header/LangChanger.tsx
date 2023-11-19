'use client'

import { usePathname } from 'next/navigation'
import { i18n } from "@/i18n-config"
import { BlueLinkReversed } from '@/Components/Links/ColoredLinks'
import { useContext } from 'react'


interface IProps {
    dict: any
}


export default function LangChanger({dict}: IProps) {
    const pathName = usePathname()

    const redirectedPathName = (locale: string) => {
        if (!pathName) return '/'
        const segments = pathName.split('/')
        segments[1] = locale

        return segments.join('/')
    }

    
    return (
        <div>
            {i18n.locales.map((locale) => {
                if (locale !== dict["cl"])
                    return (
                        <BlueLinkReversed key={locale}
                            className="px-2 py-1 rounded"
                            href={redirectedPathName(locale)}
                        >
                            {locale}
                        </BlueLinkReversed>
                    )
            })}
        </div>
    )
}

