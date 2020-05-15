const searchKeyowrds = require("./searchKeywords");
const getKeywordsByArg = require("./utils/getKeywordsByArg")
/**
 * 命令行参数适用的函数
 * @param {*} config 
 */
function scriptSearch(config = {}) {
    let { value } = getKeywordsByArg(process.argv);
    if (!value) {
        throw new TypeError("没有传keywords参数，应该：npm run search keywords=xxx或yarn search keywords=xxx")
    }
    const data = searchKeyowrds({ ...config, keywords: value });
    console.log(data)
};

module.exports = scriptSearch;