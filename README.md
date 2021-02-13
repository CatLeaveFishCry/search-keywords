# search-keywords

## 文档锚链接
##### [1. 该库用来干什么？](#oo)
##### [2. 输出内容简单介绍](#aa)
##### [3. 配置描述](#bb)
##### [4. Installation安装](#cc)
##### [5. Usage使用案例](#dd)

## <span id=oo>1. 该库用来干什么？</span>
##### 1.作用：极速查找目标关键字存在于哪些文件中
##### 2.速度：中小型项目测试是0-1秒左右
##### 3.适合文件：文本文件，如.txt , .c , .js , .html等等...，不适合二进制文件如.excel, .exe, .jpg等等...


## <span id=aa>2. 输出内容简单介绍</span>
```js
{
    关键字1：{
        文件路径1：[
            该文件路径的第1行,
            该文件路径的第7行
            ...
        ],
        文件路径2：[
            该文件路径的第5行,
            该文件路径的第34行
            ...
        ],
    },
    关键字2：{
        ...
    }
}

例子↓↓↓
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
## <span id=bb>3. 配置描述</span>
##### 主配置
| 参数名 | 数据类型 |  必填|默认值  |简单描述 |举例|
| :----:| :----:   | :----:  | :----: |  :----: |:----: |
| rootDirPath | String|是🐢 |   | 查询的**根目录**(绝对路径) |path.resolve(__dirname)|
| keywords | Array|是🐢 |   | 查询的关键字数组 |["console","function"]|
| validExts | Array|否⭕ |  [".js",".jsx",".vue"] | **允许**的文件后缀，**若设置了inValidExts则validExts无效** ||
| inValidExts | Array|否⭕ |  false | 查询所有文件，除了设置的**不允许**的文件后缀，**若设置了inValidExts则validExts无效** ||
| excludeKeywords | Array|否⭕ | ["(.\*)/node_modules", "(.\*)/LICENSE", "(.*)/dist"] | **排除**的目标文件或目录，根据**path-to-regexp库**规则进行配置，也可直接传**绝对路径** |[path.resolve(__dirname,"./node_modules")]|
| outType | String|否⭕ | console | 输出查询结果的方式，可选**console或file**，file将输出到_keywords.json |

## <span id=cc>4. Installation安装</span>
```js
npm install search-keywords
或者
yarn add search-keywords
```

## <span id=dd>5. Usage使用案例</span>
##### 1.安装库
```js
npm install search-keywords
或者
yarn add search-keywords
```
##### 2.创建search.js文件
> search.js文件位置没有要求，该案例假设是在项目根目录下建立
```js
const scriptSearch = require("search-keywords");
const path = require("path");
const config = {//配置
    rootDirPath: path.resolve(__dirname),
    keywords: ["const","require"]
}

//不传配置则使用默认配置
scriptSearch(config);

```
##### 3.通过nodejs运行search.js文件（控制台输出：查询耗时xx秒才算是查询结束）
```js
node search.js
```


