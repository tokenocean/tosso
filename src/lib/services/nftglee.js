import { browser } from '$app/env';
import { remoteModalState, isLoggedIn, isWalletInitialised, isAquiredTicket, token, username, user, apiToken, isEnoughFunds, funds, password } from '$lib/stores/nftglee'
import {get as g } from "svelte/store"
import wretch from 'wretch';
import { createWallet, getMnemonic } from './nftgleeWallet';
import { generateMnemonic } from "bip39";
import wordlist from '../wordlist';
import { updateUser } from '$lib/remoteQueries';
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

const LBTC = '6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d';
///todo: get this dynamically
const ticketPrice = 4000;

export async function poolFunds() {
    let res = await wretch()
        .polyfills({ fetch })
        .url(`/api/nftglee/api/balance`)
        .auth(`Bearer ${g(token)}`)
        .get()
        .json();
    funds.set({
            "required": ticketPrice,
            "confirmed": res.confirmed[LBTC] || 0,
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

export async function watchChanges() {
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