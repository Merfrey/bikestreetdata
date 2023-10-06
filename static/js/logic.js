function createMap(bikestations){

    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    let baseMaps = {
        "Street Map": streetmap
    }


    let overlayMaps = {
        "Bike Stations": bikestations
    }

    let map = L.map("map-id", {
        center: [40.73, -74.0059],
        zoom:12,
        layers: [streetmap, bikestations]
    })

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map)

}

//https://gbfs.citibikenyc.com/gbfs/en/station_information.json
function createMarkers(response){ // response is the url

    let bikeMarkers = []

    let stations = response.data.stations // this is holding stations array

    for (let i=0; i < stations.length; i++){
        let station = stations[i]// station is an object that's inside the stations array

            let bikeMarker = L.marker([station.lat, station.lon]).bindPopup("<h3>name: "+station.name+ "</h3><h3>Capacity" +station.capacity+  "</h3>")
    
            bikeMarkers.push(bikeMarker)
        }
     
        createMap(L.layerGroup(bikeMarkers))

    }

    d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json").then(createMarkers)