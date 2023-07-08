import { mykey } from './password.js'

export async function searchLocation(ip) {
    const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${mykey}&ipAddress=${ip}`)
    const data = await res.json()
    return data;
}