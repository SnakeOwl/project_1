import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import { BlueButton } from '../Buttons';

export default function LocaleChanger({
    className=""
}){
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
            <BlueButton
                className="small rounded inverted"
                onHandleClick={()=>Inertia.get(`/set-locale/${locale.locale}`)}
            >
                {locale.label}
            </BlueButton>
        )
    });

    return (
        <div className={className}>
            {locales}
        </div>
    )
}
