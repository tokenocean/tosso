const btc =
    import.meta.env.VITE_BTC;

const info = (msg) => {
    // TODO: implement snack notifications
    // setTimeout(() => snack.set({ msg, type: "info" }), 100);
};

const copy = (v) => {
    let textArea = document.createElement("textarea");
    textArea.style.position = "fixed";
    textArea.value = v;

    document.body.appendChild(textArea);

    textArea.focus();
    textArea.select();

    document.execCommand("copy");
    document.body.removeChild(textArea);

    info("Copied!");
};


export {
    btc,
    copy
}