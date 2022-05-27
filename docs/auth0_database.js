function login(email, password, callback) {
    const zlib = require("zlib");

    let headers = {
        Referer: 'https://bid.nftglee.com/login',
        'Content-Type': 'application/json',
        //Origin: 'https://bid.nftglee.com',
    };

    request.post({
        url: 'https://bid.nftglee.com/auth/login',
        body: JSON.stringify({
            email: email,
            password: password
        }),
        headers: headers
    }, (err, response, body) => {
        if (err) {
            console.log("\nERROR\n---------------\n\n", err);
            return callback(new Error(err));
        }
        let data = JSON.parse(body);
        if (data.user) {
            let name = data.user.username;
            let token = data.jwt_token;
            request.get({
                url: `https://bid.nftglee.com/${name}.json`,
                headers: {
                    ...headers,
                    cookie: `token=${token}; Path=/; Domain=bid.nftglee.com; HttpOnly;`
                }
            }, (err, response, body) => {
                if (err) {
                    return callback(new Error("Error gettin user data"))
                }
                let profile = JSON.parse(body).subject;
                profile.user_id = profile.id;
                profile.name = profile.username;
                return callback(null, profile);
            })
        } else
            return callback(new Error("Username or Password Incorrect"));
    });

    //return callback(new Error("failed miserably"));
}