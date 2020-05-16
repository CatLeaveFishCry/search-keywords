
//判断是否没有传keywords
const EMPTY_KEYWORDS = Symbol("empty-keywords");

//默认配置
const defaultConfig = {
    pathArr: ["./"],
    emitFile: true,
    filename: "./_keywords.json",
    validSuffix: [".js", ".jsx"],
    excludeFile: ["./node_modules", "./LICENSE", "./dist", "./out"],
    excludeKeywords: ["node_modules", "LICENSE"]
}


exports.EMPTY_KEYWORDS = EMPTY_KEYWORDS;

exports.defaultConfig = defaultConfig;