export class Station {
	constructor(station) {
		this.name = station.name;
		this.address = station.address;
		this.stands = station.totalStands.availabilities.stands;
		this.totalBikes = station.totalStands.availabilities.bikes;
		this.status = station.status;
		this.latitude = station.position.latitude;
		this.longitude = station.position.longitude;
	}
    /*Méthode qui envoie les informations de la station cliquer au formulaire,
    et vérifie qu'il y à des vélos disponible.*/
	initiateForm() {
		let totalBikes;
		document.querySelector(".panel_station").style.display = "block";
		document.querySelector("#station_name").value = this.name;
		document.querySelector(".address").innerHTML = "Adresse : " + this.address;
		document.querySelector(".places").innerHTML = this.stands + " places";
		if (this.name === sessionStorage.getItem("Station")) {
			totalBikes = this.totalBikes - 1;
		} else {
			totalBikes = this.totalBikes;
		}
		document.querySelector(".available_bikes").innerHTML = totalBikes + " vélos disponibles";
		if (totalBikes === 0) {
			document.querySelector("#reserve_btn").disabled = true;
		}
	}
}
