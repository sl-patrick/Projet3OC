import { Diaporama } from "./Diaporama.js";
import { InitializeMap } from "./MapAndMarker.js";
import { Request } from "./Request.js";
import { Station } from "./Station.js";
import { Form } from "./Form.js";
import { Canvas } from "./Canvas.js";
import { Countdown } from "./Countdown.js";


//Diaporama
const slider = new Diaporama(".diaporama_img", ".previous", ".next", ".play", ".pause");

//Map
const map = new InitializeMap("#map", 48.7771486, 2.4530731);

//Requête
const request = new Request("https://api.jcdecaux.com/vls/v3/stations?contract=Creteil&apiKey=60b68923e6269c12ccaedba52c12db4cb6fa19c8");
request.getRequestWithPromise(response);

//Permet de manipuler le resultat reçu de la fonction callback. 
function response(result) {
    result.forEach(element => {
        let station = new Station(element);
        //Passe l'objet station dans la méthode initiateMarker de la Class Map.
        map.initiateMaker(station.latitude, station.longitude, station.status, station);
    });
};

(function reservation() {
    //Formulaire
    const checkForm = new Form("#reserve_btn", "#firstName", "#lastName", "#station_name");

    //Au clique du bouton du formulaire vérification des inputs et fait apparaître le canvas.
    checkForm.formSubmit.addEventListener("click", () => {
        if (checkForm.checkInputs() === true) {
            document.querySelector(".canvas").style.display = "block";
        }
    });

    //Canvas
    const signature = new Canvas("#sign", 300, 150, "black", 1, "#reset", "#valider");
    //Compte à Rebours
    const count = new Countdown(20, ".timer_reservation");

    /*Au clique du bouton validation du canvas: 
    éfface la valeur des inputs, efface le canvas, fait apparaître le message de réservation avec le compte à rebours.*/
    signature.validButton.addEventListener("click", () => {
        if (signature.validCanvas() === true) {
            checkForm.resetInputs();
            signature.clearCanvas();
            document.querySelector(".panel_station").style.display = "none";
            document.querySelector(".canvas").style.display = "none";
            document.querySelector(".booking_panel").style.display = "block";
            document.querySelector(".message_reservation").innerHTML = `Vélo réservé à la station ${sessionStorage.getItem("Station")} par ${localStorage.getItem("Nom")} ${localStorage.getItem("Prénom")}`;
            count.start();
        }
    });

    //fonction qui affiche la réservation en cours au rechargement de la page.
    (function reservationInProgress() {
        window.addEventListener("load", () => {
            if (sessionStorage.getItem("Station") && sessionStorage.getItem("signature")) {
                document.querySelector(".booking_panel").style.display = "block";
                document.querySelector(".message_reservation").innerHTML = `Vélo réservé à la station ${sessionStorage.getItem("Station")} par ${localStorage.getItem("Nom")} ${localStorage.getItem("Prénom")}`;
                count.reStart();
            }
        });
    })();
})();














