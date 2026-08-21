const fs = require("fs");
const path = require("path");

module.exports = () => {
    const raw = fs.readFileSync(path.join(__dirname, "../../content/about.md"), "utf8");
    const body = raw.replace(/^#[^\n]*\n+/, "").trim();
    const lines = body.split("\n").map((line) => line.trim()).filter(Boolean);

    const roleLine = lines.find((line) => /^Role:\s*/i.test(line));
    const role = roleLine ? roleLine.replace(/^Role:\s*/i, "").trim() : "";
    const intro = lines.filter((line) => line !== roleLine).join(" ").trim();

    return { role, intro };
};
