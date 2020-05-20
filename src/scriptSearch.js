const searchKeywords = require("./searchKeywords");
const getKeywordsByArg = require("./util/getKeywordsByArg");
const { defaultConfig } = require("./defaultConfig");
const fsPromise = require("fs").promises;
const mergeConfig = require("./util/mergeConfig");
const path = require("path")
async function scriptSearch(userConfig) {
    const config = mergeConfig(userConfig, defaultConfig);
    let { value, rootDirPath } = getKeywordsByArg(process.argv);
    if (!value) {
        throw new TypeError("没有传keywords参数，应该：npm run search keywords=xxx或yarn search keywords=xxx")
    }
    const data = await searchKeywords({ ...config, rootDirPath, keywords: value });
    if (config.emitFile) {
        await fsPromise.writeFile(path.resolve(rootDirPath, config.filename), JSON.stringify(data))
    }
    console.log(data);
};

module.exports = scriptSearch;