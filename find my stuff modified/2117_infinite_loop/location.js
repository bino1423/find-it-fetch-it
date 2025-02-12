let map;
let marker;

map = L.map('map').setView([51.505, -0.09], 13); // Set initial coordinates and zoom level

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add a marker
marker = L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();




document.getElementById("set-location-btn").addEventListener("click", function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            map.setView(userLocation, 13); // Update map view to user's location
            marker.setLatLng(userLocation); // Update marker position
            updateLocationDetails(userLocation);
        }, function() {
            handleLocationError(true);
        });
    } else {
        handleLocationError(false);
    }
});




function updateLocationDetails(location) {
    const locationDetails = document.getElementById("location-details");
    locationDetails.innerHTML = `Latitude: ${location.lat}, Longitude: ${location.lng}`;
}

function handleLocationError(browserHasGeolocation) {
    const locationDetails = document.getElementById("location-details");
    locationDetails.innerHTML = browserHasGeolocation ?
        "Error: The Geolocation service failed." :
        "Error: Your browser doesn't support geolocation.";
}
