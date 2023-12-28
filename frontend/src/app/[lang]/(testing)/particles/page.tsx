"use client"

import { useEffect } from "react";
import particlesConfig from "@/config/particles.json"


export default async function ParticlesPage() {

    useEffect(() => {
        // тормозит из-за движения частиц, на рабочей части сайта выключено
        particlesConfig.particles.move.enable = true;

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
        <main>

            <div className="absolute top-0 right-0 left-0 bottom-0 " id="particles-js"></div>
        </main>
    )
}