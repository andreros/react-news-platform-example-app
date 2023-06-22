import auth0Config from '../../auth0.config.json';

export const getAuth0Config = () => {
    // Configure the audience here. By default, it will take whatever is in the config
    // (specified by the `audience` key) unless it's the default value of "YOUR_API_IDENTIFIER" (which
    // is what you get sometimes by using the Auth0 sample download tool from the quickstart page, if you
    // don't have an API).
    // If this resolves to `null`, the API page changes to show some helpful info about what to do
    // with the audience.
    const audience = auth0Config.audience && auth0Config.audience !== 'YOUR_API_IDENTIFIER' ? auth0Config.audience : null;

    return {
        domain: auth0Config.domain,
        clientId: auth0Config.clientId,
        ...(audience ? { audience } : null)
    };
};
