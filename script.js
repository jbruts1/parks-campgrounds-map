// Initialize the map
const map = L.map("map").setView([39.5, -98.35], 4);

// Base map
const street = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
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
function loadCSV(url, layer, color) {
    Papa.parse(url, {
        download: true,
        header: true,
        complete: function (results) {
            results.data.forEach(row => {
                const lat = parseFloat(row.Latitude);
                const lon = parseFloat(row.Longitude);
                const name = row.Name;
                const latNum = parseFloat(lat);
                const lonNum = parseFloat(lon);
                if (!isNaN(latNum) && !isNaN(lonNum)) {
                    const marker = L.circleMarker([lonNum, latNum], {
                        radius: 5,
                        fillColor: color,
                        color: "#000",
                        weight: 1,
                        opacity:1,
                        fillOpacity: 0.8
                    });
                    marker.bindPopup(`<b>${name}</b>`);
                    layer.addLayer(marker);
                }
            });
        }
    });

}

//load both CSVs as layers
loadCSV("data/National Parks Plus (1).csv", parksLayer, "green", "#2E8B57");
loadCSV("data/Combined US Campgrounds by rivopom.csv", campsLayer, "orange", "#FFA500");

//adding layers to map
parksLayer.addTo(map);
campsLayer.addTo(map);

//add in layer control
const baseMaps = {"Street View": street, "Satellite View": satellite};
const overlayMaps = {"National Parks": parksLayer, "Campgrounds": campsLayer};
L.control.layers(baseMaps, overlayMaps).addTo(map);

//analyze proximity to each other
Promise.all([
    fetch("data/National Parks Plus (1).csv").then(r => r.text()),
    fetch("data/Combined US Campgrounds by rivopom.csv").then(r=>r.text())
]).then(([parksCSV, campsCSV])=> {
    const parks = Papa.parse(parksCSV, { header: true}).data;
    const camps = Papa.parse(campsCSV, { header: true}).data;

    let totalDist = 0;
    let validCount = 0;
    parks.forEach(p => {
        const latPark = parseFloat(p.Latitude);
        const lonPark = parseFloat(p.Longitude);
        if (isNaN(latPark) || isNaN(lonPark)) return;

        let minDist = Infinity;
        camps.forEach(c => {
            const latCamp = parseFloat(c.Latitude);
            const lonCamp = parseFloat(c.Longitude);
            if (isNaN(latCamp) || isNaN(lonCamp)) return;

            const dist = map.distance([latPark, lonPark], [latCamp, lonCamp]);
            if (dist < minDist) minDist = dist;

            });

            if (minDist < Infinity) {
                totalDist += minDist / 1609 //converting this to miles
                validCount++;
            }

        });

        const avgDist = (totalDist / validCount).toFixed(2);
        alert(`Average distance from a National Park to its nearest Campground: ${avgDist} miles`);
    });
