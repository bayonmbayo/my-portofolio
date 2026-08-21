const fs = require("fs");
const path = require("path");

module.exports = () => {
    const raw = fs.readFileSync(path.join(__dirname, "../../content/skills.md"), "utf8");
    const blocks = raw.split(/^##\s+/m).slice(1);

    const categories = blocks.map((block) => {
        const lines = block.trim().split("\n").map((line) => line.trim()).filter(Boolean);
        const title = lines[0];
        const items = lines.slice(1).join(" ").split(",").map((item) => item.trim()).filter(Boolean);
        return { title, items };
    });

    const languages = categories.find((c) => c.title === "Languages");
    const groups = categories.filter((c) => c.title !== "Languages");

    return { groups, languages: languages ? languages.items : [] };
};
