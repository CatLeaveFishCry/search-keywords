
//判断是否没有传keywords
const EMPTY_KEYWORDS = Symbol("empty-keywords");
//默认配置
const defaultConfig = {
    keywords: false,//查询的关键字
    rootDirPath: false,
    filename: "./_keywords.json",
    validExts: [".js", ".jsx", ".vue"],
    inValidExts: false,//查询所有文件，不包括这些后缀的，权重大于validExts
    excludeKeywords: ["(.*)/node_modules", "(.*)/LICENSE", "(.*)/dist"],
    outType: "console"//console或file
}


exports.EMPTY_KEYWORDS = EMPTY_KEYWORDS;

exports.defaultConfig = defaultConfig;