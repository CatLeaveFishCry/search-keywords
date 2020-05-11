const fs = require("fs")

/**
 * 获取文件信息，{isValidSuffix：是否是有效后缀，isDir: 是否是目录}
 * @param {*} name 
 * @param {*} suffix 
 */
function _getFileInfo(name, suffix) {
    if (!/\./.test(name)) {
        return { isDir: true };
    }
    for (let item of suffix) {
        if (name.endsWith(item)) {
            return { isValidSuffix: true };
        }
    };
    return {};
}

function _search(result, { keyword, pathArr, filename, validSuffix, exclude }) {
    for (let path of pathArr) {
        const files = fs.readdirSync(path);
        path = path.replace(/\/$/, "");
        for (let file of files) {
            const fileNameInfo = _getFileInfo(file, validSuffix);
            const pathname = `${path}/${file}`

            if (exclude.includes(path) || exclude.includes(pathname)) {
                continue;
            }
            if (fileNameInfo.isDir) {
                _search(result, { keyword, pathArr: [`${path}/${file}`], filename, validSuffix, exclude });
            } else if (fileNameInfo.isValidSuffix) {
                const data = fs.readFileSync(pathname);
                const lines = data.toString().split("\r\n")
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

function searchKeyowrds({ keywords, pathArr = ["./"], emitFile = true, filename = "./_keywords.json", validSuffix = [".js", ".jsx"], exclude = ["./node_modules"] }) {
    const result = {};
    if (typeof keywords === "string") {
        keywords = [keywords]
    }
    for (let key of keywords) {
        result[key] = {};
        _search(result, { keyword: key, pathArr, filename, validSuffix, exclude });
    };
    if (emitFile) {
        fs.writeFileSync(filename, JSON.stringify(result));
    }
    return result;
};



module.exports = searchKeyowrds;
