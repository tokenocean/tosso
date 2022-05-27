const config = {
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    scpoe: 'openid email enchanteress ' +
        import.meta.env.VITE_TICKET_EDITION_ID,
    returnTo: 'localhost:3000',
};
export default config;