const fs = require("fs");
const path = require("path");

module.exports = () => {
    const raw = fs.readFileSync(path.join(__dirname, "../../content/about.md"), "utf8");
    const intro = raw.replace(/^#[^\n]*\n+/, "").trim();
    return { intro };
};
