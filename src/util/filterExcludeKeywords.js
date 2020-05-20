const path = require("path")

function filterExcludeKeywords(contentObj, keywords) {
    const res = {};
    for (let prop in contentObj) {
        let temp = true;
        const arr = prop.split(path.sep);
        for (let item of keywords) {
            if (arr.includes(item)) {
                temp = false;
                break;
            }
        };
        if (temp) {
            res[prop] = contentObj[prop];
        }
    };
    return res;
};

module.exports = filterExcludeKeywords;