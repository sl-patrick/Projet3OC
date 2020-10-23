export class Diaporama {
    constructor(diaporamaImages, previousButton, nextButton, playButton, pauseButton) {
        this.diaporamaImages = document.querySelectorAll(diaporamaImages);
        this.previousButton = document.querySelector(previousButton);
        this.nextButton = document.querySelector(nextButton);
        this.playButton = document.querySelector(playButton);
        this.pauseButton = document.querySelector(pauseButton);
        this.currentImage = 0;
        this.auto = setInterval(() => {
            this.next()
        }, 5000);
        this.playButton.addEventListener("click", () => {
            clearInterval(this.auto);
            this.auto = setInterval(() => {
                this.next()
            }, 5000);
        });
        this.pauseButton.addEventListener("click", () => {
            clearInterval(this.auto);
        });
        this.nextButton.addEventListener("click", () => { this.next() });
        this.previousButton.addEventListener("click", () => { this.previous() });
        addEventListener("keydown", (event) => { this.directionalArrow(event) });
    }
    //méthode pour passer à l'image suivante.
    next() {
        this.diaporamaImages[this.currentImage].classList.remove("active"); // retire la classe active
        this.currentImage++; // +1
        if (this.currentImage === this.diaporamaImages.length) {
            this.currentImage = 0; //si le compteur est égal à la longueur du tableau il repasse à 0.
        }
        this.diaporamaImages[this.currentImage].classList.add("active"); //ajoute la classe active
    }
    //méthode pour passer à l'image précédente.
    previous() {
        this.diaporamaImages[this.currentImage].classList.remove("active"); // retire la classe active
        this.currentImage--; // -1
        if (this.currentImage < 0) {
            this.currentImage = this.diaporamaImages.length - 1; //si le compteur est inférieur à 0 il parcoure le tableau en commençant par le dernier élément.
        }
        this.diaporamaImages[this.currentImage].classList.add("active");
    }
    //méthode suivant et précédent avec les flèches directionnelles.
    directionalArrow(event) {
        if (event.which == 39) {
            this.next();
        } else if (event.which == 37) {
            this.previous();
        };
    }
}
