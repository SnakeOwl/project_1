import "server-only"

import Link from "next/link";
import { getDictionary } from "@/utils/get-dictionary";
import { Locale } from "@/i18n-config";
import LoginForm from "./Components/LoginForm";


interface IProps {
    params: { lang: Locale }
}


export default async function LoginPage({
    params: { lang }
}: IProps) {

    const dict = await getDictionary(lang)


    return (
        <main className="xl:w-1/5 mx-auto text-center">
            <h1 className="mb-1">{dict["login"]}</h1>

            <LoginForm dict={dict} />

            <div className="mt-3">
                {dict['newUser']} <br />
                <Link
                    className={"text-xl"}
                    href={'/login/signup'} >
                    {dict['goRegister']}
                </Link>
            </div>
        </main>
    );
}



// metadata. server only!
export async function generateMetadata({
    params: { lang },
}: IProps) {
    const dict = await getDictionary(lang)

    return {
        title: dict["login"]
    }
}
