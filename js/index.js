import { searchLocation } from "./services/search-location.js";

const inputSearch = document.getElementById('inputSearch');
const buttonSearch = document.getElementById('buttonSearch');

const divIP = document.getElementById('ip');
const divLocation = document.getElementById('location');
const divTimezone = document.getElementById('timezone');
const divIsp = document.getElementById('isp');

let searchResults = null;

let map = L.map('map').setView([ -15.7801,  -47.9292], 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

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
        }, 1000);
}

const handleClick = () => {
    const responseUser = inputSearch.value;

    const fetchData = async () => {
        searchResults = await searchLocation(responseUser);
    };
    fetchData();

    setTimeout(() => {
        awaitFunction(searchResults);
    }, 2000);
}

function firstMap() {
    const fetchData = async () => {
        searchResults = await searchLocation('');
    };
    fetchData();

    setTimeout(() => {
        awaitFunction(searchResults)
    }, 1000);
}

firstMap();

inputSearch.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        handleClick();
    }
})

buttonSearch.addEventListener('click', handleClick)


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