'use client'

import { useReportWebVitals } from 'next/web-vitals'


// https://nextjs.org/docs/app/api-reference/functions/use-report-web-vitals
export function WebVitals() {
    useReportWebVitals((metric) => {
        console.log(metric)
    });
}