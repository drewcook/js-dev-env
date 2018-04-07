import "whatwg-fetch"; // fetch polyfill for all users - could use polyfill.io if only want to provide polyfill when needed instead
import getBaseUrl from "./baseUrl";

const baseUrl = getBaseUrl();

// public

export function getUsers() {
	return get("users");
}

export function deleteUser(id) {
	return del(`users/${id}`);
}

// private

function get(url) {
	return fetch(baseUrl + url).then(onSuccess, onError);
}

function del(url) {
	const request = new Request(baseUrl + url, {
		method: "DELETE",
	});

	return fetch(request).then(onSuccess, onError);
}

function onSuccess(response) {
	return response.json();
}

function onError(error) {
	console.log(error); // eslint-disable-line no-console
}
