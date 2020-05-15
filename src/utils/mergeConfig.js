const { EMPTY_KEYWORDS } = require("../defaultConfig")
/**
 * 合并配置
 * @param {*} userConfig 用户配置
 * @param {*} defaultConfig 默认配置
 */
function mergeConfig(userConfig, defaultConfig) {
    return {
        keywords: EMPTY_KEYWORDS,
        ...defaultConfig,
        ...userConfig
    }
}

module.exports = mergeConfig;