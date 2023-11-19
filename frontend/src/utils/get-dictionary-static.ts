import { Locale } from "@/i18n-config";
import enDict from '../dictionaries/en.json';
import ruDict from '../dictionaries/ru.json';


export default function getDictionaryStatic(lang: Locale): any{
    if (lang === "en")
        return enDict;

    return ruDict;
}