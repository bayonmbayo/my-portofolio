const fs = require("fs");
const path = require("path");

module.exports = () => {
    const raw = fs.readFileSync(path.join(__dirname, "../../content/projects.md"), "utf8");
    const blocks = raw.split(/^##\s+/m).slice(1);

    return blocks.map((block) => {
        const lines = block.trim().split("\n").map((line) => line.trim());
        const title = lines[0];

        const field = (name) => lines.find((line, i) => i > 0 && new RegExp(`^${name}:\\s*`, "i").test(line));

        const linkLine = field("Link");
        const link = linkLine ? linkLine.replace(/^Link:\s*/i, "").trim() : null;

        const websiteLine = field("Website");
        const website = websiteLine ? websiteLine.replace(/^Website:\s*/i, "").trim() : null;

        const tagsLine = field("Tags");
        const tags = tagsLine
            ? tagsLine.replace(/^Tags:\s*/i, "").split(",").map((tag) => tag.trim()).filter(Boolean)
            : [];

        const colorLine = field("Color");
        const color = colorLine
            ? colorLine.replace(/^Color:\s*/i, "").split(",").map((c) => c.trim())
            : ["#3b82f6", "#9333ea"];

        const metaLines = [linkLine, websiteLine, tagsLine, colorLine];
        const description = lines.slice(1)
            .filter((line) => !metaLines.includes(line))
            .join(" ")
            .trim();

        return { title, description, tags, link, website, color };
    });
};
