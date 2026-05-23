import {YearsFrom2000To2024} from './ndx/2000_2024.js'
import {Years2025} from './ndx/2025.js'
import {Years2026} from "./ndx/2026.js";
export const ndx=[...YearsFrom2000To2024,...Years2025,...Years2026]

import {YearsFrom2000To2024 as N225_YearsFrom2000To2024} from './n225/2000_2024.js'
import {Years2025 as N225_Years2025} from './n225/2025.js'
import {Years2026 as N225_Years2026} from "./n225/2026.js";
export const n225=[...N225_YearsFrom2000To2024,...N225_Years2025,...N225_Years2026]

import {yfdBefore} from './yfd/before.js'
import {yfd2026} from './yfd/2026.js'
export const yfd=[...yfdBefore,...yfd2026]

export function getYearsForm2000ToNow(){
    const nowYear = new Date().getFullYear();
    return nowYear - 2000
}
export function getChartDataByType(type){
    let maps={
        ndx,
        n225,
        yfd,
    }
    return maps[type]
}