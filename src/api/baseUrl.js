// Contains logic that points the api to either our mock api, or the real api being served by express/heroku

export default function getBaseUrl() {
	return getQueryStringParameterByName("useMockApi") ? "http://localhost:5001/" : "https://safe-falls-40104.herokuapp.com/";
}

function getQueryStringParameterByName(name, url) {
	if (!url) {
		url = window.location.href;
	}
	name = name.replace(/[\\]/g, "\\$&");
	let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) {
		return null;
	}
	if (!results[2]) {
		return "";
	}
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}
