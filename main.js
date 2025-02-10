window.onload = init;

function init() {


    // html elements
    const mapElement = document.getElementById('mapid')


    // basemaps
    const stadiaMaps = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        
    })

    const satelliteMapLayer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}', {
        attribution: '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'jpg'
    });



    // leaflet map object
    const mymap = L.map(mapElement, {
        center: [41, 75],
        zoom: 7,
        minZoom: 4,
        layers: [stadiaMaps]
    })

    // basemap object
    const baseLayer = {
        'Карта': stadiaMaps,
        'Спутник': satelliteMapLayer
 
    }

    // Overlays
    const perthBaseMapImage = './data/is.jpg'
    const perthBaseMapBounds = [[42.93430692117159, 75.84960937500001], [41.40565583808169, 78.82141113281251]]
    const imagePerthOverlay = L.imageOverlay(perthBaseMapImage, perthBaseMapBounds).addTo(mymap)

    // Overlay object
    const overlayerLayers = {
        'Растровое изображение': imagePerthOverlay 
    }

    mymap.on('click', function(event){
        console.log(event.latlng)
    })


    // Layer Control
    const layerControls = L.control.layers(baseLayer, overlayerLayers, {}, {
        collapsed: false, 
        position: 'topright'
    }).addTo(mymap)


    mymap.on('click', function(e){
        console.log(e.latlng)
    })

    // Perth mark
    const perthMarker = L.marker([42.32200108060303, 76.14624023437501], {
        opacity: 1
    }).addTo(mymap)

    const perthMarkerPopup =  perthMarker.bindPopup('Лас-Вегас в Кыргызстане').openPopup();
    const perthMarkerTooltip = perthMarker.bindTooltip("Лас-Вегас в Кыргызстане tool").openTooltip();

    // mymap.on('resize', function(e) {
    //     console.log('The map has been resized')
    // })

    // mymap.on('resize', function(e) {
    //     mymap.flyTo([42, 73])
    // })

    // console.log(mymap.getPanes().tilePane)


}