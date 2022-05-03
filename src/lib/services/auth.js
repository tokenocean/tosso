import createAuth0Client from '@auth0/auth0-spa-js';
import { user, isAuthenticated, popupOpen, error } from '$lib/stores/auth';
import config from '$lib/config/auth_config';

async function createClient() {
    let auth0Client = await createAuth0Client({
        domain: config.domain,
        client_id: config.clientId,
        scope: config.scpoe,
        cacheLocation: 'localstorage',
    });
    // await auth0Client.getTokenSilently();
    return auth0Client;
}

async function loginWithPopup(client, options) {
    popupOpen.set(true);
    try {
        await client.loginWithPopup(options);
        let us = await client.getUser();
        console.log(us);
        user.set(us);
        isAuthenticated.set(true);
    } catch (e) {
        // eslint-disable-next-line
        console.error(e);
        if (e.message.split(" ")[0] == "NFT")
            error.set("NFT");
    } finally {
        popupOpen.set(false);
    }
}

function logout(client) {
    return client.logout();
}

const auth = {
    createClient,
    loginWithPopup,
    logout
};

export default auth;