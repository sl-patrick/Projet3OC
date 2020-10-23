export class InitializeMap {
	constructor(map, latitude, longitude) {
		this.map = document.querySelector(map);
		this.longitude = longitude;
		this.latitude = latitude;
		this.createMap = L.map(this.map).setView([this.latitude, this.longitude], 13);
		this.tileLayer = L.tileLayer(
			"https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
			{
				attribution:
					'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
				maxZoom: 18,
				id: "mapbox/streets-v11",
				tileSize: 512,
				zoomOffset: -1,
				accessToken:
					"pk.eyJ1IjoicC1zbWxoIiwiYSI6ImNrNzNqdmNqYjBjb3IzZ3Qwb2NoOWttejkifQ.YU5TQ08JjknA-aOnQ9_24w",
			}
		).addTo(this.createMap);
	}
	//Méthode pour crée les marqueurs sur la carte en récupérant un objet.
	initiateMaker(lat, lon, content, station) {
		let marker = L.marker([lat, lon]).addTo(this.createMap);
		marker.bindPopup(content).openPopup();
		marker.addEventListener("click", () => {
			station.initiateForm();
		});
	}
}
