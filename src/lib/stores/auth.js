import { writable } from 'svelte/store';

export const auth0Client = writable(null);
export const isAuthenticated = writable(false);
export const shouldLogout = writable(false);
export const user = writable({});
export const popupOpen = writable(false);
export const error = writable();
export const a0ready = writable(false);