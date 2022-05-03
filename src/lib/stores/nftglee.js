import { browser } from '$app/env';
import { writable } from 'svelte/store';

export const remoteModalOpen = writable(false);
export const remoteModalState = writable("login");
export const isLoggedIn = writable(false);
export const isWalletInitialised = writable(false);
export const isAquiredTicket = writable(false);
export const isEnoughFunds = writable(false);
export const funds = writable({});
export const user = writable("user" || {});
export const asset = writable("")

export const token = writable(sessionStorage.getItem("token") || "");
token.subscribe(val => sessionStorage.setItem("token", val));
export const apiToken = writable(sessionStorage.getItem("apiToken") || "");
apiToken.subscribe(val => sessionStorage.setItem("apiToken", val));
export const username = writable(sessionStorage.getItem("username") || "");
token.subscribe(val => sessionStorage.setItem("username", val));
export const password = writable(sessionStorage.getItem("username") || "");