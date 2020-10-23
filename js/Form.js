export class Form {
    constructor(formSubmit, firstName, lastName, hiddenStationName) {
        this.formSubmit = document.querySelector(formSubmit);
        this.firstName = document.querySelector(firstName);
        this.lastName = document.querySelector(lastName);
        this.hiddenStationName = document.querySelector(hiddenStationName);
        this.formSubmit.addEventListener("click", (event) => {
            event.preventDefault();
            this.checkInputs();
        });
    }
    checkInputs() {
        let regex = /^\S[A-Za-zÀ-ÖØ-öø-ÿ-\s]+[-A-Za-zÀ-ÖØ-öø-ÿ]+$/;

        //Vérifier qu'une station à bien été sélectionnée.
        if (this.hiddenStationName.value === "") {
            return false;
        } else {
            sessionStorage.setItem("Station", this.hiddenStationName.value);
        }
        if (regex.test(this.firstName.value) && this.firstName.value !== "") {
            localStorage.setItem("Nom", firstName.value);
        }else {
            this.firstName.classList.add("error");
            document.querySelector(".errorfirstname").innerHTML = "Veuillez renseigner un nom";
            return false; 
        }
        if (regex.test(this.lastName.value) && this.lastName.value !== "") {
            localStorage.setItem("Prénom", lastName.value);
            return true
        }else {
            this.lastName.classList.add("error");
            document.querySelector(".errorlastname").innerHTML = "Veuillez renseigner un prénom";
            return false;
        }
    }
    resetInputs() {
        this.firstName.value = null;
        this.lastName.value = null;
    }
}



