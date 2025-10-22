// Initialize the map
const map = L.map("map").setview([39.5, -98.35], 4);

// Base map
const street = L.tilelayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "OpenStreetMap contributors"
}).addTo(map);

const satellite = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    { attribution: "Tiles Esri"}
);

//Make layer groups
const parksLayer = L.layerGroup();
const campsLayer = L.layerGroup();

//load in CSVs
function loadCSV(url, layer, iconUrl, color) {
    Papa.parse(url, {
        download: true,
        header: false,
        complete: function (results) {
            results.data.forEach(row => {
                const [lon, lat, name, desc]= row;
                const latNum = parseFloat(lat);
                const lonNum = parseFloat(lon);
                if (!isNaN(latNum) && !isNaN(lonNum)) {
                    const marker = L.circleMarker([latNum, lonNum], {
                        radius: 5,
                        fillColor: color,
                        color: "#000",
                        weight: 1,
                        opacity:1,
                        fillOpacity: 0.8
                    });
                    marker.bindPopup(`<b>${name}</b><br>${desc || ""}`);
                    layer.addLayer(marker);
                }
            });
        }
    });

}

//load both CSVs as layers
loadCSV("data/National Parks Plua (1).csv", parksLayer, "green", "#2E8B57");
loadCSV("data/Combined US Campgrounds by rivopom.csv", campsLayer, "orange", "FFA500");

//adding layers to map
parksLayer.addTo(map);
campsLayer.addTo(map);

//add in layer control
const baseMaps = {"Street View": street, "Satellite View": satellite};
const overlayMaps = {"National Parks": parksLayer, "Campgrounds": campsLayer};
L.control.layers(baseMaps, overlayMaps).addTo(map);

//analyze proximity to each other
