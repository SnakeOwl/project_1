"use client"
import { Locale } from "@/i18n-config"
import { GoogleReCaptcha, GoogleReCaptchaProvider } from "react-google-recaptcha-v3"
import captchaInfo from "@/config/recaptcha.json"
import { memo } from "react"


// todo: рекапча ебёт мозги. Придумать как её переделать (она работает, просто ебёт мозги)
const ReCaptchaGoogleV3 = memo(({
    lang = "en",
    onVerify // выполняется, когда пользователь подтверждён
}: {
    lang?: Locale
    onVerify: Function
}) => {

    return <>
        <GoogleReCaptchaProvider
            reCaptchaKey={captchaInfo.RECAPTCHA_SITE_KEY}
            language={lang}
            useRecaptchaNet={true}
            useEnterprise={false}
            scriptProps={{
                async: false, // optional, default to false,
                defer: false, // optional, default to false
                appendTo: 'body', // optional, default to "head", can be "head" or "body",
                nonce: undefined // optional, default undefined
            }}
            container={{ // optional to render inside custom element
                element: "[required_id_or_htmlelement]",
                parameters: {
                    badge: 'inline', // optional, default undefined
                    theme: 'dark', // optional, default undefined
                }
            }}
        >

            <GoogleReCaptcha onVerify={(token) => onVerify(token)} />


        </GoogleReCaptchaProvider>
    </>
}
)

export default memo(ReCaptchaGoogleV3)