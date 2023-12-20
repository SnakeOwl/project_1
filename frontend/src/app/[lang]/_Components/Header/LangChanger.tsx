'use client'

import { usePathname } from 'next/navigation'
import { i18n } from "@/i18n-config"
import { BlueLinkReversed } from '@/_Components/Links/ColoredLinks'


export default function LangChanger({dict}: {dict: any}) {
    const pathName = usePathname()

    const redirectedPathName = (locale: string) => {
        if (!pathName) 
            return '/'

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

