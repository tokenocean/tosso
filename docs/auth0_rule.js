function tokenCheck(user, context, callback) {
    const request = require('request');

    // Access should only be granted to verified users.
    if (!user.user_id) {
        return callback(new UnauthorizedError('Access denied.'));
    }
    let needTokens = context.request.query.scope.split(" ").slice(2);
    let owned = user.holdings;
    let found = owned.find(art => needTokens.find(t => (t === art.id || t === art.title || t === art.edition_id)));
    if (!found) {
        context.redirect = {
            url: "https://mighty1.eu.auth0.com/v2/logout"
        };
        return callback(new UnauthorizedError('NFT ownership authentification failed'), user, context);
    } else {
        callback(null, user, context);
    }

}