// Initialize the map
const map = L.map("map").setview([39.5, -98.35], 4);

// Base map
const street = L.tilelayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "OpenStreetMap contributors"
}).addTo(map);

