console.log(
    import.meta.env.VITE_PUBLIC_BASE_PATH)

const config = {
    //TODO: move this to .env
    domain: 'mighty1.eu.auth0.com',
    clientId: '3sqAskr6ojB3DIR5dxOML7UgLYHrfEO3',
    scpoe: 'openid email enchanteress',
    returnTo: 'localhost:3000',
};
export default config;