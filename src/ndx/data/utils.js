import {YearsFrom2000To2024} from './ndx/2000_2024.js'
import {Years2025} from './ndx/2025.js'
import {Years2026} from "./ndx/2026.js";

export const ndx100=[...YearsFrom2000To2024,...Years2025,...Years2026]



export function getYearsForm2000ToNow(){
    const nowYear = new Date().getFullYear();
    return nowYear - 2000
}
