const searchKeywords = require("./searchKeywords");
const getKeywordsByArg = require("./util/getKeywordsByArg");
const { defaultConfig } = require("./defaultConfig");
const fsPromise = require("fs").promises;
const mergeConfig = require("./util/mergeConfig");
const path = require("path")
const moment = require("moment");
require("colors")
async function scriptSearch(userConfig) {
    let time = Date.now();
    console.log("=========================".yellow);
    console.log("查询关键字中......")
    const config = mergeConfig(userConfig, defaultConfig);
    const { keywords, outType, rootDirPath, filename } = config;
    // let { value, rootDirPath } = getKeywordsByArg(process.argv, config);
    if (!keywords || !Array.isArray(keywords)) {
        throw new TypeError("keywords参数必须是数组，如：['console','测试']")
    }
    if (!rootDirPath) {
        throw new TypeError("rootDirPath参数必须是绝对路径，如：path.resolve(__dirname)")
    }
    const data = await searchKeywords({ ...config, rootDirPath });
    if (outType === "file") {
        await fsPromise.writeFile(path.resolve(rootDirPath, filename), JSON.stringify(data))
    } else if (outType === "console") {
        console.log("查询结果↓↓↓".green);
        console.log(data)
    }
    time = (Date.now() - time) / 1000;


    console.log(`\n查询耗时：`.green + `${time}秒`)
    console.log("=========================".yellow);
};

module.exports = scriptSearch;