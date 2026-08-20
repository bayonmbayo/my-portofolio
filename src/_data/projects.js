const fs = require("fs");
const path = require("path");

module.exports = () => {
    const raw = fs.readFileSync(path.join(__dirname, "../../content/projects.md"), "utf8");
    const blocks = raw.split(/^##\s+/m).slice(1);

    return blocks.map((block) => {
        const [titleLine, ...rest] = block.trim().split("\n");
        return {
            title: titleLine.trim(),
            description: rest.join(" ").trim()
        };
    });
};
