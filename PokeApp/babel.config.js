module.exports = function (api) {
    // Cache the config per environment so tests get a different config from dev/prod
    api.cache.using(() => process.env.NODE_ENV);
    const isTest = process.env.NODE_ENV === 'test';
    return {
        presets: [
            // In test mode, disable the reanimated/worklets babel plugins —
            // they require native peer packages that aren't needed for unit tests.
            ['babel-preset-expo', isTest ? { reanimated: false, worklets: false } : {}],
        ],
    };
};
