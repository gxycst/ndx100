import {YearsFrom2000To2024} from './ndx/2000_2024.js'
import {Years2025} from './ndx/2025.js'
import {Years2026} from "./ndx/2026.js";
export const ndx100=[...YearsFrom2000To2024,...Years2025,...Years2026]



import {YearsFrom2000To2024 as N225_YearsFrom2000To2024} from './n225/2000_2024.js'
import {Years2025 as N225_Years2025} from './n225/2025.js'
import {Years2026 as N225_Years2026} from "./n225/2026.js";
export const n225=[...N225_YearsFrom2000To2024,...N225_Years2025,...N225_Years2026]



import {YearsFrom2000To2024 as topix_YearsFrom2000To2024} from './topix/2000_2024.js'
import {Years2025 as topix_Years2025} from './topix/2025.js'
import {Years2026 as topix_Years2026} from "./topix/2026.js";
export const topix=[...topix_YearsFrom2000To2024,...topix_Years2025,...topix_Years2026]


import {YearsFrom2000To2024 as spy_YearsFrom2000To2024} from './spy/2000_2024.js'
import {Years2025 as spy_Years2025} from './spy/2025.js'
import {Years2026 as spy_Years2026} from "./spy/2026.js";
export const spy=[...spy_YearsFrom2000To2024,...spy_Years2025,...spy_Years2026]

import {YearsFrom2000To2024 as csi500_YearsFrom2000To2024} from './csi500/2000_2024.js'
import {Years2025 as csi500_Years2025} from './csi500/2025.js'
import {Years2026 as csi500_Years2026} from "./csi500/2026.js";
export const csi500=[...csi500_YearsFrom2000To2024,...csi500_Years2025,...csi500_Years2026]


import {YearsFrom2000To2024 as csi300_YearsFrom2000To2024} from './csi300/2000_2024.js'
import {Years2025 as csi300_Years2025} from './csi300/2025.js'
import {Years2026 as csi300_Years2026} from "./csi300/2026.js";
export const csi300=[...csi300_YearsFrom2000To2024,...csi300_Years2025,...csi300_Years2026]

import {YearsFrom2000To2024 as gold_YearsFrom2000To2024} from './gold/2000_2024.js'
import {Years2025 as gold_Years2025} from './gold/2025.js'
import {Years2026 as gold_Years2026} from "./gold/2026.js";
export const gold=[...gold_YearsFrom2000To2024,...gold_Years2025,...gold_Years2026]
export function getYearsForm2000ToNow(){
    const nowYear = new Date().getFullYear();
    return nowYear - 2000
}
export function getChartDataByType(type){
    let maps={
        ndx:ndx100,
        n225,
        topix,
        spy,
        csi500,
        csi300,
        gold
    }
    return maps[type]
}