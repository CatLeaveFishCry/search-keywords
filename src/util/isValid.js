function isValid(name, suffix) {
    for (let item of suffix) {
        if (name.endsWith(item)) {
            return true;
        }
    };
    return false;
};

module.exports = isValid;