
## 功能描述
由于作者记忆力不是很好，经常忘记自己写的函数或变量都用在了哪个文件，只记得它的名字，一个个去找很麻烦，所以写了该脚本来提高**开发效率**，只支持**向下搜索**，所以最好在**根目录**下执行该脚本文件

## 例子
```js
searchKeyowrds({
    keywords : ["getMovies","setData"],
    pathArr : ["./src"],
    emitFile : true,
    filename : "./_keywords.json",
    validSuffix : [".js", ".jsx"],
    exclude : ["./node_modules"]
})

_keywords.json内容：
{
    关键字1：{
        路径1：[第1行,第7行...],
        路径2：[第5行,第34行...],
    },
    关键字2：{}
}

{
    "getMovies": {
        "./src/abc/a.js": [
            4,//第4行
            7 //第7行
        ],
        "./src/abc/b.js": [
            1,
            10
        ]
    },
    "setData": {
        "./src/abc/a.js": [
            2
        ],
        "./src/abc/b.js": [
            5
        ]
    }
}
```

## 详细参数
|参数名|参数描述|参数类型|参数默认值|是否必传|
|:---:|:---:|:---:|:---:|:---:|
|keywords|查询的关键字|string、array|无|是|
|pathArr|查询的目录|array|"./"|否|
|emitFile|输出关键字信息的文件|boolean|true|否|
|filename|输出的文件名|string|"./_keywords.json"|否|
|validSuffix|查询的有效文件后缀|array|[".js", ".jsx"]|否|
|exclude|排除的目录或文件|array|["./node_modules"]|否|

