import { browser } from '$app/env';
import { remoteModalState, isLoggedIn, isWalletInitialised, isAquiredTicket, token, username, user, apiToken, isEnoughFunds, funds, password, aTicket } from '$lib/stores/nftglee'
import {get as g } from "svelte/store"
import wretch from 'wretch';
import { createWallet, getMnemonic } from './nftgleeWallet';
import { generateMnemonic } from "bip39";
import wordlist from '../wordlist';
import { getArtworks, updateUser } from '$lib/remoteQueries';
import { retry } from 'wretch-middlewares';

export const api = wretch().url("/api/nftglee/api")

export async function login(email, pwd) {
    try {
        let res = await wretch()
            .polyfills({ fetch })
            .url(`/api/nftglee/auth/login`)
            .post(JSON.stringify({ email, password: pwd }))
            .json();
        user.set(res.user);
        username.set(res.user.username);
        token.set(res.jwt_token);
        password.set(pwd)
        isLoggedIn.set(true)
        isWalletInitialised.set(res.user.wallet_initialized);
        console.log('login succesfull: ', g(username));
    } catch (e) {
        console.error(e);
    }
}

export async function apiLogin(email, password) {
    try {
        let res = await wretch()
            .polyfills({ fetch })
            .url(`/api/nftglee/api/login`)
            .post(JSON.stringify({ email, password }))
            .json();
        apiToken.set(res.jwt_token);
        console.log('api login: ', g(username));
        return res.jwt_token;
    } catch (e) {
        console.error(e);
    }
}

export async function checkLogin() {
    console.log(g(username), g(token))
    if (!g(token) || !g(username)) {
        isLoggedIn.set(false);
        return false;
    }
    let res = await wretch()
        .polyfills({ fetch })
        .url(`/api/nftglee/${g(username)}.json`)
        .auth(`Bearer ${g(apiToken)}`)
        .get()
        .json();
    if (res)
        return true;
    else throw Error("loginCheckFailed")
}

const LBTC =
    import.meta.env.VITE_BTC;

export async function poolFunds() {
    let res = await wretch()
        .polyfills({ fetch })
        .url(`/api/nftglee/api/balance`)
        .auth(`Bearer ${g(token)}`)
        .get()
        .json();
    funds.set({
            "required": g(aTicket)["list_price"] / 100000000,
            "confirmed": res.confirmed[LBTC] / 100000000 || 0,
            "pending": res.pending[LBTC] || 0,
        })
        // console.log("funds: ", g(funds));
    return g(funds);
}

export async function checkFunds() {
    await poolFunds();
    if (g(funds)["confirmed"] >= g(funds)["required"])
        return true;
    return false;
}

export async function findNewTicket() {
    let res = await wretch()
        .polyfills({ fetch })
        .url(`/api/nftglee/artworks.json`)
        .auth(`Bearer ${g(token)}`)
        .post({})
        .json();
    let requi =
        import.meta.env.VITE_TICKET_EDITION_ID
    console.log("need: ", requi);
    console.log("listed: ", res);
    let found = res.artworks.filter(e => e.edition_id == requi)
    console.log("found: ", found);
    aTicket.set(found[0]);
    // funds.update(f => ({...f, required: found[0].list_price }));
}

export async function watchChanges() {
    if (!g(aTicket)["id"])
        findNewTicket();
    isLoggedIn.subscribe(updateModalState);
    isWalletInitialised.subscribe(updateModalState);
    isAquiredTicket.subscribe(updateModalState);
    isEnoughFunds.subscribe(updateModalState);
}

export async function updateModalState() {
    let newState = "login";
    if (!g(isLoggedIn))
        newState = "login";
    else if (!g(isWalletInitialised)) {
        newState = "wallet";
    } else if (!g(isAquiredTicket)) {
        isEnoughFunds.set(await checkFunds());
        if (!g(isEnoughFunds))
            newState = "fund";
        else
            newState = "ticket";
    } else
        newState = "done";
    remoteModalState.set(newState);
}

export const register = async(email, username, password) => {
    // if (!validateEmail(email)) throw new Error("Invalid email");
    if (password.length < 8) throw new Error("Password must be 8 characters");
    console.log("register with: ", email, username, password)
    return api
        .url("/register")
        .post({
            email,
            password,
            username,
            ...createWallet(
                generateMnemonic(undefined, undefined, wordlist),
                password
            ),
        })
        .res()
};

export const query = async(query, variables) => {
    await apiLogin(g(username), g(password));
    await checkLogin();
    let { data, errors } = await api
        .url("/v1/graphql")
        .middlewares([retry({ maxAttempts: 2 })])
        .auth(`Bearer ${g(token)}`)
        .post({ query, variables })
        .json();
    if (errors) throw new Error(errors[0].message);
    return data;
};

export const initWallet = async() => {
    let params = createWallet();
    params.wallet_initialized = true;

    await query(updateUser, {
        user: params,
        id: g(user).id,
    });
    g(user).wallet_initialized = true;
}

export const getArt = async() => {
    return await query(getArtworks, {
        id: g(user).id,
    });
}