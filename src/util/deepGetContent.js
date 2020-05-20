async function deepGetContent(rootFileData) {
    const result = {};
    async function temp(fileDatas) {
        for (const file of fileDatas) {
            if (file.isFile) {
                const content = await file.getContent();
                result[file.filename] = content;
            } else {
                await temp(await file.getChildren());
            }
        }
    };
    await temp([rootFileData]);
    return result;
};

module.exports = deepGetContent;