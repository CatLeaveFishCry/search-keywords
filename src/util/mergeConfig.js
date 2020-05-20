const { EMPTY_KEYWORDS } = require("../defaultConfig")

function mergeConfig(userConfig, defaultConfig) {
    return {
        keywords: EMPTY_KEYWORDS,
        ...defaultConfig,
        ...userConfig
    }
};

module.exports = mergeConfig;