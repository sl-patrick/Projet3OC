export class Countdown {
    constructor(time, display) {
        this.time = time;
        this.display = document.querySelector(display);
        this.minutesInSecondes = this.time * 60;
        this.minutes = null;
        this.secondes = null;
        this.lastTime = Number(sessionStorage.getItem("TimeReservation", this.minutesInSecondes));
        this.interval = null;
    }
    /*Méthode qui lance le compte à rebours
    ou en lance un nouveau s'il y en à déjà un en cours.*/
    start() {
        if (this.interval === null) {
            this.interval = setInterval(() => {
                this.upgrade();
            }, 1000);
        } else if (this.interval !== null) {
            clearInterval(this.interval);
            this.display.innerHTML = "";
            this.minutesInSecondes = this.time * 60;
            this.interval = null;
            this.interval = setInterval(() => {
                this.upgrade();
            }, 1000);
        }
    }
    /*Méthode qui permet de redémarrer le compte à rebours en cours.*/
    reStart() {
        if (this.lastTime !== "" && this.lastTime > 0) {
            this.minutesInSecondes = this.lastTime;
        }
        setInterval(() => {
            this.upgrade();
        }, 1000);
    }
    /*Méthode pour mettre à jour le compte à rebours.*/
    upgrade() {
        //calcul
        this.minutes = Math.floor(this.minutesInSecondes / 60);
        this.secondes = this.minutesInSecondes % 60;
        //affichage
        if (this.secondes < 10) {
            this.secondes = "0" + this.secondes;
        }
        this.display.innerHTML = "Temps restant : " + this.minutes + " min " + this.secondes + "s";
        sessionStorage.setItem("TimeReservation", this.minutesInSecondes);
        //condition
        if (this.minutesInSecondes > 0) {
            this.minutesInSecondes--;
        } else {
            clearInterval(this.interval);
            sessionStorage.clear();
            location.reload();
        }
    }
}









