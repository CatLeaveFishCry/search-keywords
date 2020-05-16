const fs = require("fs");
const getFileInfo = require("./utils/getFileInfo")
/**
 * 搜索核心函数
 * @param {*} result search-keywords最终返回值的对象
 * @param {*} config 一些配置
 */
function searchCore(result, { keyword, pathArr, filename, validSuffix, excludeFile, excludeKeywords }) {
    console.log("测试")
    for (let path of pathArr) {
        if (shouldFilter(path, excludeKeywords)) {
            continue;
        }
        const files = fs.readdirSync(path);
        path = path.replace(/\/$/, "");
        for (let file of files) {
            if (shouldFilter(file, excludeKeywords)) {
                continue;
            }
            const pathname = `${path}/${file}`;
            const fileNameInfo = getFileInfo(file, pathname, validSuffix);

            console.log(pathname, fileNameInfo);
            console.log("==============")
            if (excludeFile.includes(path) || excludeFile.includes(pathname)) {
                continue;
            }
            if (fileNameInfo.isDir) {
                searchCore(result, { keyword, pathArr: [`${path}/${file}`], filename, validSuffix, excludeFile, excludeKeywords });
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


function shouldFilter(pathName, excludeKeywords) {
    for (let keywords of excludeKeywords) {
        if (pathName.indexOf(keywords) !== -1) {
            return true;
        }
    };
    return false;
}

module.exports = searchCore;