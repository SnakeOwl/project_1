import { usePage } from '@inertiajs/inertia-react';
import BlueLink from '@/Components/Links/BlueLink';

export default function LocaleChanger(){
    const {currentLocale} = usePage().props;
    const availableLocales = [
        {
            locale: 'ru',
            label: 'Ru'
        },
        {
            locale: 'en',
            label: 'En'
        }
    ];

    const locales = availableLocales.map((locale)=>{
        if (currentLocale != locale.locale)
            return  (
            <BlueLink href={route('set-locale', locale.locale)}>
                {locale.label}
            </BlueLink>
        )
    });

    return (
        <>
            {locales}
        </>
    )
}
