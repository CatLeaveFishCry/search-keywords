const fs = require("fs");
const getFileInfo = require("./utils/getFileInfo")
/**
 * 搜索核心函数
 * @param {*} result search-keywords最终返回值的对象
 * @param {*} config 一些配置
 */
function searchCore(result, { keyword, pathArr, filename, validSuffix, exclude }) {
    for (let path of pathArr) {
        const files = fs.readdirSync(path);
        path = path.replace(/\/$/, "");
        for (let file of files) {
            const fileNameInfo = getFileInfo(file, validSuffix);
            const pathname = `${path}/${file}`

            if (exclude.includes(path) || exclude.includes(pathname)) {
                continue;
            }
            if (fileNameInfo.isDir) {
                searchCore(result, { keyword, pathArr: [`${path}/${file}`], filename, validSuffix, exclude });
            } else if (fileNameInfo.isValidSuffix) {
                const data = fs.readFileSync(pathname);
                const lines = data.toString().split("\n")
                result[keyword][pathname] = [];
                for (let i = 0; i < lines.length; i++) {
                    const reg = new RegExp(keyword);
                    if (reg.test(lines[i])) {
                        result[keyword][pathname].push(i + 1)
                    }
                };
                if (result[keyword][pathname].length === 0) {
                    delete result[keyword][pathname]
                }
            }
        };
    };
}

module.exports = searchCore;