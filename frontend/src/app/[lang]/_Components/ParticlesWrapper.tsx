"use client"
import particlesConfig from "@/config/particles.json"
import { useEffect } from "react";


// Чёт эта библиотека требовательная к ресурсам. От неё даже комп начинает гудеть.
// todo: придумать другое решение для развлечения пользователей
// Либа такая тяжёлая, что с включенным движением частиц, даже анимация кнопок тормозит.
export default function ParticlesWrapper (props: {children: React.ReactNode}){

    useEffect(() => {
        // переключение между темами на устройстве
        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', ({ matches }) => {
                if (matches) {
                    particlesConfig.particles.color.value = "#fff";
                    particlesConfig.particles.line_linked.color = "#fff";

                } else {
                    particlesConfig.particles.color.value = "#000"
                    particlesConfig.particles.line_linked.color = "#000";
                }
                window.particlesJS.load('particles-js', particlesConfig);
            })


        // певичная инициализация
        if (window.matchMedia('(prefers-color-scheme: dark)').matches !== true) {
            particlesConfig.particles.color.value = "#000"
            particlesConfig.particles.line_linked.color = "#000";
        }
        window.particlesJS.load('particles-js', particlesConfig);

    }, [])

    return (
        <>
            <div className="fixed top-0 w-full h-full z-10" id="particles-js"></div>
                <div className="absolute left-0 top-0 right-0 bottom-0 z-20 w-full">
                {props.children}

                </div>
        </>

    )
}