const fs = require("fs");
const { defaultConfig } = require("./defaultConfig");
const { EMPTY_KEYWORDS } = require("./defaultConfig");
const mergeConfig = require("./utils/mergeConfig")
const searchCore = require("./core");
/**
 * 
 * @param {*} userConfig 
 */
function searchKeywords(userConfig = {}) {
    const config = mergeConfig(userConfig, defaultConfig);
    let { keywords, pathArr, emitFile, filename, validSuffix, excludeFile, excludeKeywords } = config;
    //判断是否没有传keywords
    if (keywords === EMPTY_KEYWORDS) {
        return;
    }
    const result = {};
    if (typeof keywords === "string") {
        keywords = [keywords]
    }
    for (let key of keywords) {
        result[key] = {};
        searchCore(result, { keyword: key, pathArr, filename, validSuffix, excludeFile, excludeKeywords });
    };
    if (emitFile) {
        fs.writeFileSync(filename, JSON.stringify(result));
    }
    return result;
};


module.exports = searchKeywords;