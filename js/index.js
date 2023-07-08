import { searchLocation } from "./services/search-location.js";

const inputSearch = document.getElementById('inputSearch')
const buttonSearch = document.getElementById('buttonSearch')

const divIP = document.getElementById('ip')
const divLocation = document.getElementById('location')
const divTimezone = document.getElementById('timezone')
const divIsp = document.getElementById('isp')

let map = L.map('map').setView([ -15.7801,  -47.9292], 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let searchResults = null;

const awaitFunction = (searchResults) => {
    addIP(searchResults);
        addLocation(searchResults);
        addTimezone(searchResults);
        addIsp(searchResults);
        map.remove()

        setTimeout(() => {
            map = L.map('map').setView([searchResults.location.lat,
            searchResults.location.lng], 13);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
        }, 500);
}

function firstMap() {
    const fetchData = async () => {
        searchResults = await searchLocation('');
    };
    fetchData()

    setTimeout(() => {
        awaitFunction(searchResults)
    }, 500);
}

firstMap();

buttonSearch.addEventListener('click', () => {
    const responseUser = inputSearch.value;

    const fetchData = async () => {
        searchResults = await searchLocation(responseUser);
        console.log(searchResults);
    };
    fetchData()

    setTimeout(() => {
        awaitFunction(searchResults);
    }, 1600);
})

const addIP = (dataSearch) => {
    divIP.innerHTML = dataSearch.ip;
}

const addLocation = (dataSearch) => {
    divLocation.innerHTML = `${dataSearch.location.city}, ${dataSearch.location.region}`;
}

const addTimezone = (dataSearch) => {
    divTimezone.innerHTML = dataSearch.location.timezone;
}

const addIsp = (dataSearch) => {
    divIsp.innerHTML = dataSearch.isp;
}