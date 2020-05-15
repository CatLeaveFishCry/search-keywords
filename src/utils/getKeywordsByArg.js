

function getKeywordsByArg(argvs) {
    const result = {};
    for (let i = 2; i < argvs.length; i++) {
        if (argvs[i].indexOf("keywords") !== -1) {
            result.value = argvs[i].split("=")[1].split(",");
            break;
        }
    };
    return result;
}

module.exports = getKeywordsByArg;