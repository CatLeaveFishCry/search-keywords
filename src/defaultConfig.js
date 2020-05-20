
//判断是否没有传keywords
const EMPTY_KEYWORDS = Symbol("empty-keywords");

//默认配置
const defaultConfig = {
    emitFile: true,
    filename: "./_keywords.json",
    validExts: [".js", ".jsx"],
    excludeKeywords: ["node_modules", "LICENSE", "dist", "out"]
}


exports.EMPTY_KEYWORDS = EMPTY_KEYWORDS;

exports.defaultConfig = defaultConfig;