import L from 'leaflet';
import { africanCountries } from './data/africanCountries.js';

const mapElement = document.getElementById('map');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

// Define the bounds of Africa
const africaBounds = [
    [-35.0, -20.0], // Southwest corner
    [38.0, 52.0]  // Northeast corner
];

// Initialize map and fit to Africa's bounds
const map = L.map(mapElement).fitBounds(africaBounds);

// Add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 3
}).addTo(map);

// Handle search input
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    searchResults.innerHTML = '';

    if (searchTerm) {
        const filteredCountries = africanCountries.filter(country => 
            country.name.toLowerCase().includes(searchTerm)
        );

        filteredCountries.forEach(country => {
            const li = document.createElement('li');
            li.textContent = country.name;
            li.className = 'px-4 py-2 cursor-pointer hover:bg-gray-200';
            li.addEventListener('click', () => {
                map.flyToBounds(country.bounds);
                searchInput.value = country.name;
                searchResults.innerHTML = '';
            });
            searchResults.appendChild(li);
        });
    }
});

// Clear results on outside click
document.addEventListener('click', (e) => {
    if (!e.target.closest('.w-full.max-w-md.mx-auto')) {
        searchResults.innerHTML = '';
    }
});
