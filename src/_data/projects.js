const fs = require("fs");
const path = require("path");

module.exports = () => {
    const raw = fs.readFileSync(path.join(__dirname, "../../content/projects.md"), "utf8");
    const blocks = raw.split(/^##\s+/m).slice(1);

    return blocks.map((block) => {
        const lines = block.trim().split("\n").map((line) => line.trim());
        const title = lines[0];
        const linkLine = lines.find((line, i) => i > 0 && /^Link:\s*/i.test(line));
        const link = linkLine ? linkLine.replace(/^Link:\s*/i, "").trim() : null;
        const description = lines.slice(1).filter((line) => line !== linkLine).join(" ").trim();
        return { title, description, link };
    });
};
