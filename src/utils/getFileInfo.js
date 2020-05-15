/**
 * 获取文件信息，{isValidSuffix：是否是有效后缀，isDir: 是否是目录}
 * @param {*} name 
 * @param {*} suffix 
 */
function getFileInfo(name, suffix) {
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

module.exports = getFileInfo;