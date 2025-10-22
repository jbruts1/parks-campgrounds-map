# National Parks and Campgrounds Web Map

## Description
This web map visualizes the locations of National Parks and Campgrounds across the United States using Leaflet.js and data from the POI Factory.
It allows users to toggle between map layers (Street and Satellite view) and dataset layers.
An analysis function calculates the average distance from each National Park to its nearest Campground. 

## Approach
For this project, I analyzed the spatial relationship between National Parks and Campgrounds in the United States. Using Leaflet.js and PapaParse, I loaded both datasets and plotted each location with a circle marker on an interactive map. I then calculated the distance from each National Park to its nearest Campground using Leaflet's map.distance() method. This approach allowed me to quantify accessibility of campgrounds realtive to parks and provided and average distance metric. 

## Datasets

- National Parks: Downloaded from POI Factory, includes latitude, longitude, and name.
- Campgrounds: Downloaded from POI Factory, includes latitude, longitude, and name.

## Files
- index.html - Main page with the map container and library links.
- style.css - Basic map and page styling.
- script.js - Leaflet setup, CSV loading, and analysis code.
- readme.md - Project explanation (this file).

## How to View the Map
- Click this link: https://jbruts1.github.io/parks-campgrounds-map/

## Tools and Reference Documentation
- Leaflet: https://leafletjs.com/reference.html
- PapaParse: https://www.papaparse.com/docs
