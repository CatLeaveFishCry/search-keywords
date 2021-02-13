const pAll = require("p-all")
const { pathToRegexp } = require("path-to-regexp")
async function deepGetContent(rootFileData, config) {
    const result = {};
    let { validExts, inValidExts, excludeKeywords } = config;
    excludeKeywords = excludeKeywords.map(it => it.replace(/^([^\\]+)\\/, "/").replace(/\\/g, "/"))
    async function temp(fileDatas) {

        let noFileList = fileDatas.filter(it => !it.isFile && !isExcludeKeywords(it.filename, excludeKeywords));
        let isFileList = fileDatas.filter(it => it.isFile && isValid(it.filename, validExts, inValidExts) && !isExcludeKeywords(it.filename, excludeKeywords));
        /* 是文件的话，获取内容 */
        let isFileProAll = isFileList.map(it => {
            return () => it.getContent();
        })
        let noFileProAll = noFileList.map(it => {
            return () => it.getChildren();
        })
        let [contentList, childrenList] = await pAll([() => pAll(isFileProAll, { concurrency: 300 }), () => pAll(noFileProAll, { concurrency: 300 })]);
        let childrenProAll = childrenList.map(it => {
            return () => temp(it);
        })
        /* 将文件内容记录 */
        contentList.forEach((it, index) => {
            let filename = isFileList[index].filename;
            result[filename] = it;
        })
        /* 非文件（目录），重复temp循环 */
        await pAll(childrenProAll, { concurrency: 300 });
    };
    await temp([rootFileData]);
    return result;
};
function isValid(targetPath, suffix, inValidExts) {
    if (inValidExts && inValidExts.length > 0) {
        /* 无效的优先级 > 有效的 */
        return !inValidExts.find(it => targetPath.endsWith(it));
    }
    return suffix.find(it => targetPath.endsWith(it));
}
function isExcludeKeywords(targetPath, excludeKeywords) {
    /* 处理掉C:/和里边所有的/ */
    targetPath = targetPath.replace(/^([^\\]*)\\/, "/").replace(/\\/g, "/")
    for (let item of excludeKeywords) {
        let reg = pathToRegexp(item);
        if (reg.test(targetPath)) {
            return true;
        }
    };
    return false;
}


module.exports = deepGetContent;