export class Request {
	constructor(url) {
		this.url = url;
	}
	/*la fonction callback est utilisé pour le traitement de la réponse*/
	getRequestWithPromise(callback) {
		const url = this.url;
		const promise = new Promise(function (resolve) {
			const xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function () {
				if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
					resolve(this.response);
				}
			};
			xhr.open("GET", url, true);
			xhr.responseType = "json";
			xhr.send();
		}).then(function (data) {
			callback(data);
		});
		return promise;
	}
}
