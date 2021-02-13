const os = require("os")
const exists = require("./util/exists")
const File = require("./File")
const deepGetContent = require("./util/deepGetContent")
async function searchKeywords(config) {
    try {
        const isExist = await exists(config.rootDirPath, "dir");
        if (!isExist) {
            throw new TypeError(`${config.rootDirPath}目录不存在`);
        }
        const data = await File.create(config.rootDirPath);

        let contentObj = await deepGetContent(data, config);
        const result = {};
        for (let key of config.keywords) {
            result[key] = {};
        };

        for (let filename in contentObj) {
            if (contentObj[filename].includes("")) {
                /* 是二进制文件 */
                continue;
            }
            // let lines = contentObj[filename].split(os.EOL);
            let lines = contentObj[filename].split("\r\n");
            if (lines.length <= 1) {
                lines = contentObj[filename].split("\n");
            }
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
        console.log("发生错误")
        console.log(error)
    }
};

module.exports = searchKeywords;