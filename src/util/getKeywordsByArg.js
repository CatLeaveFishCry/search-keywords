const path = require("path");

function getKeywordsByArg(argvs, config) {
    const { keySplitChar } = config;
    const result = {};
    result.rootDirPath = path.resolve(argvs[1], "../");
    // for (let i = 2; i < argvs.length; i++) {
    //     if (argvs[i].indexOf("keywords") !== -1) {
    //         result.value = argvs[i].split("=")[1].split(keySplitChar);
    //         break;
    //     }
    // };
    return result;
}

module.exports = getKeywordsByArg;