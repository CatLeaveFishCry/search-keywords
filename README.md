# search-keywords


## 功能描述
___
由于作者记忆力不是很好，经常忘记自己写的函数或变量都用在了哪个文件，只记得它的名字，一个个去找很麻烦，所以写了该脚本来提高**开发效率**，只支持**向下搜索**，所以最好在**根目录**下执行该脚本文件

## _keywords.json文件内容解释
___
```js
👇👇_keywords.json内容👇👇

{
    关键字1：{
        路径1：[
            第1行,
            第7行
            ...
        ],
        路径2：[
            第5行,
            第34行
            ...
        ],
    },
    关键字2：{
        ...
    }
}

👇👇例子👇👇

{
  console: {
    'F:\\abc\\npm\\temp\\src\\scriptSearch.js': [ 
        17,//第17行
        2,//第2行
        3//第3行
    ],
    'F:\\zyx\\npm\\temp\\src\\searchKeywords.js': [ 42 ]
  },
  search: {...}
}

```
## 过程
___
1. 根目录下创建search.js，复制下边search.js代码
**search.js内容👇👇**
```js
const scriptSearch = require("search-keywords");

//配置不需要传keywords，内部会根据命令行参数取到keywords
const config = {
    excludeKeywords: ["node_modules", "LICENSE", "dist"],
}

//不传配置则使用默认配置
scriptSearch(config);

```
2. 设置package.json的scripts
```js
"scripts": {
    ...
    "search": "node search.js"
}
```
3. 命令行传参数只支持keywords，**多个值用,逗号分割**

```js
npm run search keywords=script
npm run search keywords=script,require,config
或
yarn search keywords=script
yarn search keywords=script,require,config
```
4. 
> 查看控制台输出内容，可ctrl+点击直接跳到路径下
> 或
> 查看_keywords.json文件内容


## 详细参数
___
|参数名|参数描述|参数类型|参数默认值|是否必传|
|:---:|:---:|:---:|:---:|:---:|
|emitFile|是否输出关键字的文件|boolean|true|否|
|filename|输出关键字的文件名|string|"./_keywords.json"|否|
|validExts|查询的有效文件后缀|array|[".js", ".jsx"]|否|
|excludeKeywords|排除含有有关键字的文件名或目录名|array|["node_modules", "LICENSE", "dist", "out"]|否|

