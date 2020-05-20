const fsPromise = require("fs").promises;

async function exists(url, type = "file") {
    try {
        if (type === "dir") {
            await fsPromise.readdir(url);
        } else if (type === "file") {
            await fsPromise.readFile(url);
        }
        return true;
    } catch (error) {

        if (error.code === "ENOENT") {
            return false;
        }
    }
};
module.exports = exists;