import wretch from 'wretch';
import path from 'path';


const headers = {
    referer: 'https://bid.nftglee.com/',
    'content-type': 'application/json',
    origin: 'https://bid.nftglee.com',
    host: 'bid.nftglee.com'
};

export async function post({ request, params, url }) {
    //const data = await request.formData(); // or .json(), or .text(), etc
    // let endpoint = url.replace(/^\/api\/nftglee/, '');
    let endpoint = params.remotepath;
    console.log("endpoint: ", endpoint)
    let newHeaders = request.headers;
    for (let k of Object.keys(headers)) {
        newHeaders.set(k, headers[k]);
    }
    //console.log("newHeaders: ", newHeaders);
    let data = await request.json();
    let res = await wretch()
        .polyfills({ fetch })
        .url(`https://bid.nftglee.com/` + endpoint)
        .headers(newHeaders)
        .post(data)
        .json();
    // console.log(res);
    console.log("done");
    return { status: 200, body: res };
}

export async function get({ request, params, url }) {
    let endpoint = params.remotepath;
    console.log("endpoint: ", endpoint)
    let newHeaders = request.headers;
    for (let k of Object.keys(headers)) {
        newHeaders.set(k, headers[k]);
    }
    //console.log("newHeaders: ", newHeaders);
    // console.log(request);

    let res = await wretch()
        .polyfills({ fetch })
        .url(`https://bid.nftglee.com/` + endpoint)
        .headers(newHeaders)
        .get()
        .json();
    // console.log(res);
    console.log("done");
    return { status: 200, body: res };
}