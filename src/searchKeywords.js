const os = require("os")
const exists = require("./util/exists")
const File = require("./File")
const deepGetContent = require("./util/deepGetContent")
const filterValidExt = require("./util/filterValidExt")
const filterExcludeKeywords = require("./util/filterExcludeKeywords")
async function searchKeywords(config) {
    try {
        const isExist = await exists(config.rootDirPath, "dir");
        if (!isExist) {
            throw new TypeError(`${config.rootDirPath}目录不存在`);
        }
        const data = await File.create(config.rootDirPath);

        let contentObj = await deepGetContent(data);
        contentObj = filterValidExt(contentObj, config.validExts);//过滤出含有关键后缀的
        contentObj = filterExcludeKeywords(contentObj, config.excludeKeywords);//排除掉exclude里的


        const result = {};
        for (let key of config.keywords) {
            result[key] = {};
        };
        for (let filename in contentObj) {
            let lines = contentObj[filename].split(os.EOL);
            for (let key of config.keywords) {
                result[key][filename] = [];
                const reg = new RegExp(key);
                for (let i = 0; i < lines.length; i++) {
                    if (reg.test(lines[i])) {
                        result[key][filename].push(i + 1)
                    }
                };
                if (result[key][filename].length === 0) {
                    delete result[key][filename]
                }
            };
        };

        return result;
    } catch (error) {
        console.log(error)
    }
};

module.exports = searchKeywords;