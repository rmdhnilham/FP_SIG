mapboxgl.accessToken =
    "pk.eyJ1Ijoicm1kaG5pbGhhbSIsImEiOiJja2p1MTRxcjUxbjlrMzBwNTQ5bnhrZjFqIn0.6QnphVcpGMc3SkWO-T8PXQ"

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true
})

function successLocation(position) {
    setupMap([position.coords.longitude, position.coords.latitude])
}

function errorLocation() {
    setupMap([0, 0])
}

function setupMap(center) {
    const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: center,
        zoom: 14
    })
    
    const nav = new mapboxgl.NavigationControl()
    map.addControl(nav, "top-left")

    var directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken
    })
  
    map.addControl(directions, "top-right")
  
    var layerList = document.getElementById('menu');
    var inputs = layerList.getElementsByTagName('input');
    function switchLayer(layer) {
        var layerId = layer.target.id;
        map.setStyle('mapbox://styles/mapbox/' + layerId);
    }
     
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].onclick = switchLayer;
    }
}