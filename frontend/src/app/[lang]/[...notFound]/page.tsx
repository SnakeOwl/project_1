import {notFound} from "next/navigation"

// если не создавать эту страницу, то тогда из компонента not-found.txt невозможно выйти через ссылки навигации. (только если перезагрузить страницу)
export default function NotFoundCatchAll() {
  notFound();
  return null
}