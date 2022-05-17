import { user, username, password } from "$lib/stores/nftglee"
import {get } from "svelte/store";
import cryptojs from "crypto-js";
import * as bip39 from "bip39";
import { fromSeed, fromBase58 } from "bip32";
import { networks, payments } from 'liquidjs-lib'

const { mnemonicToSeed } = bip39;

const network = networks[
    import.meta.env.VITE_NETWORK];
const serverKey = Buffer.from(
    import.meta.env.VITE_PUBKEY, "hex");


export const getMnemonic = (mnemonic, pass) => {
    console.log(bip39);

    if (!mnemonic && get(user)) mnemonic = get(user).mnemonic;
    if (!pass) pass = get(password);

    mnemonic = cryptojs.AES.decrypt(mnemonic, pass).toString(cryptojs.enc.Utf8);
    if (!mnemonic) throw new Error("Unable to decrypt mnmemonic");
    return mnemonic;
};

export const keypair = (mnemonic, pass) => {
    mnemonic = getMnemonic(mnemonic, pass);
    try {
        let seed = mnemonicToSeed(mnemonic);
        let key = fromSeed(seed, network).derivePath("m/84'/0'/0'/0/0");
        let { publicKey: pubkey, privateKey: privkey } = key;
        let base58 = key.neutered().toBase58();

        return { pubkey, privkey, seed, base58 };
    } catch (e) {
        console.log(e);
        throw new Error("Failed to generated keys with mnemonic");
    }
};

export const createWallet = (mnemonic, pass) => {
    try {
        if (!pass) pass = get(password);
        if (!mnemonic) mnemonic = getMnemonic();

        mnemonic = cryptojs.AES.encrypt(mnemonic, pass).toString();

        const key = keypair(mnemonic, pass);
        let { pubkey, seed } = key;

        return {
            address: singlesig(key).address,
            pubkey: key.base58,
            mnemonic,
            multisig: multisig(key).address,
        };
    } catch (e) {
        console.log(e);
        throw new Error("Failed to create wallet from mnemonic");
    }
};

export const singlesig = (key) => {
    if (!key) key = keypair();
    let { pubkey, seed } = key;

    let redeem = payments.p2wpkh({
        pubkey,
        network,
    });

    return payments.p2sh({
        redeem,
        network,
    });
};

export const multisig = (key) => {
    if (!key) key = keypair();

    let redeem = payments.p2ms({
        m: 2,
        pubkeys: [key.pubkey, serverKey].sort((a, b) =>
            a.toString("hex").localeCompare(b.toString("hex"))
        ),
        network,
    });

    return payments.p2sh({
        redeem: payments.p2wsh({
            redeem,
            network,
        }),
    });
};