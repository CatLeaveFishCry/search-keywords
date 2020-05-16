const fs = require("fs")
/**
 * 获取文件信息，{isValidSuffix：是否是有效后缀，isDir: 是否是目录}
 * @param {*} name 
 * @param {*} suffix 
 */
function getFileInfo(name, pathname, suffix) {
    let res = {
        isDir: false,
        isValidSuffix: false
    };
    if (!/\./.test(name)) {
        //没有.   可能文件可能目录
        try {
            fs.readdirSync(pathname);
        } catch (error) {
            //不是目录
            if (error.toString().indexOf("not a directory") !== -1) {

                return res;
            }
        };
        res.isDir = true;
    } else {
        //文件
        res.isValidSuffix = isValid(name, suffix);
    }
    return res;
}

function isValid(name, suffix) {
    for (let item of suffix) {
        if (name.endsWith(item)) {
            return true;
        }
    };
    return false;
}


module.exports = getFileInfo;