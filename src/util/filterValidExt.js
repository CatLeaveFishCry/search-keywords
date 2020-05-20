const isValid = require("./isValid")

function filterValidExt(obj, exts) {
    const res = {};

    for (let key in obj) {
        if (isValid(key, exts)) {
            res[key] = obj[key];
        }
    };

    return res;
};

module.exports = filterValidExt;